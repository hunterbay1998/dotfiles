#!/usr/bin/env bash
set -e

if [ "$EUID" -eq 0 ]; then
    echo "Don't run this as root!"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOTFILES_DIR="$(dirname "$SCRIPT_DIR")"

echo "Installing system packages..."

# Update system
sudo pacman -Syu --noconfirm

# Enable multilib
echo "Enabling multilib..."
sudo sed -i '/^#\[multilib\]/,/^#Include/{s/^#//}' /etc/pacman.conf
sudo pacman -Sy

# System packages
sudo pacman -S --needed --noconfirm $(sed 's/#.*//' "$DOTFILES_DIR/packages/system.sh" | grep -v '^\s*$')

# Multilib packages
echo "Installing multilib packages..."
sudo pacman -S --needed --noconfirm $(sed 's/#.*//' "$DOTFILES_DIR/packages/multilib.sh" | grep -v '^\s*$')

# Set up snapper for root if not already configured
if ! snapper -c root list &>/dev/null; then
    echo "Setting up snapper for root..."
    sudo snapper -c root create-config /
    # Keep last 5 pre/post snapshot pairs
    sudo snapper -c root set-config "NUMBER_LIMIT=5"
    sudo snapper -c root set-config "NUMBER_LIMIT_IMPORTANT=5"
fi

echo "System packages installed!"
