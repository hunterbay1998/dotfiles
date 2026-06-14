---------------------------------------------------------------------
-- LSP (Bash, JSON, CSS, TypeScript, Lua, Python) - Neovim 0.11+ API
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

    -- Python: pyright for types + ruff for linting + fast fixes/corrections
    vim.lsp.config("pyright", {
      capabilities = capabilities,
      settings = {
        python = {
          analysis = {
            typeCheckingMode = "basic", -- "basic" | "strict" | "off"
            autoSearchPaths = true,
            useLibraryCodeForTypes = true,
            diagnosticMode = "openFilesOnly",
          },
        },
      },
    })

    vim.lsp.config("ruff", {
      capabilities = capabilities,
    })

    vim.lsp.enable("bashls")
    vim.lsp.enable("jsonls")
    vim.lsp.enable("cssls")
    vim.lsp.enable("ts_ls")
    vim.lsp.enable("lua_ls")
    vim.lsp.enable("pyright")
    vim.lsp.enable("ruff")
  end,
}
