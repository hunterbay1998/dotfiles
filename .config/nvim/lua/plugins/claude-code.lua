---------------------------------------------------------------------
-- Claude Code: terminal integration
---------------------------------------------------------------------

return {
  "greggh/claude-code.nvim",
  dependencies = {
    "nvim-lua/plenary.nvim",
  },
  config = function()
    require("claude-code").setup({
      window = {
        -- Fraction of the screen the window takes (height for horizontal
        -- splits, width for vertical). Plugin default is 0.3, which is
        -- too short for Claude's TUI.
        split_ratio = 0.5,

        -- "botright" = split across the bottom.
        -- Swap for "vertical" to dock it as a right-hand sidebar, or
        -- "float" to use the centered floating window configured below.
        position = "botright",

        float = {
          width = "85%",
          height = "85%",
          row = "center",
          col = "center",
          relative = "editor",
          border = "rounded",
        },
      },
    })

    -- Drop straight into insert mode when moving into the Claude window.
    -- The plugin ships force_insert_mode() for this but never wires it to
    -- an autocmd, and it keys off an instance table that stays empty, so
    -- it no-ops. Match on the buffer instead.
    vim.api.nvim_create_autocmd({ "BufEnter", "WinEnter" }, {
      group = vim.api.nvim_create_augroup("ClaudeCodeAutoInsert", { clear = true }),
      callback = function(args)
        if vim.bo[args.buf].buftype ~= "terminal" then
          return
        end
        local name = vim.api.nvim_buf_get_name(args.buf)
        if not vim.fn.fnamemodify(name, ":t"):match("^claude%-code") then
          return
        end
        -- No mode check here: on window entry the mode still reports the
        -- outgoing "t" and only settles to "nt" a few ticks later, so any
        -- guard reads a stale value. startinsert is idempotent in a
        -- terminal buffer, so just run it once the mode has settled.
        vim.defer_fn(function()
          if vim.api.nvim_get_current_buf() == args.buf then
            vim.cmd("silent! startinsert")
          end
        end, 10)
      end,
    })
  end,
}
