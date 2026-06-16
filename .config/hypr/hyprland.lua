-- =============================================
-- Hyprland main config (entry point)
-- =============================================
--require("hyprland-gui")
require("lua.variables")
require("lua.monitors")
require("lua.binds")
require("lua.windowrules")
require("lua.layerrules")
require("lua.autostart")
require("lua.animations")
require("lua.looknfeel")
require("lua.permissions")
require("lua.input")
require("lua.env")
require("lua.plugins")
require("lua.events")

-- HyprMod managed settings
require("hyprland-gui")

-- For Noctalia Color templates
require("noctalia")
