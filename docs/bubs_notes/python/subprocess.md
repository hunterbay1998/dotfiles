# Python System Scripting — Quick Reference

## The example this is based on

```python
import subprocess

result = subprocess.run(
    ["pacman", "-Qeq"],
    capture_output=True,
    text=True,
    check=True,
)
packages = result.stdout.split()
print(f"{len(packages)} explicitly installed packages")
```

---

## `subprocess.run()`

- A **function** in the `subprocess` module — not a method.
  - Functions belong to modules: `subprocess.run(...)`
  - Methods belong to objects: `result.stdout.split()`
  - The dot just means "look inside this thing" in both cases.
- Runs a command, waits for it to finish, returns a `CompletedProcess` object.
- Pass the command as a **list**, not a string: `["pacman", "-Qeq"]`
  - Each argument is its own list item.
  - Avoids `shell=True`, which is a security risk and mangles filenames with spaces.

---

## `capture_output=True`

- **Without it:** the command inherits your terminal. Output prints to screen, Python never sees it, and `result.stdout` is `None`.
- **With it:** output is redirected into Python. Nothing prints; it lands in `result.stdout` and `result.stderr`.
- Rule of thumb: if you want to *use* the output, capture it. If you just want the user to see it, don't.

---

## `text=True`

- **Without it:** you get raw bytes — `b'firefox\nvim\n'` (note the `b`).
  - `.split()` on bytes gives you bytes objects, which won't compare cleanly to `"firefox"`.
- **With it:** Python decodes to a normal `str`.
- Almost always what you want.

---

## `check=True`

- **Without it:** a failed command (non-zero exit code) is silently ignored. You get empty stdout and your script processes nothing, happily.
- **With it:** raises `subprocess.CalledProcessError` on failure.
- Catch it:

```python
try:
    result = subprocess.run([...], capture_output=True, text=True, check=True)
except subprocess.CalledProcessError as e:
    print(f"command failed: {e}")
```

- Matters most in destructive scripts (mounting, deleting). You want loud failures, not quiet ones.

---

## stdout — the common misconception

- **stdout does NOT mean "the terminal."**
- It's the standard **output stream** a program writes to. Where it *goes* is separate:
  - normally → your terminal
  - `cmd > file.txt` → a file
  - `cmd | grep x` → another program
  - `capture_output=True` → a Python variable
- So `result.stdout` is text sitting in memory. It never touched your screen. That's the point — you captured it so you could work on it.
- **stderr** is the sibling stream for errors, kept separate so error messages don't contaminate the data you're parsing.

---

## `.split()`

- A **method on strings**. Chops a string into a list.
- With no arguments: splits on *any* whitespace (spaces, tabs, newlines) and discards empty results.
  - `"firefox\nvim\n".split()` → `["firefox", "vim"]`
- With an argument: splits on exactly that.
  - `"a:b:c".split(":")` → `["a", "b", "c"]`
- Related: `.splitlines()` splits only on newlines — better when fields may contain spaces.

---

## Reading command output as JSON

- Many tools print for **humans** (aligned columns, tree characters, blank cells). Parsing that with `.split()` breaks when:
  - a label contains a space → splits into two fields
  - a column is empty → everything after it shifts left
  - tree characters like `└─` glue onto names
- Many tools have a **machine-readable flag**:
  - `lsblk -J`
  - `ip -j addr`
  - `journalctl -o json`
  - `systemctl --output=json`
- Parse it into real Python dicts and lists with `json.loads()`:

```python
import json, subprocess

r = subprocess.run(["lsblk", "-J", "-o", "NAME,SIZE,MOUNTPOINT"],
                   capture_output=True, text=True, check=True)
data = json.loads(r.stdout)
```

- Now `device["size"]` instead of `parts[3]`. Spaces are fine, empty fields are `None`.
- **Rule:** before writing `.split()` on command output, check `man <command>` for a JSON flag.

---

## Read vs Act

- `json.loads()` gives you a **snapshot in memory** — a copy.
- Editing that dict changes **nothing** on the system:

```python
data["blockdevices"][0]["mountpoint"] = "/mnt/backup"   # does nothing
```

- To change the system you still run a command. JSON just helps you decide *which*:

```python
# READ — inspect what exists
devices = json.loads(r.stdout)["blockdevices"]
target = next(d for d in devices if d["label"] == "Backup")

# ACT — actually do it
subprocess.run(["udisksctl", "mount", "-b", target["path"]], check=True)
```

- The pattern: **read → decide → act.**
- Where you *do* write JSON: your own state files, via `json.dump()` / `json.load()`.
  For config you edit by hand, TOML is nicer (comments, less punctuation) — read with `tomllib`.

---

## Shell vs Python

- **Shell (alias / zsh function):** anything that must affect your *current shell* — `cd`, exporting env vars, one-line command shortcuts.
  - A Python script **cannot** change your shell's directory. It's a child process with its own copy of the working directory; it changes that, then exits.
- **Python:** real logic — branching, parsing structured output, error handling, saved state, more than ~15 lines.
- **The tell:** once you need an `if` inside a `for` inside a bash script, you wanted Python three lines ago.
