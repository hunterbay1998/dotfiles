# SDDM

SDDM is a Qt-based display manager with good Wayland session support and theming via QML.

## Install

```bash
sudo pacman -S sddm
```

## Enable

```bash
sudo systemctl enable sddm.service
```

Disable any previous display manager first if switching:

```bash
sudo systemctl disable lightdm.service   # or gdm, ly, etc.
```

Reboot to reach the login screen.

## Hyprland session

The `hyprland` package provides a desktop entry at `/usr/share/wayland-sessions/`. 

At the SDDM greeter, use the session selector (bottom-left in most themes) and choose **Hyprland**.

### Recommended: uwsm for better integration

For proper systemd user session management, environment variables, and XDG autostart when using a display manager, install `uwsm` from the AUR and select the **Hyprland (uwsm-managed)** session instead.

```bash
paru -S uwsm
```

## Configuration

Create drop-in config files in `/etc/sddm.conf.d/`.

```bash
sudo mkdir -p /etc/sddm.conf.d
```

Example config:

```ini
# /etc/sddm.conf.d/10-settings.conf
[General]
Numlock=on

[Theme]
Current=breeze
```

## Themes

Themes are stored in:

```bash
/usr/share/sddm/themes/
```

List available themes:

```bash
ls /usr/share/sddm/themes/
```

### Installing themes

Many good themes are in the AUR, for example:

- `sddm-catppuccin-git`
- `sddm-sugar-candy-git`
- `archlinux-themes-sddm`

Install with your AUR helper and set `Current=theme-name` in a config file.

### Custom background / overrides

Inside a theme's directory, create `theme.conf.user` to override settings safely:

```ini
# /usr/share/sddm/themes/your-theme/theme.conf.user
[General]
background=/path/to/wallpaper.jpg
```

## Preview a theme

```bash
sddm-greeter-qt6 --test-mode --theme /usr/share/sddm/themes/breeze
```

## Troubleshooting

- Check logs: `journalctl -u sddm -b`
- Common requirements for Hyprland: `polkit`, `xdg-desktop-portal-hyprland`
- NVIDIA users: ensure early KMS is set up (see [[kernel]])
- If greeter is missing or crashes: check disk space and permissions on `/var/lib/sddm`
