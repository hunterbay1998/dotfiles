/* ==========================================
   BATTERY WIDGETS
   Includes: Battery, BatteryMenu
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "ags"
import AstalBattery from "gi://AstalBattery"

const batteryIcon: Record<number, string> = {
  100: '󰁹',
  90:  '󰂂',
  80:  '󰂁',
  70:  '󰂀',
  60:  '󰁿',
  50:  '󰁾',
  40:  '󰁽',
  30:  '󰁼',
  20:  '󰁻',
  10:  '󰁺',
  0:   '󰂎',
}

function getBatteryIcon(p: number) {
  const percent = Math.round(p * 100)
  const level = [100,90,80,70,60,50,40,30,20,10,0].find(t => percent >= t) ?? 0
  return batteryIcon[level]
}

function getBatteryClass(p: number) {
  const percent = Math.round(p * 100)
  if (percent >= 80) return ["battery", "full"]
  if (percent >= 60) return ["battery", "high"]
  if (percent >= 40) return ["battery", "medium"]
  if (percent >= 20) return ["battery", "low"]
  return ["battery", "critical"]
}

export function BatteryMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const battery = AstalBattery.get_default()
  const binding = createBinding(battery, "percentage")
  const formatPercent = (p: number) => `${Math.round(p * 100)}%`

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

export default function Battery() {
  const battery = AstalBattery.get_default()
  const binding = createBinding(battery, "percentage")

  return (
    <button cssClasses={binding.as(getBatteryClass)} onClicked={() => app.toggle_window("battery-menu")}>
      <label label={binding.as(getBatteryIcon)} />
    </button>
  )
}
