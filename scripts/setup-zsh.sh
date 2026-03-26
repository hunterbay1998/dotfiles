#!/usr/bin/env bash
set -e

echo "Configuring zsh..."

# Set zsh as default shell
if [ "$SHELL" != "/bin/zsh" ]; then
    chsh -s /bin/zsh
fi

# Add sources to .zshrc
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

echo "Zsh configured!"
