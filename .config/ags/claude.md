# AGS Shell — Claude Notes

> AGS v2 (Astal/GTK4) only. Never v1.

## What's built

**Bar** — `widget/Bar.tsx`, `style/Bar.scss`
- Solid `#1a1b26`, bottom border `#414868`, full width no floating
- Left: settings gear + launcher toggle
- Center: workspace pills with app icons
- Right: battery, side menu button, clock (also notif button)

**Workspaces** — `widget/bar/center/Workspaces.tsx`
- 5 round pills, app icons 20px via `GioUnix.DesktopAppInfo` (NOT `Gio.DesktopAppInfo`)
- Empty = faint dot, focused = purple bg + border

**Settings** — `widget/Settings.tsx`, `style/Settings.scss`
- Fixed 580x580 (`set_resizable(false)` + `set_default_size`)
- Tabs: Audio, Bluetooth, WiFi, Wallpaper, VPN
- Bluetooth: uses `rfkill unblock bluetooth && bluetoothctl power on` (machine is rfkill-blocked)
- Wallpaper dir: `~/Pictures/AGSpaper/`, hyprpaper via Python write + restart
- VPN: two-level country → city picker using `nordvpn countries` / `nordvpn cities <country>`

**Side menu** — `widget/bar/right/SideMenu.tsx`
- Battery, volume, brightness, wifi+bluetooth grid (both hexpand)

**Notif menu** — clock IS the notif button (time + purple dot + count)

**Launcher, OSD, Dock** — working

## Colour scheme (Tokyo Night)

### Surfaces
- Bar bg: `#1a1b26`
- Menu outer: `#414868`
- Inner cards: `rgba(255,255,255,0.06)`
- Borders: `rgba(255,255,255,0.08)`
- `$surface`: `#414868`
- `$surface-raised`: `#4f5880`
- `$surface-hover`: `#565f89`
- `$surface-border`: `#565f89`
- `$surface-popup`: `#3b4268`
- `$surface-selected`: `#4a5899`

### Text
- `$text-primary`: `#c0caf5`
- `$text-muted`: `#9aa5ce`

### Accents
- `$accent`: `#7aa2f7` (blue)
- `$workspace-focused`: `#c099ff` (purple)
- Cyan: `#7dcfff`, `#2ac3de`, `#b4f9f8`
- Green: `#9ece6a`
- Teal: `#73daca`
- Orange: `#ff9e64`
- Yellow: `#e0af68`
- Red/pink: `#f7768e`

### Full palette reference
`#1a1b26` `#414868` `#565f89` `#9aa5ce` `#a9b1d6` `#c0caf5`
`#7aa2f7` `#c099ff` `#7dcfff` `#2ac3de` `#b4f9f8`
`#9ece6a` `#73daca` `#e0af68` `#ff9e64` `#f7768e` `#cfc9c2`

## Kill command
```
pkill gjs   # NOT pkill ags
```

## Pending features
- Active window title in center bar
- Keyboard layout indicator
- Per-app audio in side menu
- Menu animations
- Dock app indicators (running dot)
- Workspace overview (Mission Control style)
