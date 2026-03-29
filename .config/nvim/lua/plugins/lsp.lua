---------------------------------------------------------------------
-- LSP (Bash, JSON, CSS, TypeScript) - Neovim 0.11+ compatible
---------------------------------------------------------------------

return {
  "neovim/nvim-lspconfig",
  dependencies = { "hrsh7th/cmp-nvim-lsp" },
  config = function()
    local capabilities = require("cmp_nvim_lsp").default_capabilities()

    local opts = {
      capabilities = capabilities,
    }

    local css_opts = {
      capabilities = capabilities,
      settings = {
        css = { validate = false },
        scss = { validate = false },
        less = { validate = false },
      },
    }

    -- Neovim 0.11+ API
    if vim.lsp.config and vim.lsp.enable then
      vim.lsp.config("bashls", opts)
      vim.lsp.config("jsonls", opts)
      vim.lsp.config("cssls", css_opts)
      vim.lsp.config("ts_ls", opts)

      vim.lsp.enable("bashls")
      vim.lsp.enable("jsonls")
      vim.lsp.enable("cssls")
      vim.lsp.enable("ts_ls")
      return
    end

    -- Older Neovim fallback
    local lspconfig = require("lspconfig")
    lspconfig.bashls.setup(opts)
    lspconfig.jsonls.setup(opts)
    lspconfig.cssls.setup(css_opts)
    lspconfig.ts_ls.setup(opts)
  end,
}

