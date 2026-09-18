import subprocess


def run_subprocess(cmd):
    try:
        # 1. Removed check=True so it doesn't crash on bad exit codes
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True
        )
        
        # 2. Your if/else blocks now work perfectly!
        if result.returncode == 0:
            print("Subprocess completed successfully.")
            return result
        
        elif result.returncode == 1:
            print("Subprocess failed with return code 1.")
            return result
        
        else:
            print(f"Subprocess failed with return code {result.returncode}.")
            return result # Changed to return result so you can read stderr later if needed
            
    
    except FileNotFoundError:
        # 3. Added the missing except block for safety
        print(f"System Error: The program '{cmd}' was not found.")
        return None

running_commands = ["ls"]


print("Running subprocess...")

cmd = run_subprocess(running_commands[0])

if cmd:
    print(cmd.stdout)
