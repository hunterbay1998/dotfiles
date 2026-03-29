import { createBinding, createComputed } from "ags"
import Battery from "gi://AstalBattery"

const battery = Battery.get_default()

export default function BatteryWidget() {
  const percent = createBinding(battery, "percentage")
  const charging = createBinding(battery, "charging")

  const label = createComputed(() => {
    const p = Math.round(percent() * 100)
    const icon = charging() ? "󰂄" :
                 p >= 90 ? "󰁹" :
                 p >= 70 ? "󰂀" :
                 p >= 50 ? "󰁿" :
                 p >= 30 ? "󰁾" :
                 p >= 10 ? "󰁺" :
                 "󰂃"

    return `${icon} ${p}󰏰`
  })

  return (
    <label cssClasses={["battery"]} label={label} />
  )
}
