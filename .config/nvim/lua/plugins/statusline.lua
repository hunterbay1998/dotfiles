---------------------------------------------------------------------
-- Statusline: lualine (clean + minimal)
---------------------------------------------------------------------

return {
  "nvim-lualine/lualine.nvim",
  dependencies = { "nvim-tree/nvim-web-devicons" },
  config = function()
    require("lualine").setup({
      options = {
        theme = "tokyonight",
        icons_enabled = true,
        globalstatus = true,
        section_separators = "",
        component_separators = "│",
        disabled_filetypes = {
          statusline = { "neo-tree", "NvimTree", "lazy" },
        },
      },

      sections = {
        lualine_a = {
          {
            "mode",
            fmt = function(str) return str:sub(1, 1) end,
          },
        },
        lualine_b = { "branch" },
        lualine_c = {
          {
            "filename",
            path = 1,
            symbols = {
              modified = " ●",
              readonly = " ",
              unnamed = "",
            },
          },
        },
        lualine_x = {
          { "diagnostics", sources = { "nvim_lsp" } },
          "filetype",
        },
        lualine_y = { "progress" },
        lualine_z = { "location" },
      },
    })
  end,
}

