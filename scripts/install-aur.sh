#!/usr/bin/env bash
set -e

if [ "$EUID" -eq 0 ]; then
    echo "Don't run this as root!"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOTFILES_DIR="$(dirname "$SCRIPT_DIR")"

# Install paru if not installed
if ! command -v paru &>/dev/null; then
    echo "Installing paru..."
    sudo pacman -S --needed --noconfirm base-devel git
    git clone https://aur.archlinux.org/paru.git /tmp/paru-install
    cd /tmp/paru-install && makepkg -si --noconfirm
    cd - && rm -rf /tmp/paru-install
fi

echo "Installing AUR packages..."
paru -S --needed --noconfirm $(sed 's/#.*//' "$DOTFILES_DIR/packages/aur.sh" | grep -v '^\s*$')

echo "AUR packages installed!"
