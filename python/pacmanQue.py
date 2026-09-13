import subprocess


def run_command(command):
    result = subprocess.run(
        command,
        capture_output=True,
        check=True,
        text=True,
    )
    return result

print("checking for outdated packages...")

cmd = run_command(["pacman", "-Que"])

if cmd.returncode == 0:
    print("\nSuccess! No outdated packages found.")

    packages = cmd.stdout.strip().splitlines()

    for pkg in packages:
        print(pkg)

    print(f"\nTotal: packages to update: {len(packages)}")

elif cmd.returncode == 1:
    print("\nResult: System is up to date.")

elif cmd.returncode == 2:
    print("\nResult: System has encountered an error.")
    print(f"Details from stderr: {cmd.stderr.strip()}")

else:
    print(f"Unexpected return code: {cmd.returncode}")
    print(f"Details from stderr: {cmd.stderr.strip()}")
