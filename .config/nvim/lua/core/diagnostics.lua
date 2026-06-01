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
  virtual_text = {
    -- Show inline messages only for actual errors (like you see with TypeScript)
    severity = { min = vim.diagnostic.severity.ERROR },
  },
  signs = true,
  underline = true,
  update_in_insert = false,
  severity_sort = true,
})
