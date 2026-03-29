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

    on_attach = function(bufnr)
      local gs = package.loaded.gitsigns
      local map = function(mode, lhs, rhs)
        vim.keymap.set(mode, lhs, rhs, { buffer = bufnr })
      end

      -- Hunk navigation
      map("n", "]c", gs.next_hunk)
      map("n", "[c", gs.prev_hunk)

      -- Hunk actions
      map("n", "<leader>hs", gs.stage_hunk)
      map("n", "<leader>hr", gs.reset_hunk)
      map("n", "<leader>hp", gs.preview_hunk)
    end,
  },
}

