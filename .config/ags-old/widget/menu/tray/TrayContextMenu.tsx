import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import { createState, For } from "ags"
import AstalTray from "gi://AstalTray?version=0.1"

// Tray.tsx calls this when a tray icon is right-clicked
// Using an object so the reference stays stable across module imports
export const trayMenu = {
  show: (_item: AstalTray.TrayItem) => {},
}

export default function TrayContextMenu(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM, RIGHT } = Astal.WindowAnchor
  const [visible, setVisible] = createState(false)
  const [menuItems, setMenuItems] = createState<{ label: string; action: string }[]>([])
  let currentItem: AstalTray.TrayItem | null = null

  // Set the exported function so Tray.tsx can call it
  function parseModel(model: any): { label: string; action: string }[] {
    const parsed: { label: string; action: string }[] = []
    const count = model.get_n_items()
    for (let i = 0; i < count; i++) {
      try {
        // Recurse into section links
        const section = model.get_item_link(i, "section")
        if (section) {
          parsed.push(...parseModel(section))
          continue
        }

        // Recurse into submenu links
        const submenu = model.get_item_link(i, "submenu")
        if (submenu) {
          parsed.push(...parseModel(submenu))
          continue
        }

        const label = model.get_item_attribute_value(i, "label", null)?.deepUnpack() as string | undefined
        const action = model.get_item_attribute_value(i, "action", null)?.deepUnpack() as string | undefined
        if (label) parsed.push({ label, action: action ?? "" })
      } catch (_) {}
    }
    return parsed
  }

  trayMenu.show = (item: AstalTray.TrayItem) => {
    try {
      const model = item.menu_model
      if (!model) return
      currentItem = item

      // Notify the app its menu is about to be shown
      item.about_to_show()

      // If items already loaded show immediately
      if (model.get_n_items() > 0) {
        setMenuItems(parseModel(model))
        setVisible(true)
        return
      }

      // Otherwise wait for DBus to load the items
      const id = model.connect("items-changed", () => {
        model.disconnect(id)
        setMenuItems(parseModel(model))
        setVisible(true)
      })
    } catch (e) {
      console.error("tray menu error:", e)
    }
  }

  return (
    <window
      name="tray-context-menu"
      gdkmonitor={gdkmonitor}
      anchor={BOTTOM | RIGHT}
      marginBottom={40}
      marginRight={8}
      application={app}
      visible={visible}
    >
      <box cssClasses={["tray-context-menu"]} orientation={Gtk.Orientation.VERTICAL} spacing={2}>
        <For each={menuItems}>
          {({ label, action }) => (
            <button
              cssClasses={["tray-menu-item"]}
              halign={Gtk.Align.FILL}
              onClicked={() => {
                if (currentItem && action) {
                  const actionName = action.replace(/^[^.]+\./, "")
                  currentItem.action_group?.activate_action(actionName, null)
                }
                setVisible(false)
              }}
            >
              <label label={label} halign={Gtk.Align.START} />
            </button>
          )}
        </For>
      </box>
    </window>
  )
}
