----------------
---- EVENTS ----
----------------

-- (No automatic monitor hooks.)
-- The laptop screen (eDP-1) is toggled manually with SUPER+SHIFT+P, which runs
-- ~/.local/bin/laptop-toggle. Auto plug/unplug toggling was removed because
-- monitor.added also fires on config reloads, which fought the manual override.
