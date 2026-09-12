----------------------
---- WORKSPACES ----
----------------------

-- Noctalia's workspaces widget only draws what the compositor reports, so
-- pinning 1-5 here is what keeps a stable row of five in the bar.
for i = 1, 5 do
    hl.workspace_rule({
        workspace  = tostring(i),
        persistent = true,
    })
end
