---------------------------------------------------------------------
-- Basics (leader + clipboard)
---------------------------------------------------------------------

-- Leader key (used for custom shortcuts later)
vim.g.mapleader = " "

-- Use the system clipboard (Wayland / wl-clipboard)
-- This makes y / p copy & paste to your OS clipboard
vim.opt.clipboard = "unnamedplus"
