---------------------------------------------------------------------
-- File explorer: neo-tree (clean + focused)
---------------------------------------------------------------------

return {
  "nvim-neo-tree/neo-tree.nvim",
  branch = "v3.x",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-tree/nvim-web-devicons",
    "MunifTanjim/nui.nvim",
  },
  config = function()
    require("neo-tree").setup({
      close_if_last_window = true,

      default_component_configs = {
        indent = {
          indent_size = 2,
          padding = 1,
          with_markers = true,
          indent_marker = "│",
          last_indent_marker = "└",
          expander_collapsed = "",
          expander_expanded = "",
        },
        icon = {
          folder_closed = "",
          folder_open = "",
          folder_empty = "",
        },
        modified = { symbol = "●" },
        git_status = {
          symbols = {
            added = "✚",
            modified = "",
            deleted = "✖",
            renamed = "󰁕",
            untracked = "",
            ignored = "",
            unstaged = "󰄱",
            staged = "",
            conflict = "",
          },
        },
      },

      filesystem = {
        follow_current_file = { enabled = true },
        group_empty_dirs = true,
        filtered_items = {
          hide_dotfiles = false,
          hide_gitignored = false,
        },
      },

      window = {
        position = "left",
        width = 32,
        mappings = {
          ["l"] = "open",
          ["h"] = "close_node",
          ["<space>"] = "toggle_node",
        },
      },

      popup_border_style = "rounded",
    })
  end,
}

