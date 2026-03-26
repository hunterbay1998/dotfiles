#!/usr/bin/env bash
set -e

# =============================
# Check running as normal user
# =============================
if [ "$EUID" -eq 0 ]; then
    echo "Don't run this as root!"
    exit 1
fi

# =============================
# Get script directory
# =============================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOTFILES_DIR="$(dirname "$SCRIPT_DIR")"

echo "Starting Arch install..."
echo "Dotfiles directory: $DOTFILES_DIR"

# =============================
# Update system
# =============================
echo "Updating system..."
sudo pacman -Syu --noconfirm

# =============================
# Install paru
# =============================
if ! command -v paru &>/dev/null; then
    echo "Installing paru..."
    sudo pacman -S --needed --noconfirm base-devel git
    git clone https://aur.archlinux.org/paru.git /tmp/paru-install
    cd /tmp/paru-install && makepkg -si --noconfirm
    cd - && rm -rf /tmp/paru-install
fi

# =============================
# Enable multilib
# =============================
echo "Enabling multilib..."
sudo sed -i '/^#\[multilib\]/,/^#Include/{s/^#//}' /etc/pacman.conf
sudo pacman -Sy

# =============================
# Install packages
# =============================
echo "Installing pacman packages..."
sudo pacman -S --needed --noconfirm $(grep -v '^\s*#' "$DOTFILES_DIR/packages/pacman.txt" | grep -v '^\s*$')

echo "Installing multilib packages..."
sudo pacman -S --needed --noconfirm $(grep -v '^\s*#' "$DOTFILES_DIR/packages/multilib.txt" | grep -v '^\s*$')

echo "Installing AUR packages..."
paru -S --needed --noconfirm $(grep -v '^\s*#' "$DOTFILES_DIR/packages/aur.txt" | grep -v '^\s*$')

# =============================
# Flatpak
# =============================
echo "Setting up Flatpak..."
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

FLATPAKS=$(grep -v '^\s*#' "$DOTFILES_DIR/packages/flatpak.txt" | grep -v '^\s*$')
if [ -n "$FLATPAKS" ]; then
    echo "Installing Flatpak packages..."
    flatpak install -y flathub $FLATPAKS
fi

# =============================
# Run sub scripts
# =============================
echo "Setting up zsh..."
bash "$SCRIPT_DIR/setup-zsh.sh"

echo "Setting up dotfiles..."
bash "$SCRIPT_DIR/setup-dotfiles.sh"

echo "Install complete! Please reboot."
