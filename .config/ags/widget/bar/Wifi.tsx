/* ==========================================
   WIFI WIDGETS
   Includes: WifiButton, WifiMenu
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "ags"
import { execAsync } from "ags/process"
import Network from "gi://AstalNetwork"

const network = Network.get_default()
const wifi = network.wifi

function getWifiIcon(strength: number): string {
  if (strength >= 80) return "󰤨"
  if (strength >= 60) return "󰤥"
  if (strength >= 40) return "󰤢"
  if (strength >= 20) return "󰤟"
  return "󰤯"
}

export function WifiMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const ssid = createBinding(wifi, "ssid")
  const strength = createBinding(wifi, "strength")
  const enabled = createBinding(wifi, "enabled")

  return (
    <window
      name="wifi-menu"
      anchor={TOP | RIGHT}
      marginTop={5}
      marginRight={8}
      application={app}
      visible={false}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["wifi-menu"]} widthRequest={220}>
        <label cssClasses={["wifi-ssid"]} label={ssid.as(s => s ?? "Not connected")} />
        <label cssClasses={["wifi-strength"]} label={strength.as(s => `Signal: ${s}%`)} />
        <box cssClasses={["wifi-buttons"]}>
          <button
            hexpand
            cssClasses={["wifi-toggle"]}
            onClicked={() => { wifi.enabled = !wifi.enabled }}
          >
            <label label={enabled.as(e => e ? "Disable" : "Enable")} />
          </button>
          <button
            hexpand
            cssClasses={["wifi-settings"]}
            onClicked={() => execAsync("nm-connection-editor")}
          >
            <label label="Settings" />
          </button>
        </box>
      </box>
    </window>
  )
}

export default function WifiButton() {
  const strength = createBinding(wifi, "strength")

  return (
    <button
      cssClasses={["wifi-button"]}
      onClicked={() => app.toggle_window("wifi-menu")}
    >
      <label label={strength.as(getWifiIcon)} />
    </button>
  )
}
