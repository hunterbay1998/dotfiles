# Commands

## Files and folders
| Command | What it does |
|---------|-------------|
| `cp file dest` | Copy a file |
| `cp -r dir dest` | Copy a folder |
| `mv file dest` | Move or rename a file |
| `rm file` | Delete a file |
| `rm -r dir` | Delete a folder |
| `rm -rf dir` | Force delete a folder (no confirmation) |
| `mkdir folder` | Create a folder |
| `touch file` | Create an empty file |
| `ls` | List files |
| `ls -la` | List files with details and hidden files |

## Viewing files
| Command | What it does |
|---------|-------------|
| `cat file` | Print file contents |
| `less file` | Scroll through a file |
| `head file` | Show first 10 lines |
| `tail file` | Show last 10 lines |
| `tail -f file` | Watch a file update in real time |

## Searching
| Command | What it does |
|---------|-------------|
| `grep "text" file` | Search for text in a file |
| `grep -r "text" dir` | Search recursively in a folder |
| `find . -name "*.txt"` | Find files by name |

## Common flags
| Flag | Meaning |
|------|---------|
| `-r` | Recursive (applies to folders) |
| `-f` | Force (no confirmation) |
| `-v` | Verbose (show what's happening) |
| `-h` | Human readable sizes |
| `-a` | All (including hidden files) |

## Misc
| Command | What it does |
|---------|-------------|
| `pwd` | Show current directory |
| `whoami` | Show current user |
| `history` | Show command history |
| `man command` | Manual for a command |
| `which command` | Show where a command is installed |
