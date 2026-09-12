---------------------------------------------------------------------
-- Window / split management
---------------------------------------------------------------------

-- Navigate between splits with Alt + h/j/k/l (same directions as cursor).
-- Alt (not Ctrl) so terminal panels keep their Ctrl shortcuts:
-- Ctrl+h = backspace, Ctrl+l = clear, Ctrl+k = kill-line, etc.
vim.keymap.set("n", "<A-h>", "<C-w>h", { desc = "Go to left split" })
vim.keymap.set("n", "<A-j>", "<C-w>j", { desc = "Go to lower split" })
vim.keymap.set("n", "<A-k>", "<C-w>k", { desc = "Go to upper split" })
vim.keymap.set("n", "<A-l>", "<C-w>l", { desc = "Go to right split" })

-- Create / close splits
vim.keymap.set("n", "<leader>sv", "<cmd>vsplit<cr>", { desc = "Split vertical" })
vim.keymap.set("n", "<leader>sh", "<cmd>split<cr>", { desc = "Split horizontal" })
vim.keymap.set("n", "<leader>sc", "<cmd>close<cr>", { desc = "Close split" })

-- Resize splits with Alt + arrow keys
vim.keymap.set("n", "<A-Up>", "<cmd>resize +2<cr>", { desc = "Make split taller" })
vim.keymap.set("n", "<A-Down>", "<cmd>resize -2<cr>", { desc = "Make split shorter" })
vim.keymap.set("n", "<A-Left>", "<cmd>vertical resize -2<cr>", { desc = "Make split narrower" })
vim.keymap.set("n", "<A-Right>", "<cmd>vertical resize +2<cr>", { desc = "Make split wider" })

---------------------------------------------------------------------
-- Terminal mode: same keys work from inside a terminal (,t and ,a)
-- <C-\><C-n> exits terminal mode first; trailing 'i' jumps back in
---------------------------------------------------------------------

-- Navigate out of a terminal
vim.keymap.set("t", "<A-h>", [[<C-\><C-n><C-w>h]], { desc = "Go to left split" })
vim.keymap.set("t", "<A-j>", [[<C-\><C-n><C-w>j]], { desc = "Go to lower split" })
vim.keymap.set("t", "<A-k>", [[<C-\><C-n><C-w>k]], { desc = "Go to upper split" })
vim.keymap.set("t", "<A-l>", [[<C-\><C-n><C-w>l]], { desc = "Go to right split" })

-- Resize the terminal panel without leaving it
vim.keymap.set("t", "<A-Up>", [[<C-\><C-n><cmd>resize +2<cr>i]], { desc = "Make split taller" })
vim.keymap.set("t", "<A-Down>", [[<C-\><C-n><cmd>resize -2<cr>i]], { desc = "Make split shorter" })
vim.keymap.set("t", "<A-Left>", [[<C-\><C-n><cmd>vertical resize -2<cr>i]], { desc = "Make split narrower" })
vim.keymap.set("t", "<A-Right>", [[<C-\><C-n><cmd>vertical resize +2<cr>i]], { desc = "Make split wider" })
