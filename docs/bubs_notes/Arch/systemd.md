# Systemd

Systemd manages services on Arch — things like bluetooth, networking, and apps that run in the background.

## Start a service
```bash
sudo systemctl start servicename
```

## Stop a service
```bash
sudo systemctl stop servicename
```

## Restart a service
```bash
sudo systemctl restart servicename
```

## Enable on boot
```bash
sudo systemctl enable servicename
```

## Disable on boot
```bash
sudo systemctl disable servicename
```

## Enable and start at the same time
```bash
sudo systemctl enable --now servicename
```

## Check status
```bash
sudo systemctl status servicename
```

## List all running services
```bash
systemctl list-units --type=service
```
