-- lua/keymaps/telescope.lua

-- 1. Safely try to import Telescope
-- "pcall" prevents the error if the plugin is missing
local status, builtin = pcall(require, "telescope.builtin")

if not status then
  return -- Stop here if Telescope isn't installed (prevents the crash)
end

-- 2. Define the keymaps
vim.keymap.set("n", "<leader>ff", builtin.find_files, {}) -- Space + f + f
vim.keymap.set("n", "<leader>fg", builtin.live_grep, {})  -- Space + f + g
vim.keymap.set("n", "<leader>fb", builtin.buffers, {})    -- Space + f + b
vim.keymap.set("n", "<leader>fh", builtin.help_tags, {})  -- Space + f + h
