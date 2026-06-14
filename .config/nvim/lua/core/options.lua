---------------------------------------------------------------------
-- Core options (editor behaviour)
---------------------------------------------------------------------

-- Ensure Mason-installed tools (LSP servers like pyright/ruff, linters, etc.)
-- are discoverable. Mason installs to stdpath("data")/mason/bin.
-- We prepend it early so that vim.lsp (and anything else) can find the binaries
-- without custom cmd paths.
local mason_bin = vim.fn.stdpath("data") .. "/mason/bin"
if vim.fn.isdirectory(mason_bin) == 1 then
  vim.env.PATH = mason_bin .. ":" .. vim.env.PATH
end

-- Line numbers
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.cursorline = true

-- Indentation (sane defaults)
vim.opt.expandtab = true      -- use spaces instead of tabs
vim.opt.shiftwidth = 2        -- indent size
vim.opt.tabstop = 2           -- how wide a tab looks
vim.opt.smartindent = true

-- Searching
vim.opt.ignorecase = true     -- case-insensitive search...
vim.opt.smartcase = true      -- ...unless you use capitals

-- Splits
vim.opt.splitright = true
vim.opt.splitbelow = true

-- Keep sign column stable (prevents text shifting)
vim.opt.signcolumn = "yes"

-- Better undo (persists between sessions)
vim.opt.undofile = true
