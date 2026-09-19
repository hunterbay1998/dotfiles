import subprocess

print("updating system packages...")

result = subprocess.run(["sudo", "pacman", "-Syu"])

if result.returncode == 0:
    print("\nSuccess! System is up to date.")
else:
    print(f"\nUpdate failed (exit code {result.returncode})")
