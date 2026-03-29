#!/usr/bin/env bash
set -e

if [ "$EUID" -eq 0 ]; then
    echo "Don't run this as root!"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOTFILES_DIR="$(dirname "$SCRIPT_DIR")"

# Enable multilib if not already enabled
if ! grep -q "^\[multilib\]" /etc/pacman.conf; then
    echo "Enabling multilib..."
    sudo sed -i '/^#\[multilib\]/,/^#Include/{s/^#//}' /etc/pacman.conf
    sudo pacman -Sy
fi

echo "Installing pacman packages..."
sudo pacman -S --needed --noconfirm $(sed 's/#.*//' "$DOTFILES_DIR/packages/pacman.sh" | grep -v '^\s*$')

echo "Pacman packages installed!"
