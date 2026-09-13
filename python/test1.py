import subprocess
import os

def run_command(cmd):
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        check=True,
    )
    return result

def check_device(dev):
    if os.path.ismount("/mnt/external"):
        print("Device is mounted")
    else:
        print("Device is not mounted")

check_device("/dev/sda1")


cmd = run_command([
    "sudo",
    "mkdir",
    "-p",
    "/mnt/external"
])

if cmd.returncode == 0:
    print("Directory created successfully")
else:
    print("Failed to create directory")

