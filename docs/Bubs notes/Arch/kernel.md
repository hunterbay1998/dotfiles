# Kernel

## Available kernels
| Kernel | Description |
|--------|-------------|
| `linux` | Standard Arch kernel |
| `linux-lts` | Long term support — more stable |
| `linux-zen` | Optimised for desktop performance |
| `linux-hardened` | Security focused |

## Install a kernel
```bash
sudo pacman -S linux-zen linux-zen-headers
```

## List installed kernels
```bash
ls /boot/vmlinuz*
```

## Update bootloader after installing
For systemd-boot:
```bash
sudo bootctl update
```
systemd-boot auto detects new kernels so no manual entry needed.

For GRUB:
```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## Remove a kernel
```bash
sudo pacman -R linux-zen linux-zen-headers
```
