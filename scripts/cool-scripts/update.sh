#!/usr/bin/env bash

# Pick AUR helper: prefer paru, fallback to yay, skip if neither
if command -v paru &>/dev/null; then
  aur=paru
elif command -v yay &>/dev/null; then
  aur=yay
else
  aur=""
fi

# Snapper snapshot helper
snapshot_pre() {
  if command -v snapper &>/dev/null && snapper -c root list &>/dev/null 2>&1; then
    SNAP_NUM=$(sudo snapper -c root create -t pre -p -d "update")
    echo "Pre-update snapshot #$SNAP_NUM"
  fi
}

snapshot_post() {
  if [ -n "$SNAP_NUM" ]; then
    sudo snapper -c root create -t post --pre-number "$SNAP_NUM" -d "update"
    echo "Post-update snapshot created"
  fi
}

choice=$(printf "%s\n" \
  "Pacman (system)" \
  "AUR" \
  "Flatpak" \
  "Everything" \
  "Check updates only" \
  "Exit" \
  | fzf --prompt="Update > ")

case "$choice" in
  "Pacman (system)")
    snapshot_pre
    sudo pacman -Syu
    snapshot_post
    ;;
  "AUR")
    snapshot_pre
    [ -n "$aur" ] && $aur -Syu || echo "No AUR helper installed"
    snapshot_post
    ;;
  "Flatpak")
    flatpak update
    ;;
  "Everything")
    snapshot_pre
    sudo pacman -Syu
    [ -n "$aur" ] && $aur -Syu
    flatpak update
    snapshot_post
    ;;
  "Check updates only")
    echo
    echo "Pacman:"
    checkupdates || echo "No pacman updates"
    echo
    echo "AUR:"
    [ -n "$aur" ] && $aur -Qua || echo "No AUR helper installed"
    echo
    echo "Flatpak:"
    flatpak remote-ls --updates
    ;;
  *)
    exit 0
    ;;
esac
