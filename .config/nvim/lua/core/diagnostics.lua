---------------------------------------------------------------------
-- Diagnostics
---------------------------------------------------------------------

vim.diagnostic.config({
  virtual_text = {
    -- Show inline messages for errors + warnings (ruff/pyright report many real issues as WARN)
    severity = { min = vim.diagnostic.severity.WARN },
  },
  signs = true,
  underline = true,
  update_in_insert = false,
  severity_sort = true,
})
