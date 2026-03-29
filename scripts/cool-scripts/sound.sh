#!/usr/bin/env bash

pick_sink() {
  sink=$(pactl list short sinks | awk '{print $2}' | fzf --prompt="Output > ")
  [[ -z "$sink" ]] && exit 0
  pactl set-default-sink "$sink"
}

choice=$(printf "%s\n" \
  "Volume Up" \
  "Volume Down" \
  "Mute / Unmute" \
  "Change Output Device" \
  | fzf --prompt="Sound > ")

case "$choice" in
  "Volume Up")            pactl set-sink-volume @DEFAULT_SINK@ +5% ;;
  "Volume Down")          pactl set-sink-volume @DEFAULT_SINK@ -5% ;;
  "Mute / Unmute")        pactl set-sink-mute @DEFAULT_SINK@ toggle ;;
  "Change Output Device") pick_sink ;;
  *) exit 0 ;;
esac

