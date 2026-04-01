import app from "ags/gtk4/app"
import { createBinding, createComputed } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { execAsync } from "ags/process"

const network = AstalNetwork.get_default()

export default function WifiWindow(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const enabled = createBinding(network.wifi, "enabled")
  const ssid = createBinding(network.wifi, "ssid")
  const strength = createBinding(network.wifi, "strength")

  const statusLabel = createComputed(() => {
    if (!enabled()) return "Wi-Fi Off"
    const name = ssid()
    return name ? `Connected to ${name}` : "Not connected"
  })

  const strengthLabel = createComputed(() => {
    if (!enabled()) return ""
    return `Signal: ${strength()}%`
  })

  const toggleLabel = createComputed(() => enabled() ? "Disable Wi-Fi" : "Enable Wi-Fi")

  return (
    <window
      name="wifi-menu"
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      marginTop={5}
      marginRight={8}
      application={app}
      visible={false}
    >
      <box cssClasses={["wifi-menu-box"]} orientation={Gtk.Orientation.VERTICAL} spacing={8}>
        <label label={statusLabel} cssClasses={["wifi-status"]} halign={Gtk.Align.START} />
        <label label={strengthLabel} cssClasses={["wifi-strength"]} halign={Gtk.Align.START} />
        <button
          cssClasses={["wifi-toggle-btn"]}
          onClicked={() => {
            execAsync(["nmcli", "radio", "wifi", enabled() ? "off" : "on"])
          }}
        >
          <label label={toggleLabel} />
        </button>
      </box>
    </window>
  )
}
