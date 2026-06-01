-- Editing & LSP keymaps

-- LSP
vim.keymap.set("n", "K", vim.lsp.buf.hover, { desc = "LSP Hover (docs / type info)" })
vim.keymap.set("n", "gd", vim.lsp.buf.definition, { desc = "Go to Definition" })
vim.keymap.set("n", "gr", vim.lsp.buf.references, { desc = "Find References" })
vim.keymap.set("n", "<leader>ca", vim.lsp.buf.code_action, { desc = "Code Action" })
vim.keymap.set("n", "<leader>rn", vim.lsp.buf.rename, { desc = "Rename Symbol" })

-- Diagnostics (errors / warnings)
vim.keymap.set("n", "gl", vim.diagnostic.open_float, { desc = "Show diagnostic under cursor" })
vim.keymap.set("n", "[d", vim.diagnostic.goto_prev, { desc = "Previous diagnostic" })
vim.keymap.set("n", "]d", vim.diagnostic.goto_next, { desc = "Next diagnostic" })
