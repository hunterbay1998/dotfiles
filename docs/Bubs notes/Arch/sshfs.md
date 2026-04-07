# SSHFS

SSHFS lets you mount a remote server's filesystem locally over SSH.

## Install
```bash
sudo pacman -S sshfs
```

## Mount a remote folder
```bash
sshfs user@serveraddress:/remote/path ~/local/folder
```

## Unmount
```bash
fusermount -u ~/local/folder
```

## Create a mount point first
```bash
mkdir ~/server
sshfs bailey@192.168.1.176:/srv ~/server
```

## Mount automatically on boot (fstab)
```
user@serveraddress:/remote/path /local/folder fuse.sshfs defaults,_netdev,auto 0 0
```
