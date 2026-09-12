---------------------------------------------------------------------
-- Neovim entry point
-- Keeps init.lua tiny; real config lives in lua/
---------------------------------------------------------------------
-- Core
require("core.basics")
require("core.options")
require("core.autocmds")
require("core.diagnostics")
-- Keymaps
require("keymaps")

-- Plugins (bootstrap in core/lazy.lua, specs auto-imported from lua/plugins/)
require("core.lazy")


