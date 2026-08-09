#!/usr/bin/env bash
# Waybar ↔ mako status
set -euo pipefail

count=$(makoctl list -j 2>/dev/null | python3 -c 'import sys,json
try:
  d=json.load(sys.stdin)
  print(len(d) if isinstance(d,list) else 0)
except Exception:
  print(0)
')

modes=$(makoctl mode 2>/dev/null || true)
dnd=0
if printf '%s\n' "$modes" | grep -qx 'do-not-disturb'; then
  dnd=1
fi

if [[ "$dnd" -eq 1 ]]; then
  text="󰂛"
  class="dnd"
  tip="Do not disturb (right-click to disable)"
elif [[ "$count" -gt 0 ]]; then
  text="󰂚 ${count}"
  class="notification"
  tip="${count} notification(s) — click dismiss all, right-click DND"
else
  text="󰂜"
  class="none"
  tip="No notifications — right-click for DND"
fi

printf '{"text":"%s","class":"%s","tooltip":"%s","alt":"%s"}\n' \
  "$text" "$class" "$tip" "$class"
