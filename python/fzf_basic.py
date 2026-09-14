import subprocess



def prompt_fzf(choices):
    fzf_input= "\n".join(choices)

    try:
        process = subprocess.run(
            ["fzf"],
            input=fzf_input,
            capture_output=True,
            text=True,
            check=True
        )
        return process.stdout.strip()
    
    except subprocess.CalledProcessError:
        return None

options = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
selected_option = prompt_fzf(options)

if selected_option:
    print(f"You selected: {selected_option}")
else:
    print("No selection made.")

