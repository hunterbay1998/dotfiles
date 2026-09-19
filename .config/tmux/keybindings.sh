#!/usr/bin/env bash
# Prints the running tmux server's keybindings in readable form
# ("PREFIX + %" instead of "C-b %"). Shown by `prefix ?` (see tmux.conf).
#
# Formatting adapted from Omarchy's omarchy-menu-tmux-keybindings (MIT):
# https://github.com/basecamp/omarchy/blob/quattro/bin/omarchy-menu-tmux-keybindings
# Unlike the original, this lists the live bindings (stock ones included)
# instead of only the ones a config file adds.

{
  tmux show-options -g prefix
  tmux show-options -g prefix2
  tmux list-keys -N -T prefix -P "prefix "
  tmux list-keys -N -T root -P "root "
} | awk '
function key_part_text(part, is_modifier, part_count) {
  gsub(/^\\/, "", part)

  if (is_modifier && part == "C") return "CTRL"
  if (is_modifier && part == "M") return "ALT"
  if (is_modifier && part == "S") return "SHIFT"
  if (part == "Space") return "SPACE"
  if (part == "BSpace") return "BACKSPACE"
  if (part == "BTab") return "SHIFT + TAB"
  if (part == "PPage") return "PAGE UP"
  if (part == "NPage") return "PAGE DOWN"
  if (part == "DC") return "DELETE"
  if (part == "IC") return "INSERT"
  # Letters keep their case: tmux treats "c" and "C" (shift+c) as different keys
  if (!is_modifier && part ~ /^[a-zA-Z]$/) return part

  return toupper(part)
}

function key_text(key, parts, count, i, part, text) {
  gsub(/\\/, "", key)
  # A lone "-" is the key itself, not a separator
  if (key == "-") return "-"
  count = split(key, parts, "-")
  text = ""

  for (i = 1; i <= count; i++) {
    part = key_part_text(parts[i], i < count, count)
    text = text (text == "" ? "" : " + ") part
  }

  return text
}

$1 == "prefix" && NF == 2 { prefix = $2; next }
$1 == "prefix2" && NF == 2 { prefix2 = $2; next }

{
  if (!header_printed) {
    prefix_description = key_text(prefix)

    if (prefix2 != "" && prefix2 != "None") {
      prefix_description = prefix_description " / " key_text(prefix2)
    }

    printf "%-24s → %s\n", "PREFIX", prefix_description
    printf "%-24s → %s\n\n", "PREFIX + key", "press the prefix, let go, then the key"
    header_printed = 1
  }

  table = $1
  key = $2
  note = $0
  sub(/^[^ ]+ +[^ ]+ +/, "", note)

  if (table == "root") {
    combo = key_text(key)
  } else {
    combo = toupper(table) " + " key_text(key)
  }

  printf "%-24s → %s\n", combo, note
}'
