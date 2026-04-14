/* ==========================================
   TRAY WIDGETS
   Includes: TrayButton, TrayMenu
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { For, createBinding } from "ags"
import Tray from "gi://AstalTray"

const tray = Tray.get_default()

function TrayItem({ item }: { item: Tray.TrayItem }) {
  return (
    <menubutton
      cssClasses={["tray-item"]}
      tooltipMarkup={createBinding(item, "tooltipMarkup")}
      $={(self) => {
        self.menuModel = item.menuModel
        self.insert_action_group("dbusmenu", item.actionGroup)
        item.connect("notify::action-group", () => {
          self.insert_action_group("dbusmenu", item.actionGroup)
        })
      }}
    >
      <image gicon={createBinding(item, "gicon")} />
    </menubutton>
  )
}

export function TrayMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="tray-menu"
      anchor={TOP | RIGHT}
      marginTop={5}
      marginRight={8}
      application={app}
      visible={false}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["tray-menu"]}>
        <For each={createBinding(tray, "items")}>
          {(item) => <TrayItem item={item} />}
        </For>
      </box>
    </window>
  )
}

export default function TrayButton() {
  return (
    <button
      cssClasses={["tray-button"]}
      onClicked={() => app.toggle_window("tray-menu")}
    >
      <label label="󰔴" />
    </button>
  )
}
