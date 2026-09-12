# ─── Powerlevel10k instant prompt ─────────────────────────────────────────────
# Must stay near the top. Anything that prints output must go BELOW this block.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# ─── Path ─────────────────────────────────────────────────────────────────────
# typeset -U keeps duplicates out, so nested shells and `exec zsh` can't stack
# up copies of the same directory (the old config did this twice).
typeset -U path PATH
path=(~/.local/bin $path)
export PATH

# ─── Environment ──────────────────────────────────────────────────────────────
if command -v nvim >/dev/null 2>&1; then
  export EDITOR=nvim
else
  export EDITOR=nano
fi
export VISUAL="$EDITOR"
export SUDO_EDITOR="$EDITOR"

# bat ships no Tokyo Night theme; TwoDark is a built-in that sits well on #1a1b26.
# For a real one: drop a .tmTheme into `bat --config-dir`/themes, then `bat cache --build`.
export BAT_THEME='TwoDark'

# Tokyo Night colours for fzf, plus alt-j/alt-k to move the selection
export FZF_DEFAULT_OPTS="
  --height 40% --layout=reverse --border
  --bind alt-j:down,alt-k:up
  --color=bg+:#292e42,bg:#1a1b26,spinner:#bb9af7,hl:#7aa2f7
  --color=fg:#c0caf5,header:#7aa2f7,info:#7dcfff,pointer:#bb9af7
  --color=marker:#9ece6a,fg+:#c0caf5,prompt:#7aa2f7,hl+:#7aa2f7"
command -v fd >/dev/null && export FZF_DEFAULT_COMMAND='fd --type f --hidden --exclude .git'

# File-type colours, used by `ls` and the completion menu (nothing sets them otherwise)
[[ -z $LS_COLORS ]] && command -v dircolors >/dev/null && eval "$(dircolors -b)"

# ─── History ──────────────────────────────────────────────────────────────────
HISTFILE=~/.histfile
HISTSIZE=50000
SAVEHIST=50000
setopt HIST_IGNORE_ALL_DUPS    # drop older duplicates of a repeated command
setopt HIST_IGNORE_SPACE       # a leading space keeps a command out of history
setopt HIST_REDUCE_BLANKS
setopt HIST_VERIFY             # expand !! etc. onto the line instead of running it
setopt SHARE_HISTORY           # live-share history between open shells
setopt EXTENDED_HISTORY        # record timestamps

# ─── Behaviour ────────────────────────────────────────────────────────────────
setopt AUTO_CD                 # `..` or a bare dir name cds into it
setopt AUTO_PUSHD              # keep a directory stack
setopt PUSHD_IGNORE_DUPS
setopt INTERACTIVE_COMMENTS    # allow # comments at the prompt
setopt NO_BEEP
bindkey -e                     # emacs keys

# ─── Completion ───────────────────────────────────────────────────────────────
autoload -Uz compinit && compinit
zstyle ':completion:*' menu select                          # arrow-key menu
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}'   # case-insensitive
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
zstyle ':completion:*' group-name ''
zstyle ':completion:*:descriptions' format '%F{#7aa2f7}%d%f' # blue group headings

# ─── Aliases: pacman ──────────────────────────────────────────────────────────
alias install="sudo pacman -S"
alias update="sudo pacman -Syu"
alias search="pacman -Ss"          # searching needs no root
alias remove="sudo pacman -Rns"
alias installed="pacman -Q"        # everything installed
alias explicit="pacman -Qe"        # only what you asked for, not dependencies
alias orphans="pacman -Qdt"        # dependencies nothing needs any more
alias cleanup='sudo pacman -Rns $(pacman -Qdtq)'   # remove those orphans

# ─── Aliases: modern replacements ─────────────────────────────────────────────
# grep and find are deliberately NOT aliased to rg/fd: the flags differ, so
# `grep -r pat .` and `find . -name '*.ts'` would break. Type rg/fd directly.
command -v bat >/dev/null && alias cat='bat --paging=never'
if command -v eza >/dev/null; then
  alias ls='eza --icons=auto --group-directories-first'
  alias ll='eza --icons=auto --group-directories-first -lah --git'
  alias lt='eza --icons=auto --tree --level=2'
fi
command -v zoxide >/dev/null && alias cd='z'   # z is a superset of cd
command -v dust  >/dev/null && alias du='dust'
command -v duf   >/dev/null && alias df='duf'
command -v btop  >/dev/null && alias top='btop'
command -v procs >/dev/null && alias ps='procs'

# ─── Aliases: git ─────────────────────────────────────────────────────────────
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gpl='git pull'
alias gl='git log --oneline'
alias gd='git diff'

# ─── Aliases: general ─────────────────────────────────────────────────────────
alias c='clear'
alias ..='cd ..'
alias ...='cd ../..'
alias py='python'
alias reloadzsh="exec zsh"         # fresh shell; `source ~/.zshrc` would load plugins twice
alias zshgo="$EDITOR ~/.zshrc"
command -v fastfetch >/dev/null && alias ff='fastfetch'
command -v yazi >/dev/null && alias suyazi='sudo -E yazi'
command -v rsync >/dev/null && alias rsync='rsync -av --info=progress2'
[[ -f ~/dotfiles/.config/nvim/KEYBINDINGS.md ]] && \
  alias nvimkeys='bat --style=plain -l md ~/dotfiles/.config/nvim/KEYBINDINGS.md'
command -v stow >/dev/null && \
  alias stowdots='cd ~/dotfiles && stow --ignore="packages" --ignore="README.md" --ignore="docs" .'

# ─── Plugins & tools (guarded — absent files are skipped silently) ────────────
_zsh_plugin() { [[ -r $1 ]] && source $1 }

#_zsh_plugin /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
#ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=#565f89'   # Tokyo Night comment grey

_zsh_plugin /usr/share/fzf/key-bindings.zsh    # Ctrl+R history, Ctrl+T files, Alt+C cd
_zsh_plugin /usr/share/fzf/completion.zsh      # `**<Tab>` fuzzy completion

# Ctrl+F: fuzzy find a file and open it in Neovim (~/.local/bin/vf)
_vf_widget() {
  zle push-line      # set aside whatever you'd typed
  BUFFER="vf"        # put `vf` on the command line
  zle accept-line    # run it, as if you pressed Enter
}
zle -N _vf_widget    # register the function as a key-bindable widget
bindkey '^F' _vf_widget

command -v zoxide >/dev/null && eval "$(zoxide init zsh)"   # `z <fragment>` to jump

# ─── Prompt ───────────────────────────────────────────────────────────────────
_zsh_plugin ~/.local/share/powerlevel10k/powerlevel10k.zsh-theme
[[ -f ~/.p10k.zsh ]] && source ~/.p10k.zsh

# ─── Machine-specific settings, not committed to dotfiles ─────────────────────
[[ -f ~/.zshrc.local ]] && source ~/.zshrc.local

# ─── Syntax highlighting (must be sourced after everything above) ─────────────
_zsh_plugin /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# History substring search loads AFTER syntax highlighting, as its docs require.
# Up/Down then search history by what you've already typed.
if [[ -r /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh ]]; then
  source /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh
  bindkey '^[[A' history-substring-search-up
  bindkey '^[[B' history-substring-search-down
  [[ -n ${terminfo[kcuu1]} ]] && bindkey "${terminfo[kcuu1]}" history-substring-search-up
  [[ -n ${terminfo[kcud1]} ]] && bindkey "${terminfo[kcud1]}" history-substring-search-down
fi
