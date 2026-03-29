---------------------------------------------------------------------
-- Treesitter plugin
---------------------------------------------------------------------

return {
  "nvim-treesitter/nvim-treesitter",
  build = ":TSUpdate",
  config = function()
    require("nvim-treesitter.config").setup({
      ensure_installed = { "lua", "json", "bash", "jsonc", "css", "typescript", "tsx", "javascript" },
      highlight = { enable = true },
    })
  end,
}
