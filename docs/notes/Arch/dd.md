# dd

dd copies data byte by byte — used for writing ISOs to USB drives.

## Write an ISO to a USB
```bash
sudo dd if=/path/to/file.iso of=/dev/sdX bs=4M status=progress
```
- `if` — input file (your ISO)
- `of` — output file (your USB drive — use `lsblk` to find it)
- `bs=4M` — block size, makes it faster
- `status=progress` — shows progress

## WARNING
Double check `of=/dev/sdX` — dd will overwrite whatever drive you point it at with no confirmation.

## Sync after writing
```bash
sync
```
Makes sure everything is written before removing the USB.
