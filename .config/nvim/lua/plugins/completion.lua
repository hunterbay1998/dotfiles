return {
  "hrsh7th/nvim-cmp",
  dependencies = {
    "hrsh7th/cmp-nvim-lsp", -- Connects to your LSP
    "L3MON4D3/LuaSnip",     -- Snippet engine
    "saadparwaiz1/cmp_luasnip", -- Connects snippets to completion
    "hrsh7th/cmp-buffer",   -- Suggests words from the current file
    "hrsh7th/cmp-path",     -- Suggests file paths
  },
  config = function()
    local cmp = require("cmp")
    local luasnip = require("luasnip")

    cmp.setup({
      snippet = {
        expand = function(args)
          luasnip.lsp_expand(args.body)
        end,
      },
      mapping = cmp.mapping.preset.insert({
        ["<C-Space>"] = cmp.mapping.complete(), -- Force menu to open
        ["<CR>"] = cmp.mapping.confirm({ select = true }), -- Enter to pick
        ["<M-j>"] = cmp.mapping.select_next_item(),
        ["<M-k>"] = cmp.mapping.select_prev_item(),
        ["<Tab>"] = cmp.mapping(function(fallback)
          if cmp.visible() then
            cmp.select_next_item()
          elseif luasnip.expand_or_jumpable() then
            luasnip.expand_or_jump()
          else
            fallback()
          end
        end, { "i", "s" }),
        ["<S-Tab>"] = cmp.mapping(function(fallback)
          if cmp.visible() then
            cmp.select_prev_item()
          elseif luasnip.jumpable(-1) then
            luasnip.jump(-1)
          else
            fallback()
          end
        end, { "i", "s" }),
      }),
      sources = cmp.config.sources({
        { name = "nvim_lsp" }, -- Suggestions from LSP (Brain)
        { name = "luasnip" },  -- Snippets
      }, {
        { name = "buffer" },   -- Text in current file
        { name = "path" },     -- File paths
      }),
    })
  end,
}
