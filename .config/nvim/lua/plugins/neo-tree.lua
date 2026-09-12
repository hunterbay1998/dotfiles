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
          -- vim-style in/out navigation
          ["l"] = "open",
          ["h"] = function(state)
            local node = state.tree:get_node()
            if node.type == "directory" and node:is_expanded() then
              require("neo-tree.sources.filesystem.commands").close_node(state, node)
            elseif (node.level or 1) > 1 then
              require("neo-tree.sources.filesystem.commands").close_node(state, node)
            else
              require("neo-tree.sources.filesystem.commands").navigate_up(state)
            end
          end,
          ["H"] = "close_all_nodes",
          ["L"] = "expand_all_nodes",
          ["<Tab>"] = "toggle_node",
          ["<CR>"] = "open",
          ["o"] = "open",

          -- open in splits
          ["<C-v>"] = "open_vsplit",
          ["<C-x>"] = "open_split",
          ["<C-t>"] = "open_tabnew",

          -- file operations
          ["a"] = { "add", config = { show_path = "relative" } },
          ["A"] = "add_directory",
          ["d"] = "delete",
          ["r"] = "rename",
          ["y"] = "copy_to_clipboard",
          ["x"] = "cut_to_clipboard",
          ["p"] = "paste_from_clipboard",
          ["c"] = "copy",
          ["m"] = "move",

          -- misc
          ["R"] = "refresh",
          ["q"] = "close_window",
          ["?"] = "show_help",
          ["<"] = "prev_source",
          [">"] = "next_source",
        },
      },

      popup_border_style = "rounded",
    })
  end,
}

