# Bluetooth

## Install
```bash
sudo pacman -S bluez bluez-utils blueman
```

## Enable and start
```bash
sudo systemctl enable --now bluetooth
```

## GUI
```bash
blueman-manager
```

## Terminal (bluetoothctl)
```bash
bluetoothctl
```

### Inside bluetoothctl
```bash
power on           # turn bluetooth on
scan on            # scan for devices
pair XX:XX:XX      # pair a device (use its MAC address)
connect XX:XX:XX   # connect to a device
trust XX:XX:XX     # auto connect in future
devices            # list known devices
exit               # quit
```
