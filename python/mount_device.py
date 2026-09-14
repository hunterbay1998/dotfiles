import os
import subprocess
import sys


def run_command(cmd):
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        check=True,
    )
    return result

print("Creating directory /mnt/external if it does not exist...")

cmd = run_command([
    "sudo",
    "mkdir",
    "-p",
    "/mnt/external"
])

print("Directory created successfully")

print(run_command([
    "lsblk",
]).stdout)


drives = ["sda1", "sdb1", "sdc1"]

drive = input("Enter the drive to mount (e.g., sda1)\n> ")

if drive in drives:
    print(f"Mounting {drive} to /mnt/external...")
else:
    print(f"{drive} is not a valid drive. Please choose from {drives}.")
    sys.exit(1)


cmd = run_command([
    "sudo",
    "mount",
    "/dev/sda1",
    "/mnt/external"
])

print("Device mounted successfully")


def check_device(dev):
    if os.path.ismount("/mnt/external"):
        print("Device is mounted")
    
    else:
        print("Device is not mounted")
        sys.exit(1)

check_device("/dev/sdc1")

