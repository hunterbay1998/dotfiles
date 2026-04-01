#!/usr/bin/env bash

#!/bin/bash
HOST=$(cat /etc/hostname)
HYPR="$HOME/.config/hypr/config"

if [ "$HOST" = "archyos" ]; then
    ln -sf "$HYPR/02-monitors-archyos.conf" "$HYPR/02-monitors.conf"
elif [ "$HOST" = "legion5" ]; then
    ln -sf "$HYPR/02-monitors-legion5.conf" "$HYPR/02-monitors.conf"
fi
