
return {
  "uga-rosa/ccc.nvim",
  config = function()
    require("ccc").setup({
      highlighter = {
        auto_enable = true,
        lsp = false,
      },
    })

    -- Correct keymap: call the command, NOT Lua
    vim.keymap.set("n", "<leader>cp", "<cmd>CccPick<CR>", {
      desc = "Pick color",
    })
  end,
}

