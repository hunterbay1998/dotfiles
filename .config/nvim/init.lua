-- Line numbers 
vim.o.number = true
vim.o.relativenumber = true

-- Use the system clip board
vim.o.clipboard = "unnamedplus"

-- Indentation
vim.o.expandtab = true
vim.o.tabstop = 4
vim.o.shiftwidth = 4

-- Search
vim.o.ignorecase = true
vim.o.smartcase = true

-- Leader key (set this before any keymaps)
vim.g.mapleader = ","
vim.g.maplocalleader = ","

-- Theme
vim.cmd.colorscheme("catppuccin")
