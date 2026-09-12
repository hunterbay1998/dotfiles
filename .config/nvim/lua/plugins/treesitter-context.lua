---------------------------------------------------------------------
-- Treesitter context: sticky function/class header at top of window
-- Huge quality-of-life improvement when reading long TSX, Lua, or Nix files.
---------------------------------------------------------------------

return {
  "nvim-treesitter/nvim-treesitter-context",
  event = "VeryLazy",
  opts = {
    -- How many lines the context window can show
    max_lines = 4,
    -- Minimum editor height before showing context
    min_window_height = 20,
    -- Only show context for the current scope if the line count is this or higher
    multiline_threshold = 1,
    -- Which modes to show in
    mode = "cursor",
    -- Separator between context and content
    separator = nil,
    -- Respect the zindex of other floating windows
    zindex = 20,
  },
}
