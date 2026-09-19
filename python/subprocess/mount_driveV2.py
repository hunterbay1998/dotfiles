import os
import subprocess
import sys

MOUNT_POINT = "/mnt/external"


def run_command(cmd):
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        check=True,
    )
    return result


def list_partitions():
    # -ln = no header, no tree characters. -o NAME = just the name column.
    result = run_command(["lsblk", "-ln", "-o", "NAME"])
    return result.stdout.split()


def check_device(mount_point):
    if os.path.ismount(mount_point):
        print("Device is mounted")
    else:
        print("Device is not mounted")
        sys.exit(1)


print(f"Creating directory {MOUNT_POINT} if it does not exist...")

run_command(["sudo", "mkdir", "-p", MOUNT_POINT])

print("Directory created successfully")

print(run_command(["lsblk"]).stdout)

drives = list_partitions()

drive = input("Enter the drive to mount (e.g., sda1)\n> ").strip()

if drive not in drives:
    print(f"{drive} is not a valid drive. Please choose from {drives}.")
    sys.exit(1)

print(f"Mounting {drive} to {MOUNT_POINT}...")

try:
    run_command(["sudo", "mount", f"/dev/{drive}", MOUNT_POINT])
except subprocess.CalledProcessError as e:
    print(f"Mount failed: {e.stderr.strip()}")
    sys.exit(1)

print("Device mounted successfully")

check_device(MOUNT_POINT)
