return {
  {
    "akinsho/toggleterm.nvim",
    version = "*",
    config = function()
      require("toggleterm").setup({
        open_mapping = [[<leader>t]],
        direction = "horizontal",
        size = 12,
        start_in_insert = true,
        persist_size = true,
        close_on_exit = true,
      })

      local Terminal = require("toggleterm.terminal").Terminal

      -- Vertical AI terminal on the right (opens claude)
      local ai_term = Terminal:new({
        cmd = "claude",
        direction = "vertical",
        size = 80,
        hidden = true,
        on_open = function(term)
          vim.cmd("startinsert!")
        end,
      })

      vim.keymap.set("n", "<leader>a", function()
        ai_term:toggle()
      end, { desc = "Toggle AI terminal (Claude)" })
    end,
  },
}
