---------------------------------------------------------------------
-- Git integration: gitsigns (signs + blame + hunks)
---------------------------------------------------------------------

return {
  "lewis6991/gitsigns.nvim",
  event = { "BufReadPre", "BufNewFile" },
  opts = {
    signs = {
      add          = { text = "│" },
      change       = { text = "│" },
      delete       = { text = "_" },
      topdelete    = { text = "‾" },
      changedelete = { text = "~" },
    },

    current_line_blame = true,
    current_line_blame_opts = {
      delay = 600,
      ignore_whitespace = true,
    },
    -- No keymaps: git is managed outside Neovim.
    -- Gutter signs + inline blame stay as passive visual indicators.
  },
}

