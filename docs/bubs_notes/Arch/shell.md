# Shell

## Check current shell
```bash
echo $SHELL
```

## Install zsh
```bash
sudo pacman -S zsh
```

## Change shell to zsh
```bash
chsh -s /bin/zsh
```
Log out and back in for it to take effect.

## Install Powerlevel10k
```bash
sudo pacman -S zsh-theme-powerlevel10k
```
Then add to `.zshrc`:
```bash
source /usr/share/zsh-theme-powerlevel10k/powerlevel10k.zsh-theme
```
Run the configurator:
```bash
p10k configure
```

## Install plugins
```bash
sudo pacman -S zsh-autosuggestions zsh-syntax-highlighting zsh-autopair zsh-history-substring-search
paru -S zsh-you-should-use
```
Then add to `.zshrc`:
```bash
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autopair/autopair.zsh
source /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh
source /usr/share/zsh/plugins/zsh-you-should-use/zsh-you-should-use.plugin.zsh
```

## Install zoxide and fzf
```bash
sudo pacman -S zoxide fzf
```
Then add to `.zshrc`:
```bash
eval "$(zoxide init zsh)"
source /usr/share/fzf/key-bindings.zsh
source /usr/share/fzf/completion.zsh
```