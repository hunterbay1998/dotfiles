#!/usr/bin/env bash
set -euo pipefail

HOST="$(hostname)"
HYPR_DIR="$HOME/.config/hypr/config"
TARGET="$HYPR_DIR/02-monitors.conf"

case "$HOST" in
    archyos)
        ln -sfn "$HYPR_DIR/02-desktop-monitors.conf" "$TARGET"
        ;;
    legion5)
        ln -sfn "$HYPR_DIR/02-laptop-monitors.conf" "$TARGET"
        ;;
    *)
        echo "Unknown host: $HOST" >&2
        exit 1
        ;;
esac
