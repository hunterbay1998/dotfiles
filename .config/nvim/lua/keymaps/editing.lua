-- lua/keymaps/telescope.lua

-- We use "<cmd>" commands. This works even if the plugin loads later.
-- No complex "pcall" or checks needed.

vim.keymap.set("n", "<leader>ff", "<cmd>Telescope find_files<cr>", { desc = "Find Files" })
vim.keymap.set("n", "<leader>fg", "<cmd>Telescope live_grep<cr>",  { desc = "Live Grep" })
vim.keymap.set("n", "<leader>fb", "<cmd>Telescope buffers<cr>",    { desc = "Buffers" })
vim.keymap.set("n", "<leader>fh", "<cmd>Telescope help_tags<cr>",  { desc = "Help Tags" })
vim.keymap.set("n", "K", vim.diagnostic.open_float, { desc = "Show diagnostic" })
