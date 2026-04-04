import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "ags"
import AstalBattery from "gi://AstalBattery"

const battery = AstalBattery.get_default()
const binding = createBinding(battery, "percentage")
const formantPercent = (p: number) => `${Math.round(p * 100)}`

export default function BatteryMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="battery-menu"
      anchor={TOP | RIGHT}
      application={app}
      visible={false}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <label label={binding.as(formantPercent)} />
      </box>

    </window>
  )
}
     
        


