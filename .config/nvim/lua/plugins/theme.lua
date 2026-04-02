---------------------------------------------------------------------
-- Theme: Catppuccin
---------------------------------------------------------------------

return {
  "catppuccin/nvim",
  name = "catppuccin",
  priority = 1000,
  lazy = false,
  opts = {
    flavour = "frappe",
    transparent_background = false,
    term_colors = true,
    dim_inactive = {
      enabled = false,
    },
    styles = {
      comments = { "italic" },
      keywords = {},
      functions = {},
      variables = {},
    },
  },
  config = function(_, opts)
    vim.opt.termguicolors = true
    require("catppuccin").setup(opts)
    vim.cmd.colorscheme("catppuccin")
  end,
}
