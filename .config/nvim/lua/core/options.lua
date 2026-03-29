---------------------------------------------------------------------
-- Core options (editor behaviour)
---------------------------------------------------------------------

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
