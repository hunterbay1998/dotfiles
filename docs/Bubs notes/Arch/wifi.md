# Wifi

## Check connection status
```bash
nmcli
```

## List available networks
```bash
nmcli device wifi list
```

## Connect to a network
```bash
nmcli device wifi connect "NetworkName" password "yourpassword"
```

## Disconnect
```bash
nmcli device disconnect wlan0
```

## Show saved connections
```bash
nmcli connection show
```

## Enable/disable wifi
```bash
nmcli radio wifi on
nmcli radio wifi off
```

## Check your IP address
```bash
ip addr
```
