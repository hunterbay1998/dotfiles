----------------------
---- LAYER RULES ----
----------------------

-- Frosted glass for the AGS launcher: blur whatever is behind its layer
-- surface. Pairs with the translucent background in the AGS stylesheet —
-- the blur only shows through because the window bg has alpha.
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
