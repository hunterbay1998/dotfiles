#!/usr/bin/env bash

choice=$(printf "%s\n" \
  "Lock" \
  "Logout" \
  "Suspend" \
  "Reboot" \
  "Shutdown" \
  "Cancel" \
  | fzf --prompt="Session > ")

case "$choice" in
  "Lock")
    hyprlock
    ;;
  "Logout")
    hyprctl dispatch exit
    ;;
  "Suspend")
    systemctl suspend
    ;;
  "Reboot")
    systemctl reboot
    ;;
  "Shutdown")
    systemctl poweroff
    ;;
  *)
    exit 0
    ;;
esac

