---------------------------------------------------------------------
-- lazy.nvim bootstrap + plugin setup
---------------------------------------------------------------------

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not (vim.uv or vim.loop).fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end

vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  require("plugins.treesitter"),
  require("plugins.lsp"),
  require("plugins.theme"),
  require("plugins.statusline"),
  require("plugins.indent"),
  require("plugins.notify"),
  require("plugins.noice"),
  require("plugins.telescope"),
  require("plugins.completion"),
  require("plugins.autopairs"),
  require("plugins.neo-tree"),
  require("plugins.toggleterm"),
  require("plugins.gitsigns"),
  require("plugins.lazygit"),
  require("plugins.bufferline"),
  require("plugins.ccc"),
  require("plugins.colorizer"),
  require("plugins.mason"),
  require("plugins.claude-code"),
  require("plugins.autotag"),







})
