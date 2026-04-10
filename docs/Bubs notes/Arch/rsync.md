# rsync

rsync copies files like `cp` but only transfers what has changed — faster for large files and folders.

## Install
```bash
sudo pacman -S rsync
```

## Basic copy
```bash
rsync -av source/ destination/
```
- `-a` — archive mode, preserves permissions, timestamps, symlinks
- `-v` — verbose, shows what's being copied

## Copy to mounted server
```bash
rsync -av ~/folder/ ~/server/destination/
```

## Copy from mounted server
```bash
rsync -av ~/server/folder/ ~/local/destination/
```

## Show progress
```bash
rsync -av --progress source/ destination/
```

## Dry run — preview without copying
```bash
rsync -av --dry-run source/ destination/
```
Good to run first to check what will be transferred.

## Delete files at destination that no longer exist at source
```bash
rsync -av --delete source/ destination/
```

## Common flags
| Flag | Description |
|------|-------------|
| `-a` | Archive — preserves everything |
| `-v` | Verbose — shows files being copied |
| `-z` | Compress data during transfer |
| `-h` | Human readable file sizes |
| `-n` / `--dry-run` | Preview without making changes |
| `--progress` | Show progress per file |
| `--delete` | Remove files at destination not in source |

## Note on trailing slashes
```bash
rsync -av folder/ destination/   # copies contents of folder
rsync -av folder destination/    # copies the folder itself
```
The trailing `/` on the source matters.
