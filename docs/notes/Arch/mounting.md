# Mounting Drives

## See all drives
```bash
lsblk
```
Lists all drives and partitions. Look for names like `sda`, `sdb`, `nvme0n1`.

## Mount a drive
```bash
sudo mount /dev/sdX1 /mnt
```
Replace `sdX1` with your partition (e.g. `sda1`). The folder `/mnt` is where you access it.

## Unmount a drive
```bash
sudo umount /mnt
```

## Create a mount point
```bash
sudo mkdir /mnt/myDrive
sudo mount /dev/sdX1 /mnt/myDrive
```
A mount point is just a folder where the drive shows up.

## Check what's mounted
```bash
lsblk -f
```
Shows drives, partitions, and their filesystems.
