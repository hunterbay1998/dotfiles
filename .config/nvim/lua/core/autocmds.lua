---------------------------------------------------------------------
-- Autocommands
---------------------------------------------------------------------

-- Highlight text briefly after yanking (copying)
vim.api.nvim_create_autocmd("TextYankPost", {
  callback = function()
    vim.highlight.on_yank({ timeout = 150 })
  end,
})

-- Disable diagnostics for GTK / Waybar CSS
vim.api.nvim_create_autocmd({ "BufRead", "BufNewFile" }, {
  pattern = {
    "*/waybar/*.css",
    "*/waybar/**/*.css",
  },
  callback = function()
    vim.diagnostic.disable(0)
  end,
})

