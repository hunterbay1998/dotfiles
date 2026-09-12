# Yay

Yay is an AUR helper similar to [[paru]].

## Install yay
```bash
sudo pacman -S --needed base-devel git
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## Install a package
```bash
yay -S packagename
```

## Update everything (including AUR)
```bash
yay -Syu
```

## Search for a package
```bash
yay -Ss keyword
```

## Remove a package
```bash
yay -R packagename
```

## Remove a package and its unused dependencies
```bash
yay -Rs packagename
```
