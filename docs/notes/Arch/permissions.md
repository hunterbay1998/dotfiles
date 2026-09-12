# Permissions

Every file on Linux has permissions for 3 groups: **owner**, **group**, and **everyone else**.

## Reading permissions
```bash
ls -l
```
Example output:
```
-rwxr-xr-- 1 bailey users 1234 Apr 7 file.sh
```

Breaking it down:
```
- rwx r-x r--
│ │   │   └── everyone else (other)
│ │   └── group
│ └── owner
└── file type (- = file, d = directory, l = symlink)
```

- `r` = read
- `w` = write
- `x` = execute
- `-` = no permission

## Real example
```
drwxr-xr-x bailey users /mnt/games
```
- `d` — it's a directory
- `rwx` — bailey can read, write, and enter it
- `r-x` — group `users` can read and enter but not write
- `r-x` — everyone else can read and enter but not write

## chmod — change permissions

### Using numbers (most common)
```bash
chmod 755 file.sh
```
Each digit = owner / group / everyone else:
| Number | Permissions | Meaning |
|--------|------------|---------|
| 7 | rwx | full access |
| 6 | rw- | read and write |
| 5 | r-x | read and execute |
| 4 | r-- | read only |
| 0 | --- | no access |

Common combinations:
| chmod | Use case |
|-------|----------|
| `755` | Scripts and folders — owner full, others read/execute |
| `644` | Normal files — owner read/write, others read only |
| `700` | Private — owner only |
| `777` | Everyone full access (avoid unless necessary) |

### Using letters
```bash
chmod +x file.sh       # add execute for everyone
chmod u+x file.sh      # add execute for owner only
chmod g+w file.sh      # add write for group
chmod o-r file.sh      # remove read from everyone else
chmod a+r file.sh      # add read for all (a = all)
```

Letter reference:
- `u` = user (owner)
- `g` = group
- `o` = other (everyone else)
- `a` = all three

## chown — change owner

### Change owner
```bash
sudo chown bailey file.txt
```

### Change owner and group
```bash
sudo chown bailey:users file.txt
```

### Change just the group
```bash
sudo chgrp users file.txt
```

### Apply to a whole folder
```bash
sudo chown -R bailey:bailey /mnt/games
```
`-R` means recursive — applies to everything inside.

## Common scenarios

### Drive mounted but can't write to it
```bash
sudo chown -R bailey:bailey /mnt/drivename
```

### Make a script executable
```bash
chmod +x script.sh
./script.sh
```

### Lock down a private file
```bash
chmod 600 ~/.ssh/id_ed25519
```

### Check who owns a file
```bash
stat filename
```

## Groups
Every user belongs to groups. Group permissions apply if you're in that group.

```bash
groups              # see what groups you're in
sudo usermod -aG groupname bailey   # add yourself to a group
```
Log out and back in after adding yourself to a group.
