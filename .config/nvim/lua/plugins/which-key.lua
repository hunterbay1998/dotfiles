---------------------------------------------------------------------
-- which-key: press <leader> (,) and pause to see what's available
---------------------------------------------------------------------
-- Labels come from the `desc` on each keymap, so most entries here are
-- just group names for the prefixes. Add a `group` line below when you
-- introduce a new prefix; individual keys only need their own `desc`.

return {
  "folke/which-key.nvim",
  event = "VeryLazy",
  opts = {
    preset = "modern",

    -- Popup appears this long after <leader> is pressed. Lower feels
    -- snappier; raise it if it interrupts keys you type from memory.
    delay = 300,

    spec = {
      { "<leader>f", group = "find" },
      { "<leader>s", group = "split" },
      { "<leader>b", group = "buffer" },
      { "<leader>c", group = "code" },
      { "<leader>r", group = "refactor" },

      -- toggleterm sets this via open_mapping, so it has no desc of its own
      { "<leader>t", desc = "Toggle terminal" },

      -- Non-leader prefixes worth labelling
      { "g", group = "goto" },
      { "[", group = "prev" },
      { "]", group = "next" },
    },
  },
  keys = {
    {
      "<leader>?",
      function() require("which-key").show({ global = false }) end,
      desc = "Buffer keymaps",
    },
  },
}
