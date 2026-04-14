import { createBinding, For } from "ags"
import { Gtk } from "ags/gtk4"
import Hyprland from "gi://AstalHyprland"
import Gio from "gi://Gio"
import GioUnix from "gi://GioUnix"

const hyprland = Hyprland.get_default()

function getIconName(appClass: string): string {
  if (!appClass) return "application-x-executable"
  const lower = appClass.toLowerCase()

  // Best match: startup WM class
  try {
    const all = Gio.AppInfo.get_all()
    for (const app of all) {
      const info = app as GioUnix.DesktopAppInfo
      if (info.get_startup_wm_class?.()?.toLowerCase() === lower) {
        return info.get_icon()?.to_string() ?? lower
      }
    }
  } catch {}

  // Try <class>.desktop directly
  try {
    const info = GioUnix.DesktopAppInfo.new(`${lower}.desktop`)
    if (info) return info.get_icon()?.to_string() ?? lower
  } catch {}

  try {
    const info = GioUnix.DesktopAppInfo.new(`${appClass}.desktop`)
    if (info) return info.get_icon()?.to_string() ?? lower
  } catch {}

  return lower
}

export default function Workspaces() {
  const focused = createBinding(hyprland, "focusedWorkspace")
  const clients = createBinding(hyprland, "clients")

  return (
    <box cssClasses={["workspaces"]}>
      {[1, 2, 3, 4, 5].map(id => (
        <button
          cssClasses={focused.as(fw => fw?.id === id ? ["workspace", "focused"] : ["workspace"])}
onClicked={() => hyprland.dispatch("workspace", String(id))}
        >
          <box cssClasses={["workspace-icons"]} spacing={3} halign={Gtk.Align.CENTER}>

            {/* Dot shown when workspace is empty */}
            <label
              cssClasses={["workspace-dot"]}
              label="●"
              visible={clients.as(list => list.filter(c => c.workspace?.id === id).length === 0)}
            />

            {/* App icons — deduplicated by class, max 4 */}
            <For each={clients.as(list =>
              [...new Map(
                list
                  .filter(c => c.workspace?.id === id)
                  .map(c => [c.initialClass.toLowerCase(), c])
              ).values()].slice(0, 4)
            )}>
              {(client) => (
                <image
                  cssClasses={["workspace-app-icon"]}
                  iconName={getIconName(client.initialClass)}
                  pixelSize={20}
                />
              )}
            </For>

          </box>
        </button>
      ))}
    </box>
  )
}
