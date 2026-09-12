# Partitioning

## List drives
```bash
lsblk
```

## cfdisk (easier — recommended)
```bash
sudo cfdisk /dev/sda
```
Navigate with arrow keys, select New to create a partition.

## fdisk (more manual)
```bash
sudo fdisk /dev/sda
```

### Common fdisk commands
```
m   # help
p   # print partition table
n   # new partition
d   # delete partition
w   # write changes and exit
q   # quit without saving
```

## Format a partition
```bash
mkfs.ext4 /dev/sda1       # Linux partition
mkfs.fat -F32 /dev/sda1   # EFI partition
mkswap /dev/sda2           # swap partition
```
