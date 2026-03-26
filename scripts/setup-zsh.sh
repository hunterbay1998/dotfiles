#!/bin/bash

# Install zsh if not already installed
if ! command -v zsh &>/dev/null; then
    sudo pacman -S --needed zsh
fi

# Set zsh as default shell
if [ "$SHELL" != "/bin/zsh" ]; then
    chsh -s /bin/zsh
fi

# Install paru (AUR helper) if not already installed
if ! command -v paru &>/dev/null; then
    sudo pacman -S --needed base-devel git
    git clone https://aur.archlinux.org/paru.git /tmp/paru-install
    cd /tmp/paru-install && makepkg -si --noconfirm
    cd - && rm -rf /tmp/paru-install
fi

# Install official repo packages
sudo pacman -S --needed \
    zsh-autosuggestions \
    zsh-syntax-highlighting \
    eza \
    zoxide \
    fd \
    bat \
    ripgrep \
    fzf \
    tldr \
    btop \
    fastfetch \
    nvtop

# Install AUR packages
paru -S --needed zsh-theme-powerlevel10k-git

# Add sources to .zshrc if not already there
ZSHRC="$HOME/.zshrc"

add_line() {
    if ! grep -qF "$1" "$ZSHRC"; then
        echo "$1" >> "$ZSHRC"
    fi
}

add_line 'source /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme'
add_line 'source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh'
add_line 'source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh'
add_line 'eval "$(zoxide init zsh)"'
add_line 'source /usr/share/fzf/key-bindings.zsh'
add_line 'source /usr/share/fzf/completion.zsh'

echo "Done! Restart your terminal or run: source ~/.zshrc"
