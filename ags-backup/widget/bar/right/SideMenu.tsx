/* ==========================================
   SIDE MENU
   Includes: SideMenuButton, SideMenu
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { autoHideOnLeave } from "../../util"
import { BatteryInfo } from "./Battery"
import { VolumeSection } from "./Volume"
import { WifiToggle } from "./Wifi"
import { BluetoothToggle } from "./Bluetooth"
import { BrightnessSection } from "./Brightness"

export function SideMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="side-menu"
      anchor={TOP | RIGHT}
      application={app}
      visible={false}
      $={(self) => autoHideOnLeave(self, 2000)}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["side-menu"]} widthRequest={280}>

        <box cssClasses={["qs-top-row"]}>
          <box hexpand>
            <BatteryInfo />
          </box>
          <box cssClasses={["qs-actions"]}>
            <button cssClasses={["qs-action-btn"]} onClicked={() => execAsync("loginctl lock-session")}>
              <label label="󰍁" />
            </button>
            <button cssClasses={["qs-action-btn"]} onClicked={() => execAsync("systemctl reboot")}>
              <label label="󰜉" />
            </button>
            <button cssClasses={["qs-action-btn", "shutdown"]} onClicked={() => execAsync("systemctl poweroff")}>
              <label label="⏻" />
            </button>
          </box>
        </box>

        <VolumeSection />
        <BrightnessSection />

        <box cssClasses={["qs-grid"]}>
          <WifiToggle />
          <BluetoothToggle />
        </box>

      </box>
    </window>
  )
}

export default function SideMenuButton() {
  return (
    <button cssClasses={["side-menu-button"]} onClicked={() => app.toggle_window("side-menu")}>
      <label label="menu" />
    </button>
  )
}
