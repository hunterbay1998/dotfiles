---------------------------------------------------------------------
-- Auto-close HTML/JSX tags (no treesitter required)
---------------------------------------------------------------------

return {
  "alvan/vim-closetag",
  ft = { "html", "xml", "jsx", "tsx", "javascriptreact", "typescriptreact" },
  init = function()
    vim.g.closetag_filenames = "*.html,*.jsx,*.tsx,*.xml"
    vim.g.closetag_filetypes = "html,jsx,tsx,javascriptreact,typescriptreact"
  end,
}
