---------------------------------------------------------------------
-- LSP (Bash, JSON, CSS, TypeScript, Lua) - Neovim 0.11+ compatible
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

      -- Lua (very important for your Neovim config + AGS work)
      vim.lsp.config("lua_ls", {
        capabilities = capabilities,
        settings = {
          Lua = {
            runtime = {
              version = "LuaJIT", -- Neovim uses LuaJIT
            },
            diagnostics = {
              globals = { "vim", "hl" }, -- "vim" for Neovim, "hl" for Hyprland Lua scripts
            },
            workspace = {
              library = vim.api.nvim_get_runtime_file("", true),
              checkThirdParty = false, -- Don't prompt about third-party libraries
            },
            telemetry = {
              enable = false,
            },
          },
        },
      })

      vim.lsp.enable("bashls")
      vim.lsp.enable("jsonls")
      vim.lsp.enable("cssls")
      vim.lsp.enable("ts_ls")
      vim.lsp.enable("lua_ls")
      return
    end

    -- Older Neovim fallback
    local lspconfig = require("lspconfig")
    lspconfig.bashls.setup(opts)
    lspconfig.jsonls.setup(opts)
    lspconfig.cssls.setup(css_opts)
    lspconfig.ts_ls.setup(opts)
    lspconfig.lua_ls.setup({
      capabilities = capabilities,
      settings = {
        Lua = {
          runtime = { version = "LuaJIT" },
          diagnostics = { globals = { "vim", "hl" } }, -- "vim" for Neovim, "hl" for Hyprland Lua scripts
          workspace = {
            library = vim.api.nvim_get_runtime_file("", true),
            checkThirdParty = false,
          },
          telemetry = { enable = false },
        },
      },
    })
  end,
}

