import subprocess

def main(cmd):
    fzf_input="\n".join(cmd)

    try:
        result = subprocess.run(
            ["fzf"],
            input=fzf_input,
            capture_output=True,
            check=True,
            text=True
            )

        if result.returncode == 0:
            print("Success")
            return result

        elif result.returncode == 1:
            print("error")
            return result

        else: 
            print(f"{result.returncode}")

    except FileNotFoundError:
        # 3. Added the missing except block for safety
        print(f"System Error: The program '{cmd}' was not found.")
        return None



options = ["nordvpn", "connect"]

running_commands = [""]



print("Running subprocess...")

cmd = main(running_commands[0])

if cmd:
    print(cmd.stdout)


