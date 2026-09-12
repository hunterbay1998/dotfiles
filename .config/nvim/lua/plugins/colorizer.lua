return {
  "catgoose/nvim-colorizer.lua",
  event = "BufReadPre",
  config = function()
    require("colorizer").setup({
      filetypes = {
        css = {
          rgb_fn = true,
          hsl_fn = true,
          css = true,
          names = false,
        },
      },
    })
  end,
}

