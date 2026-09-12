---------------------------------------------------------------------
-- Full Git UI: lazygit (inside Neovim)
---------------------------------------------------------------------

return {
  "kdheepak/lazygit.nvim",
  cmd = "LazyGit", -- available via :LazyGit, no keybinding
  dependencies = { "nvim-lua/plenary.nvim" },
}

