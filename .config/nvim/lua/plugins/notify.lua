---------------------------------------------------------------------
-- Notifications: nvim-notify
---------------------------------------------------------------------

return {
  "rcarriga/nvim-notify",
  config = function()
    local notify = require("notify")
    notify.setup({
      stages = "fade",
      timeout = 2000,
      render = "compact",
      background_colour = "#000000",
    })
    vim.notify = notify
  end,
}

