---------------------------------------------------------------------
-- Full Git UI: lazygit (inside Neovim)
---------------------------------------------------------------------

return {
  "kdheepak/lazygit.nvim",
  cmd = "LazyGit",
  dependencies = { "nvim-lua/plenary.nvim" },
  keys = {
    { "<leader>gg", "<cmd>LazyGit<cr>", desc = "Open LazyGit" },
  },
}

