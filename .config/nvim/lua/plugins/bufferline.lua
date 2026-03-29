---------------------------------------------------------------------
-- Bufferline (top tabs) – ultra clean
---------------------------------------------------------------------

return {
  "akinsho/bufferline.nvim",
  version = "*",
  dependencies = "nvim-tree/nvim-web-devicons",
  event = "VeryLazy",
  opts = {
    options = {
      mode = "buffers",

      -- No numbers, no clutter
      numbers = "none",

      -- Subtle active indicator
      indicator = {
        style = "none",
      },

      -- Remove all close icons
      buffer_close_icon = "",
      close_icon = "",
      show_close_icon = false,
      show_buffer_close_icons = false,

      -- Minimal separators
      separator_style = "thin",

      -- Clean symbols
      modified_icon = "●",
      left_trunc_marker = "",
      right_trunc_marker = "",

      -- No diagnostics noise
      diagnostics = false,

      -- No tab indicators
      show_tab_indicators = false,

      -- Always visible (feels stable)
      always_show_bufferline = false,

      -- Prevents ugly offset blocks
      offsets = {
        {
          filetype = "neo-tree",
          text = "",
          padding = 1,
        },
      },
    },

    highlights = {
      -- Active buffer
      buffer_selected = {
        bold = false,
        italic = false,
      },

      -- Inactive buffers fade
      buffer_visible = {
        fg = { attribute = "fg", highlight = "Comment" },
      },

      buffer = {
        fg = { attribute = "fg", highlight = "Comment" },
      },

      -- Separator invisible
      separator = {
        fg = { attribute = "bg", highlight = "Normal" },
        bg = { attribute = "bg", highlight = "Normal" },
      },

      separator_selected = {
        fg = { attribute = "bg", highlight = "Normal" },
        bg = { attribute = "bg", highlight = "Normal" },
      },
    },
  },
}


