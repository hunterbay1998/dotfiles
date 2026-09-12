# Plymouth

Plymouth is the boot splash screen — shows an animation while the system boots and during LUKS decryption.

## Install
```bash
sudo pacman -S plymouth
```

## Set a theme
```bash
plymouth-set-default-theme -l          # list available themes
sudo plymouth-set-default-theme bgrt   # set a theme
```

## Rebuild initramfs after changing theme
```bash
sudo mkinitcpio -P
```

## Add plymouth to mkinitcpio hooks
Edit `/etc/mkinitcpio.conf` — add `plymouth` after `base udev`:
```
HOOKS=(base udev plymouth ...)
```
Then rebuild:
```bash
sudo mkinitcpio -P
```

## Add plymouth to bootloader
Add `splash` to your kernel parameters in your bootloader config.

For systemd-boot edit `/boot/loader/entries/arch.conf`:
```
options root=... rw splash quiet
```
