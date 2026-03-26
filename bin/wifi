#!/usr/bin/env bash

ssid=$(nmcli -t -f SSID device wifi list | sed '/^$/d' | fzf --prompt="Wi-Fi > ")

if [[ -z "$ssid" ]]; then
  echo "Cancelled."
  exit 0
fi

nmcli device wifi connect "$ssid"

