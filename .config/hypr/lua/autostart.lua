-------------------
---- AUTOSTART ----
-------------------

hl.on("hyprland.start", function ()
hl.exec_cmd("systemctl --user import-environment WAYLAND_DISPLAY XDG_CURRENT_DESKTOP")
hl.exec_cmd("dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP=Hyprland")
hl.exec_cmd("/usr/lib/xdg-desktop-portal-hyprland")
hl.exec_cmd("/usr/lib/xdg-desktop-portal")
hl.exec_cmd(terminal)
hl.exec_cmd("nm-applet")
--hl.exec_cmd("hyprpaper")
hl.exec_cmd("hypridle")
--hl.exec_cmd("wayle panel start")
hl.exec_cmd("noctalia start")
hl.exec_cmd("ags run /home/bailey/.config/ags")
hl.exec_cmd("chromium")
end)

