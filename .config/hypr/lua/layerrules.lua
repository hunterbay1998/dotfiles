----------------------
---- LAYER RULES ----
----------------------

hl.layer_rule({
    match = { namespace = "launcher" },
    blur = true,
    ignore_alpha = 0.2,
})

hl.layer_rule({
    match = { namespace = "rofi" },
    blur = true,
    ignore_alpha = 0.2,
})

-- Noctalia shell
-- Bars (noctalia-bar-default, noctalia-bar-bar2). Blur only shows once the
-- bar's background opacity is < 1 in Noctalia Settings.
hl.layer_rule({
    match = { namespace = "noctalia-bar-.*" },
    blur = true,
    ignore_alpha = 0.2,
})

-- Popups: launcher, control-center, etc. (already ~0.88 opaque, blur visible).
hl.layer_rule({
    match = { namespace = "noctalia-.*panel" },
    blur = true,
    ignore_alpha = 0.2,
})

-- Volume / brightness OSDs
hl.layer_rule({
    match = { namespace = "noctalia-osd" },
    blur = true,
    ignore_alpha = 0.2,
})
