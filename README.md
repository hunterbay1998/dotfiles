# Dotfiles

My Arch Linux dotfiles, managed with GNU Stow.

## Setup
- OS: Arch Linux
- WM: niri (primary), Hyprland (also configured)
- Bar / shell UI: Noctalia
- Terminal: Kitty
- Shell: Zsh + Powerlevel10k
- Editor: Neovim, Zed
- Files: Yazi

## Install

```bash
sudo pacman -S --needed stow
git clone https://github.com/hunterbay1998/dotfiles.git ~/dotfiles
cd ~/dotfiles
stow .
```

`stow .` symlinks everything in this repo into `$HOME`. Move any existing
config out of the way first — stow will refuse to overwrite real files.

## Layout

| Path | What |
|---|---|
| `.config/niri` | niri compositor |
| `.config/hypr` | Hyprland (Lua config) |
| `.config/noctalia-menu` | Noctalia menu |
| `.config/nirimod` | niri tweaks |
| `.config/kitty` | terminal |
| `.config/nvim` | Neovim |
| `.config/yazi` | file manager |
| `.config/zed` | Zed editor |
| `.config/gtk-3.0`, `.config/gtk-4.0` | GTK theming |
| `.zshrc`, `.p10k.zsh`, `.zprofile` | shell |
| `docs/` | notes (not stowed) |
| `scripts/`, `packages/` | helpers (not stowed) |

## Host-specific

Monitor layout lives in `.config/hypr/lua/monitors.lua` and niri's
`config.kdl` / `laptop-screen.kdl`. On a new machine, adjust those after
stowing.
