#!/usr/bin/env bash
# Waybar custom workspace status for Hyprland (Lua dispatch era).
# Usage: ws.sh <id>
set -euo pipefail

ws="${1:?workspace id required}"

read -r active occupied < <(python3 - "$ws" <<'PY'
import json, subprocess, sys
ws = int(sys.argv[1])
try:
    active = json.loads(subprocess.check_output(["hyprctl", "activeworkspace", "-j"], text=True)).get("id")
except Exception:
    active = None
occupied = 0
try:
    for w in json.loads(subprocess.check_output(["hyprctl", "workspaces", "-j"], text=True)):
        if w.get("id") == ws:
            occupied = int(w.get("windows") or 0)
            break
except Exception:
    pass
print(active if active is not None else "", occupied)
PY
)

if [[ "$active" == "$ws" ]]; then
  class="active"
elif [[ "${occupied:-0}" -gt 0 ]]; then
  class="occupied"
else
  class="empty"
fi

printf '{"text":"%s","class":"%s","tooltip":"Workspace %s"}\n' "$ws" "$class" "$ws"
