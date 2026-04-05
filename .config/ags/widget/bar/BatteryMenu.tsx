import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "ags"
import AstalBattery from "gi://AstalBattery"

const battery = AstalBattery.get_default()
const binding = createBinding(battery, "percentage")
const formatPercent = (p: number) => `${Math.round(p * 100)}%`

export default function BatteryMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <window
      anchor={TOP | RIGHT}
      name="battery-menu"
      marginTop={5}
      marginRight={8}
      application={app}
      visible={false}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <label label={binding.as(formatPercent)} />
      </box>

    </window>
  )
}
     
        


