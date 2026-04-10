import { createBinding } from "ags"
import Hyprland from "gi://AstalHyprland"

const hyprland = Hyprland.get_default()

export default function Workspaces() {
  const focused = createBinding(hyprland, "focusedWorkspace")

  return (
    <box cssClasses={["workspaces"]}>
      {[1, 2, 3, 4, 5].map((id) => (
        <button
          cssClasses={focused.as((fw) =>
            fw?.id === id ? ["workspace", "focused"] : ["workspace"],
          )}
          onClicked={() => hyprland.dispatch("workspace", String(id))}
        >
          <label label={String(id)} />
        </button>
      ))}
    </box>
  )
}
