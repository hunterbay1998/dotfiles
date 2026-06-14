---------------------------------------------------------------------
-- lazy.nvim bootstrap + plugin setup
-- Lives in core/ (not plugins/) so the auto-import below doesn't
-- try to load this file as a plugin spec
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
  -- Auto-import every file in lua/plugins/ as a plugin spec.
  -- New plugin = new file there; no list to maintain.
  spec = {
    { import = "plugins" },
  },
  rocks = { enabled = false },
})
