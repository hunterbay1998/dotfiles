---------------------------------------------------------------------
-- Theme: Tokyo Night (polished)
---------------------------------------------------------------------

return {
  "folke/tokyonight.nvim",
  priority = 1000,
  lazy = false,
  opts = {
    style = "night",
    transparent = false, -- set true if you want transparent background
    terminal_colors = true,
    dim_inactive = true,
    styles = {
      comments = { italic = true },
      keywords = { italic = false },
      functions = {},
      variables = {},
      sidebars = "dark",
      floats = "dark",
    },
  },
  config = function(_, opts)
    vim.opt.termguicolors = true
    require("tokyonight").setup(opts)
    vim.cmd.colorscheme("tokyonight")
  end,
}


