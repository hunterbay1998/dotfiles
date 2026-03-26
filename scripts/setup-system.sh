#!/bin/bash

# =============================
# Install paru (AUR helper)
# =============================
if ! command -v paru &>/dev/null; then
    sudo pacman -S --needed base-devel git
    git clone https://aur.archlinux.org/paru.git /tmp/paru-install
    cd /tmp/paru-install && makepkg -si --noconfirm
    cd - && rm -rf /tmp/paru-install
fi

# =============================
# Install packages (pacman)
# =============================
sudo pacman -S --needed \
    waybar \
    hyprpaper \
    hypridle \
    wofi \
    kitty \
    nautilus \
    brightnessctl \
    playerctl \
    grim \
    slurp \
    network-manager-applet \
    blueman \
    ibus \
    pipewire \
    wireplumber \
    chromium \
    ttf-nerd-fonts-symbols \
    ttf-jetbrains-mono-nerd \
    openssh \
    sshfs \
    pavucontrol \
    swaync \
    wlogout

# =============================
# Install packages (multilib)
# =============================
sudo pacman -S --needed steam discord || echo "Steam/Discord failed — enable multilib in /etc/pacman.conf"

# =============================
# Install AUR packages
# =============================
paru -S --needed \
    hyprlauncher

# =============================
# Flatpak setup
# =============================
sudo pacman -S --needed flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# =============================
# Run zsh setup
# =============================
bash ~/scripts/setup-zsh.sh

echo "System setup complete!"
