---------------------------------------------------------------------
-- Treesitter (syntax highlighting + queries)
-- Uses the modern nvim-treesitter (main branch) architecture.
-- Highlighting is enabled via core vim.treesitter.start() (see autocmds.lua).
---------------------------------------------------------------------

return {
  "nvim-treesitter/nvim-treesitter",
  lazy = false, -- The plugin authors strongly recommend this
  build = ":TSUpdate",
  config = function()
    require("nvim-treesitter").setup({})

    -- Curated list for this user's daily work (TSX, Nix, Hyprland, web, etc.)
    -- Note: "jsonc" and "json5" are not separate parsers in the new nvim-treesitter.
    -- Use "json" (it handles jsonc files via filetype + queries).
    local languages = {
      "lua", "vimdoc",
      "bash", "fish",
      "json", "yaml", "toml",
      "nix", "hyprlang",
      "css", "scss", "html",
      "javascript", "typescript", "tsx",
      "markdown", "markdown_inline",
      "query", "diff", "git_config",
      "python",
    }

    -- Idempotent; will only fetch/build what's missing.
    -- We wait briefly so the parser is ready for FileType autocmds (including
    -- any buffers that were restored at startup). The pcall in autocmds.lua
    -- makes this non-fatal even if it races.
    local ok, installer = pcall(require("nvim-treesitter").install, languages)
    if ok and installer and installer.wait then
      pcall(function() installer:wait(15000) end)
    end
  end,
}
