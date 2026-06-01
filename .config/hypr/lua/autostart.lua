-------------------
---- AUTOSTART ----
-------------------

hl.on("hyprland.start", function () 
hl.exec_cmd(terminal)
hl.exec_cmd("nm-applet")
hl.exec_cmd("hyprpaper")
hl.exec_cmd("hypridle")
end)

