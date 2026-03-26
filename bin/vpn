#!/usr/bin/env bash

pick_country() {
  country=$(printf "%s\n" \
    "United Kingdom" \
    "Germany" \
    "United States" \
    "Canada" \
    "Netherlands" \
    "France" \
    "Sweden" \
    "Japan" \
    "Australia" \
    | fzf --prompt="Country > ")

  [[ -z "$country" ]] && exit 0

  case "$country" in
    "United Kingdom") nordvpn connect uk ;;
    "Germany")        nordvpn connect germany ;;
    "United States")  nordvpn connect united_states ;;
    "Canada")         nordvpn connect canada ;;
    "Netherlands")    nordvpn connect netherlands ;;
    "France")         nordvpn connect france ;;
    "Sweden")         nordvpn connect sweden ;;
    "Japan")          nordvpn connect japan ;;
    "Australia")      nordvpn connect australia ;;
  esac
}

choice=$(printf "%s\n" \
  "Connect (Auto)" \
  "Connect to Country" \
  "Disconnect" \
  "Status" \
  "Settings" \
  | fzf --prompt="NordVPN > ")

case "$choice" in
  "Connect (Auto)")       nordvpn connect ;;
  "Connect to Country")  pick_country ;;
  "Disconnect")          nordvpn disconnect ;;
  "Status")              nordvpn status | less ;;
  "Settings")            nordvpn settings | less ;;
  *) exit 0 ;;
esac

