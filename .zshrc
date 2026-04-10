if [ "$(pgrep -c -u $USER kitty)" -le 1 ]; then
  fastfetch
fi

# =============================
# Powerlevel10k instant prompt
# =============================
# Must stay near the top. Console input (password prompts, etc.) must go above this block.
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# =============================
# Path
# =============================
export PATH="$HOME/.local/bin:$HOME/.claude/bin:$PATH"
export EDITOR=nvim
export PATH="$HOME/.local/bin:$PATH"   
export FZF_DEFAULT_OPTS='--bind "alt-j:down,alt-k:up"'
# =============================
# History
# =============================
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_ALL_DUPS
setopt HIST_FIND_NO_DUPS
setopt SHARE_HISTORY
setopt APPEND_HISTORY

# =============================
# Aliases - pacman
# =============================
alias get='sudo pacman -S'
#alias update='sudo pacman -Syu'
alias remove='sudo pacman -Rns'
alias search='pacman -Ss'
alias installed='pacman -Q'
alias explicit='pacman -Qe'
alias orphans='pacman -Qdt'
alias cleanup='sudo pacman -Rns $(pacman -Qdtq)'
# =============================
# Aliases - modern replacements
# =============================
alias ls='eza --icons --group-directories-first'
alias ll='eza -la --icons --group-directories-first'
alias lt='eza -T --icons --level=2'
alias cat='bat --style=plain'
alias grep='rg'
alias find='fd'

# =============================
# Aliases - server
# =============================
alias mount-server='sshfs bailey@192.168.1.176:/srv ~/server/'
alias umount-server='fusermount -u ~/server'
# =============================
# Aliases - rsync
# =============================
alias rsync='rsync -av --info=progress2'

# =============================
# Aliases - general
# =============================
alias ags-css='GTK_DEBUG=interactive ags run ~/dotfiles/.config/ags'   
alias ff='fastfetch'
alias suyazi='sudo -E yazi'
alias reloadsh='source ~/.zshrc'
alias zshgo='nvim ~/dotfiles/.zshrc'
alias c='clear'
alias ..='cd ..'
alias ...='cd ../..'

# =============================
# Aliases - git
# =============================
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git log --oneline'
alias gd='git diff'
alias gpl='git pull'
# Dotfiles
alias stowdots='cd ~/dotfiles && stow --ignore="packages" --ignore="README.md" --ignore="books" .'

#bubbas man packages
alias vimium-c='bat ~/Documents/vimium-C_keybinding.md'
alias kitty-key='bat ~/dotfiles/docs/kitty-cheat/keybinds'
# =============================
# Plugins
# =============================
source /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autopair/autopair.zsh
source /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh
source /usr/share/zsh/plugins/zsh-you-should-use/zsh-you-should-use.plugin.zsh
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
bindkey -s '\ef' 'nvim $(fzf --preview "bat --color=always {}")\n'
# =============================
# Tools
# =============================
eval "$(zoxide init zsh)"
source /usr/share/fzf/key-bindings.zsh
source /usr/share/fzf/completion.zsh
# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
