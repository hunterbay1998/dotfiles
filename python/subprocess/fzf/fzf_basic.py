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

options = ["nordvpn", "update", "power"]
selected_option = prompt_fzf(options)

menu = {"nordvpn": {
    
    "connect": ["nordvpn", "connect"],
    
    "select a contry": {
        "UK": ["nordvpn", "connect", "United Kingdom"],
        "US": ["nordvpn", "connect", "United States"],
        
        },
    },
    
}


