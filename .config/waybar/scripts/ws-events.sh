#!/usr/bin/env bash
# Watch Hyprland IPC and refresh Waybar workspace modules immediately.
# Signal 1 → custom/ws* modules (RTMIN+1).
exec python3 - "$@" <<'PY'
import os, signal, socket, subprocess, sys, time

def refresh():
    try:
        subprocess.run(["pkill", "-RTMIN+1", "waybar"], check=False,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass

his = os.environ.get("HYPRLAND_INSTANCE_SIGNATURE", "")
runtime = os.environ.get("XDG_RUNTIME_DIR", f"/run/user/{os.getuid()}")
hypr = os.path.join(runtime, "hypr")

if not his:
    try:
        dirs = [d for d in os.listdir(hypr) if os.path.isdir(os.path.join(hypr, d))]
        his = dirs[0] if dirs else ""
    except FileNotFoundError:
        sys.exit("ws-events: no hypr runtime dir")

sock_path = os.path.join(hypr, his, ".socket2.sock")
if not os.path.exists(sock_path):
    sys.exit(f"ws-events: missing {sock_path}")

# Initial paint after waybar starts
time.sleep(0.2)
refresh()

interesting = (
    "workspace>>",
    "focusedmon>>",
    "createworkspace>>",
    "destroyworkspace>>",
    "openwindow>>",
    "closewindow>>",
    "movewindow>>",
    "activewindow>>",
)

while True:
    try:
        s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        s.connect(sock_path)
        buf = b""
        while True:
            chunk = s.recv(4096)
            if not chunk:
                break
            buf += chunk
            while b"\n" in buf:
                line, buf = buf.split(b"\n", 1)
                text = line.decode("utf-8", "replace")
                if text.startswith(interesting):
                    refresh()
        s.close()
    except Exception as e:
        print(f"ws-events: reconnecting ({e})", file=sys.stderr)
        time.sleep(1)
PY
