-------------------
---- AUTOSTART ----
-------------------

hl.on("hyprland.start", function ()
    hl.exec_cmd("systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP")
    hl.exec_cmd("dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP=Hyprland")
    hl.exec_cmd("/usr/lib/xdg-desktop-portal-hyprland")
    hl.exec_cmd("/usr/lib/xdg-desktop-portal")

    -- Autologin skips PAM's keyring unlock, so start the daemon explicitly
    hl.exec_cmd("/usr/bin/gnome-keyring-daemon --start --components=secrets,ssh")

    -- Noctalia: bar, wallpaper, notifications, OSDs, lockscreen, idle
    hl.exec_cmd("noctalia -d")

    -- Old core desktop pieces (disabled -- configs kept, uncomment to restore)
    --hl.exec_cmd("waybar")
    -- Instant workspace highlight updates for custom waybar modules
    --hl.exec_cmd("/home/bailey/.config/waybar/scripts/ws-events.sh")
    --hl.exec_cmd("hyprpaper")
    --hl.exec_cmd("mako")
    --hl.exec_cmd("nm-applet")
    --hl.exec_cmd("hypridle")

    -- Old shells (kept for easy switch-back)
    --hl.exec_cmd("ags run /home/bailey/.config/ags")
    --hl.exec_cmd("caelestia shell -d")
    --hl.exec_cmd("wayle panel start")
end)

