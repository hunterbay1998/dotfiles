#!/usr/bin/env bash
set -e

echo "Setting up dotfiles..."

DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Install stow if not installed
if ! command -v stow &>/dev/null; then
    sudo pacman -S --needed stow
fi

# Create symlinks
cd "$DOTFILES_DIR"
stow --ignore='scripts' --ignore='packages' --ignore='README.md' .
echo "Dotfiles setup complete!"
