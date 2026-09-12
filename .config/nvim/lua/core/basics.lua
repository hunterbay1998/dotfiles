---------------------------------------------------------------------
-- Basics (leader + clipboard)
---------------------------------------------------------------------

-- Leader key (used for custom shortcuts later)
vim.g.mapleader = ","

-- Use the system clipboard (Wayland / wl-clipboard)
-- This makes y / p copy & paste to your OS clipboard
vim.opt.clipboard = "unnamedplus"

-- Disable unused remote-plugin providers.
-- None of the installed plugins use them; this silences :checkhealth noise
-- and skips the interpreter probes at startup.
vim.g.loaded_node_provider = 0
vim.g.loaded_perl_provider = 0
vim.g.loaded_python3_provider = 0
vim.g.loaded_ruby_provider = 0
