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
    -- Integrations are listed explicitly rather than auto-detected.
    -- On Neovim 0.12 auto_integrations probes vim.pack, which creates an
    -- empty ~/.local/share/nvim/site/pack/core/opt and makes both
    -- :checkhealth lazy and :checkhealth vim.pack warn. This list is exactly
    -- what auto-detection resolved to, so the colours are unchanged.
    -- Add a line here when you add a themed plugin.
    auto_integrations = false,
    integrations = {
      cmp = true,
      gitsigns = true,
      indent_blankline = true,
      mason = true,
      neotree = true,
      notify = true,
      telescope = true,
      treesitter_context = true,
    },
    -- Let the terminal/compositor background show through.
    -- Set back to false if floating windows become hard to read.
    transparent_background = true,
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
