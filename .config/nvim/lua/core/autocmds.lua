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
    vim.diagnostic.enable(false, { bufnr = 0 })
  end,
})

-- Enable Treesitter syntax highlighting (modern nvim-treesitter on 'main' branch)
-- This replaces the old highlight.enable = true behavior.
vim.api.nvim_create_autocmd("FileType", {
  pattern = {
    "lua", "vim", "bash", "fish", "sh",
    "json", "jsonc", "yaml", "toml",
    "nix", "hyprlang",
    "css", "scss", "html", "htmldjango",
    "javascript", "typescript", "tsx", "jsx",
    "markdown", "markdown.mdx",
    "query", "diff", "gitconfig", "gitrebase",
    "python",
  },
  callback = function()
    -- pcall prevents errors (e.g. "no parser for 'python'") from showing during
    -- startup or when a parser is still being installed in the background.
    pcall(vim.treesitter.start)
  end,
})

