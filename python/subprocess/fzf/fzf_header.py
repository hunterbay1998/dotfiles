import subprocess


def prompt_fzf_with_title(choices, title_text):
    fzf_command = [
        "fzf",
        "--border",                       # required for the label to render
        "--border-label", title_text,
        "--border-label-pos=center",      # optional; default is left-ish
        "--layout=reverse",
        "--height=40%",
    ]

    try:
        process = subprocess.run(
            fzf_command,
            input="\n".join(choices),
            capture_output=True,
            text=True,
            check=True,
        )
        return process.stdout.strip()
    except subprocess.CalledProcessError as e:
        if e.returncode in (1, 130):      # no match, or user aborted
            return None
        raise RuntimeError(f"fzf failed ({e.returncode}): {e.stderr.strip()}") from e
