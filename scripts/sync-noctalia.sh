#!/usr/bin/env bash
# Fold noctalia's GUI-written settings back into the tracked config layer.
#
# Noctalia loads built-in defaults, then every *.toml in ~/.config/noctalia,
# then ~/.local/state/noctalia/settings.toml -- which the Settings UI rewrites
# and which therefore wins. This flattens that stack back into the config dir
# and clears the state file so the tracked files are authoritative again.
set -euo pipefail

repo_root=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
config_dir="${XDG_CONFIG_HOME:-$HOME/.config}/noctalia"
state_file="${XDG_STATE_HOME:-$HOME/.local/state}/noctalia/settings.toml"

command -v noctalia >/dev/null || { echo "noctalia is not installed" >&2; exit 1; }

if [[ ! -e $state_file ]]; then
  echo "No GUI overrides pending -- config layer is already current."
  exit 0
fi

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# Export and validate entirely in the temp dir: a bad export must never leave
# the real config dir half-written.
noctalia config export merged > "$tmp/merged.toml"
python3 "$repo_root/scripts/lib/noctalia-split.py" "$tmp/merged.toml" "$tmp/out"
noctalia config validate "$tmp/out"

rm -f "$config_dir"/[0-9][0-9]-*.toml
cp "$tmp"/out/*.toml "$config_dir"/
mv -f "$state_file" "$state_file.presync"

noctalia config validate
noctalia msg config-reload >/dev/null && echo "Reloaded noctalia."

echo
echo "Synced into $config_dir (previous GUI state kept at $state_file.presync):"
git -C "$repo_root" status --short .config/noctalia
