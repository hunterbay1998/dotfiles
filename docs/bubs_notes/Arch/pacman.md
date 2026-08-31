# Pacman

## Install a package
```bash
sudo pacman -S packagename
```

## Remove a package
```bash
sudo pacman -R packagename
```

## Remove a package and its unused dependencies
```bash
sudo pacman -Rs packagename
```

## Update everything
```bash
sudo pacman -Syu
```

## Search for a package
```bash
pacman -Ss keyword
```

## Check if a package is installed
```bash
pacman -Q packagename
```

## List all installed packages
```bash
pacman -Q
```

## Clear package cache
```bash
sudo pacman -Sc
```
Frees up space by removing old downloaded packages.

## AUR (yay)
For packages not in the official repos, use [[paru]] instead of `pacman`:
```bash
yay -S packagename
```
