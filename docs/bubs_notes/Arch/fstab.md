# fstab

fstab is a file that tells Arch which drives to automatically mount on boot.

## Location
```bash
/etc/fstab
```

## View fstab
```bash
cat /etc/fstab
```

## Find a drive's UUID
```bash
lsblk -f
```
You need the UUID to add a drive to fstab.

## Example fstab entry
```
UUID=your-uuid-here  /mnt/myDrive  ext4  defaults  0  2
```
- `UUID` — unique ID of the partition
- `/mnt/myDrive` — where it mounts
- `ext4` — filesystem type (could be ntfs, btrfs, etc.)
- `defaults` — standard mount options
- `0` — don't backup with dump
- `2` — check disk on boot (use 1 for root, 2 for others, 0 to skip)

## Apply changes without rebooting
```bash
sudo mount -a
```
Tests your fstab. If it errors, fix it before rebooting or you may not boot properly.

## Edit fstab
```bash
sudo nano /etc/fstab
```
