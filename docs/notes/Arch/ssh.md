# SSH

For file sharing over a network see [[samba]].

## Connect to a server
```bash
ssh user@serveraddress
```
Replace `user` with your username and `serveraddress` with the IP or hostname.

## Connect on a specific port
```bash
ssh user@serveraddress -p 2222
```
Default port is 22. Only needed if the server uses a different one.

## Disconnect
```bash
exit
```

## Generate an SSH key
```bash
ssh-keygen -t ed25519
```
Creates a public and private key. Keep the private key safe, never share it.

## Copy your key to a server
```bash
ssh-copy-id user@serveraddress
```
After this you can log in without a password.

## Check your saved keys
```bash
ls ~/.ssh/
```
- `id_ed25519` — your private key
- `id_ed25519.pub` — your public key (safe to share)
