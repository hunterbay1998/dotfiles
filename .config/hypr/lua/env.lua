-------------------------------
---- ENVIRONMENT VARIABLES ----
-------------------------------

-- See https://wiki.hypr.land/Configuring/Advanced-and-Cool/Environment-variables/

-- NOTE: this file used to assign a plain `env = { ... }` table, which Hyprland
-- never reads -- so none of these were ever actually applied. They are real
-- hl.env() calls now.

-- Cursor
hl.env("XCURSOR_SIZE", "24")
hl.env("HYPRCURSOR_SIZE", "24")

-- Steam renders its own UI (not GTK/Qt), so GDK_SCALE does nothing for it.
-- Without this it draws at 1:1 pixels and the text is unreadably small,
-- because looknfeel.lua sets xwayland.force_zero_scaling = true.
hl.env("STEAM_FORCE_DESKTOPUI_SCALING", "2")

-- ---------------------------------------------------------------------------
-- Left disabled on purpose -- each of these was in the old dead table but is
-- either useless or risky on this machine. Uncomment individually and test.
-- ---------------------------------------------------------------------------

-- Scales GTK apps to compensate for force_zero_scaling. Fixes XWayland GTK
-- apps, but can double-scale NATIVE Wayland GTK apps (compositor already
-- scales them 2x), making them oversized. Test app-by-app before keeping.
-- hl.env("GDK_SCALE", "2")

-- Flatpak is not installed, and this REPLACES the default XDG_DATA_DIRS
-- rather than appending, which can hide app/icon directories.
-- hl.env("XDG_DATA_DIRS", "/home/bailey/.local/share/flatpak/exports/share:/var/lib/flatpak/exports/share:/usr/local/share:/usr/share")

-- ibus is not installed; pointing toolkits at a missing input method just
-- makes GTK/Qt apps warn on startup.
-- hl.env("GTK_IM_MODULE", "ibus")
-- hl.env("QT_IM_MODULE", "ibus")
-- hl.env("XMODIFIERS", "@im=ibus")

-- "$PATH" is not expanded by hl.env, so this would set a literal string and
-- break PATH. Set it in ~/.zprofile / ~/.zshrc instead.
-- hl.env("PATH", "$PATH:/home/bailey/.local/bin")
