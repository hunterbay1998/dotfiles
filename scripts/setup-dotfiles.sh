#!/usr/bin/env bash
set -e

DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Setting up dotfiles..."
cd "$DOTFILES_DIR"
stow .
echo "Dotfiles stowed!"
