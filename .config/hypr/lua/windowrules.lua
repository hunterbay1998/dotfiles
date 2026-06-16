-----------------------
---- WINDOW RULES ----
-----------------------

hl.window_rule({
    match = { class = "power-menu" },
    float = true,
    center = true,
    size = { 300, 250 },
})

hl.window_rule({
    match = { class = "rofi" },
    float = true,
    center = true,
})

hl.window_rule({
    match = { class = "org.gnome.Loupe" },
    float = true,
    center = true,
    size = { 1000, 700 },
})

-- Scrolling layout: per-app starting column width.
-- kitty (and most apps) use the default column_width = 0.5 (half tile);
-- Chromium opens as a full tile.
hl.window_rule({
    match = { class = "chromium" },
    scrolling_width = 1.0,
    workspace = "3 silent",
})
