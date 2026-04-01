import { createBinding } from "ags"
import { Gtk } from "ags/gtk4"
import Hyprland from "gi://AstalHyprland"

const hypr = Hyprland.get_default()

export default function Workspaces() {
  const focusedWs = createBinding(hypr, "focusedWorkspace")

  return (
    <box spacing={4}>
      {[1, 2, 3, 4].map((id) => (
        <button
          cssClasses={focusedWs((ws) =>
            ws?.id === id ? ["workspace", "active"] : ["workspace"]
          )}
          onClicked={() => hypr.dispatch("workspace", String(id))}
          widthRequest={20}
          heightRequest={20}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
        >
        </button>
      ))}
    </box>
  )
}
