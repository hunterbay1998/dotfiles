/* ==========================================
   BLUETOOTH WIDGETS
   Includes: BluetoothToggle
   ========================================== */

import { createBinding } from "ags"
import AstalBluetooth from "gi://AstalBluetooth"
import Gtk from "gi://Gtk"

const bluetooth = AstalBluetooth.get_default()

export function BluetoothToggle() {
  const powered = createBinding(bluetooth.adapter, "powered")
  const connected = createBinding(bluetooth, "isConnected")

  return (
    <button
      cssClasses={powered.as(p => p ? ["qs-toggle", "active"] : ["qs-toggle"])}
      onClicked={() => { bluetooth.adapter.powered = !bluetooth.adapter.powered }}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <box>
          <label cssClasses={["qs-toggle-icon"]} label="󰂯" />
          <label cssClasses={["qs-toggle-name"]} label="Bluetooth" hexpand xalign={0} />
        </box>
        <label
          cssClasses={["qs-toggle-status"]}
          label={connected.as(c => c ? "Connected" : powered.as(p => p ? "On" : "Off")())}
          xalign={0}
        />
      </box>
    </button>
  )
}
