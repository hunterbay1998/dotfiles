# Samba

Samba lets you share files between Linux and Windows over a network. For remote terminal access see [[ssh]].

## Install
```bash
sudo pacman -S samba
```

## Start and enable the service
```bash
sudo systemctl enable --now smb
```

## Config file location
```bash
/etc/samba/smb.conf
```

## Basic share example
Add this to `/etc/samba/smb.conf`:
```
[MyShare]
path = /home/bailey/shared
browseable = yes
read only = no
guest ok = yes
```

## Set a samba password for your user
```bash
sudo smbpasswd -a yourusername
```

## Restart samba after config changes
```bash
sudo systemctl restart smb
```

## Access a samba share from Linux
```bash
smbclient //serveraddress/MyShare -U yourusername
```

## Mount a samba share
```bash
sudo mount -t cifs //serveraddress/MyShare /mnt/myShare -o username=yourusername
```
