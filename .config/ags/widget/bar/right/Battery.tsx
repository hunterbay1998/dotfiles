/* ==========================================
   BATTERY WIDGETS
   Includes: Battery (bar pill), BatteryInfo (side menu)
   ========================================== */

import { Gtk } from "ags/gtk4"
import { createBinding, createComputed } from "ags"
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

const BATTERY_LEVELS = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]

function getBatteryIcon(p: number) {
  const percent = Math.round(p * 100)
  const level = BATTERY_LEVELS.find(t => percent >= t) ?? 0
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
  const percent = createBinding(battery, "percentage")
  const charging = createBinding(battery, "charging")
  const cssClasses = createComputed([percent, charging], (p, c) =>
    c ? ["battery", "charging"] : getBatteryClass(p)
  )

  return (
    <box cssClasses={cssClasses} valign={Gtk.Align.CENTER}>
      <box valign={Gtk.Align.CENTER} marginStart={6} marginEnd={6} spacing={6}>

        {/* Levelbar with lightning bolt overlaid in center when charging */}
        <box
          $={(self) => {
            const overlay = new Gtk.Overlay()
            overlay.valign = Gtk.Align.CENTER

            const bar = new Gtk.LevelBar()
            bar.cssClasses = ["battery-level"]
            bar.widthRequest = 60
            bar.heightRequest = 10
            bar.valign = Gtk.Align.CENTER
            bar.minValue = 0
            bar.maxValue = 1
            bar.value = battery.percentage
            battery.connect("notify::percentage", () => { bar.value = battery.percentage })

            const icon = new Gtk.Label({ label: "󱐋" })
            icon.cssClasses = ["battery-charging-icon"]
            icon.halign = Gtk.Align.CENTER
            icon.valign = Gtk.Align.CENTER
            icon.visible = battery.charging
            battery.connect("notify::charging", () => { icon.visible = battery.charging })

            overlay.set_child(bar)
            overlay.add_overlay(icon)
            self.append(overlay)
          }}
        />

        <label
          cssClasses={["battery-percent"]}
          label={percent.as(p => `${Math.round(p * 100)}%`)}
        />

      </box>
    </box>
  )
}
