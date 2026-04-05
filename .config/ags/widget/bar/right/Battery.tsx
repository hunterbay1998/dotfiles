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
      $={(self) => {
        const motion = new Gtk.EventControllerMotion()
        let timeout: ReturnType<typeof setTimeout> | null = null

        motion.connect("leave", () => {
          timeout = setTimeout(() => self.set_visible(false), 1000)
        })
        motion.connect("enter", () => {
          if (timeout !== null) { clearTimeout(timeout); timeout = null }
        })
        self.add_controller(motion)
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <label label={binding.as(formatPercent)} />
      </box>
    </window>
  )
}

export function BatteryInfo() {
  const battery = AstalBattery.get_default()
  const binding = createBinding(battery, "percentage")
  const charging = createBinding(battery, "charging")

  return (
    <box cssClasses={["qs-battery-info"]}>
      <label cssClasses={["qs-battery-icon"]} label={binding.as(getBatteryIcon)} />
      <label
        cssClasses={["qs-battery-percent"]}
        label={binding.as(p => `${Math.round(p * 100)}%`)}
      />
      <label
        cssClasses={["qs-battery-status"]}
        label={charging.as(c => c ? "Charging" : "")}
      />
    </box>
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
