-----------------------
---- WINDOW RULES ----
-----------------------

hl.window_rule({
    match = { class = "org.gnome.Loupe" },
    float = true,
    center = true,
    size = { 1000, 700 },
})

-- Float instead of tiling
hl.window_rule({
    match = { class = "discord" },
    float = true,
    center = true,
    size = { 1200, 700 },
})

hl.window_rule({
    match = { class = "steam" },
    float = true,
    center = true,
    size = { 1200, 700 },
})

-- More specific than the rule above, so it wins for this one dialog
-- (both share class "steam" -- only the title tells them apart).
hl.window_rule({
    match = { class = "steam", title = "Steam Settings" },
    float = true,
    center = true,
    size = { 700, 500 },
    border_color = { colors = { "rgba(00000000)" } },
})

-- Scrolling layout: per-app starting column width.
-- kitty (and most apps) use the default column_width = 0.5 (half tile);
-- Chromium opens as a full tile.
hl.window_rule({
    match = { class = "chromium" },
    scrolling_width = 1.0,
    workspace = "3 silent",
})

-- Borderless while in windowed / fake fullscreen
hl.window_rule({
    match = {
        fullscreen_state_internal = 1, -- maximized by Hyprland
        fullscreen_state_client   = 2, -- client thinks it is fullscreen
    },
    border_size = 0,
})
