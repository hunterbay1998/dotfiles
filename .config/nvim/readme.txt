# Neovim (Arch) – minimal working setup

## Required packages
sudo pacman -S --needed \
  neovim \
  git \
  base-devel \
  tree-sitter \
  tree-sitter-cli \
  nodejs npm

## Neovim init.lua
- Uses lazy.nvim
- Uses nvim-treesitter (main branch rewrite)
- Highlighting enabled via `vim.treesitter.start()` in autocmds + modern install() API
- See lua/plugins/treesitter.lua and lua/core/autocmds.lua

## After install (inside nvim)
:Lazy sync
:TSUpdate
:checkhealth nvim-treesitter


| Thing             | Where it goes            |
| ----------------- | ------------------------ |
| Line numbers      | `core/options.lua`       |
| Clipboard default | `core/basics.lua`        |
| `d` doesn’t copy  | `keymaps/editing.lua`    |
| Treesitter        | `plugins/treesitter.lua` |
| Bash LSP          | `plugins/lsp.lua`        |
| `<leader>ff`      | `keymaps/telescope.lua`  |
| Theme             | `plugins/theme.lua`      |

