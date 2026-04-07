# Permissions

Every file on Linux has permissions for 3 groups: **owner**, **group**, and **everyone else**.

## View permissions
```bash
ls -l
```
Example output:
```
-rwxr-xr-- 1 bailey users 1234 Apr 7 file.sh
```
- `r` = read
- `w` = write
- `x` = execute
- `-` = no permission

## chmod — change permissions

### Using numbers
```bash
chmod 755 file.sh
```
Each digit = owner / group / everyone:
| Number | Permissions |
|--------|------------|
| 7 | rwx |
| 6 | rw- |
| 5 | r-x |
| 4 | r-- |
| 0 | --- |

### Using letters
```bash
chmod +x file.sh      # add execute for everyone
chmod u+x file.sh     # add execute for owner only
chmod o-r file.sh     # remove read from everyone else
```

## chown — change owner
```bash
sudo chown bailey file.txt
```

## Change owner and group
```bash
sudo chown bailey:users file.txt
```

## Apply to a whole folder
```bash
sudo chmod -R 755 /mnt/myDrive
sudo chown -R bailey:users /home/bailey/folder
```
`-R` means recursive — applies to everything inside.
