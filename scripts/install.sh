#!/usr/bin/env bash
set -e

if [ "$EUID" -eq 0 ]; then
    echo "Don't run this as root!"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting full Arch install..."

bash "$SCRIPT_DIR/install-system.sh"
bash "$SCRIPT_DIR/install-pacman.sh"
bash "$SCRIPT_DIR/install-aur.sh"

# Flatpak
echo "Setting up Flatpak..."
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Set zsh as default shell
if [ "$SHELL" != "/bin/zsh" ]; then
    chsh -s /bin/zsh
fi

echo "Install complete! Run setup-dotfiles.sh to stow configs."
