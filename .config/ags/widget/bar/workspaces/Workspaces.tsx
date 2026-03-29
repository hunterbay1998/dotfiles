import { createBinding } from "ags"
import Hyprland from "gi://AstalHyprland"

const hypr = Hyprland.get_default()

const ICONS: Record<number, string> = {
  1: "󰄛",
  7: "󰊯",
  8: "󰓓",
}

export default function Workspaces() {
  const focusedWs = createBinding(hypr, "focusedWorkspace")
  console.log("focused ws:", hypr.focusedWorkspace)

  return (
    <box spacing={4}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
        <button
          cssClasses={focusedWs((ws) =>
            ws?.id === id ? ["workspace", "active"] : ["workspace"]
          )}
          onClicked={() => hypr.dispatch("workspace", String(id))}
        >
          <label label={ICONS[id] ?? String(id)} />
        </button>
      ))}
    </box>
  )
}
