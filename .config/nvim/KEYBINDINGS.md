# Neovim Keybindings

> Leader key is `,` (comma)
> View this any time with `nvimkeys`

## LSP
K — Hover docs / type info
gd — Go to definition
gr — Find references
,ca — Code action
,rn — Rename symbol

## Diagnostics
gl — Show diagnostic under cursor
[d — Previous diagnostic
]d — Next diagnostic

## Telescope (fuzzy finder)
,ff — Find files
,fg — Live grep
,fb — Buffers
,fh — Help tags

## Buffers (tabs)
Tab — Next buffer
Shift+Tab — Previous buffer
,bd — Close buffer

## Splits / Windows
Alt+h — Go to left split
Alt+j — Go to lower split
Alt+k — Go to upper split
Alt+l — Go to right split
,sv — Split vertical
,sh — Split horizontal
,sc — Close split
Alt+Up — Make split taller
Alt+Down — Make split shorter
Alt+Left — Make split narrower
Alt+Right — Make split wider
(navigation + resize also work from inside terminals)

## UI / Panels
,e — Toggle Neo-tree (file explorer)
,t — Toggle bottom terminal
,a — Toggle AI terminal (Claude)
,cp — Colour picker (ccc)

## Inside Neo-tree
l — Open file / expand folder
h — Collapse folder / go up a level
L — Expand all folders
H — Collapse all folders
Tab — Toggle folder open/closed
Enter or o — Open
Ctrl+v — Open in vertical split
Ctrl+x — Open in horizontal split
Ctrl+t — Open in new tab
a — New file
A — New folder
d — Delete
r — Rename
y — Copy to clipboard
x — Cut to clipboard
p — Paste from clipboard
c — Copy (to a chosen path)
m — Move (to a chosen path)
R — Refresh tree
q — Close tree
? — Show help
< / > — Previous / next source

## Completion menu (insert mode)
Ctrl+Space — Force the menu open
Enter — Accept selected item
Tab — Next item (or jump forward in a snippet)
Shift+Tab — Previous item (or jump back in a snippet)
Alt+j — Next item
Alt+k — Previous item

## Copilot (insert mode, Python files)
Alt+l — Accept suggestion
Alt+w — Accept next word only
Alt+] / Alt+[ — Next / previous suggestion
Ctrl+] — Dismiss suggestion
,ct — Toggle suggestions on/off (current file)
:Copilot auth — Sign in to GitHub (first time only)
:Copilot status — Check it's connected

## Commands (no keybind)
:LazyGit — Full git UI inside Neovim
:Lazy — Plugin manager
:Mason — Install/manage LSP servers & tools
