---------------------------------------------------------------------
-- Diagnostics
---------------------------------------------------------------------

--[[vim.diagnostic.config({
  virtual_text = {
    spacing = 2,
    prefix = "●",
  },
  signs = true,
  underline = true,
  update_in_insert = true,
  severity_sort = true,
})]]--

vim.diagnostic.config({
  virtual_text = false,
  signs = true,
  underline = true,
  update_in_insert = false,
  severity_sort = true,
})
