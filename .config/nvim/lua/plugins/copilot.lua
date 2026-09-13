---------------------------------------------------------------------
-- Copilot: inline "ghost text" suggestions (free tier)
---------------------------------------------------------------------
-- First run: :Copilot auth  (opens GitHub sign-in in the browser)
-- The free plan has a monthly completion cap, so it's limited to
-- Python below. Add more filetypes there to widen it.

return {
  "zbirenbaum/copilot.lua",
  cmd = "Copilot",        -- Load for :Copilot auth / status
  event = "InsertEnter",  -- Otherwise load the first time you type
  opts = {
    panel = { enabled = false }, -- Only want inline suggestions
    suggestion = {
      enabled = true,
      auto_trigger = true, -- Suggest as you type (like Zed)
      keymap = {
        accept = "<M-l>",      -- Alt+l: accept the whole suggestion
        accept_word = "<M-w>", -- Alt+w: accept just the next word
        next = "<M-]>",        -- Alt+]: cycle to next suggestion
        prev = "<M-[>",        -- Alt+[: cycle to previous
        dismiss = "<C-]>",     -- Ctrl+]: hide it
      },
    },
    filetypes = {
      python = true,
      ["*"] = false, -- Everything else off (saves the free quota)
    },
  },
  keys = {
    {
      "<leader>ct",
      function()
        require("copilot.suggestion").toggle_auto_trigger()
      end,
      desc = "Toggle Copilot suggestions",
    },
  },
}
