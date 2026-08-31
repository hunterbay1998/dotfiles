# Paru

Paru is an AUR helper, similar to [[yay]] but written in Rust.

## Install paru
```bash
sudo pacman -S --needed base-devel git
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
```

## Install a package
```bash
paru -S packagename
```

## Update everything (including AUR)
```bash
paru -Syu
```

## Search for a package
```bash
paru -Ss keyword
```

## Remove a package
```bash
paru -R packagename
```

## Remove a package and its unused dependencies
```bash
paru -Rs packagename
```
