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

    return `${icon}`
  })

  const cssClass = createComputed(() => {
    const p = Math.round(percent() * 100)
    if (p <= 20) return ["battery", "battery-critical"]
    if (p <= 40) return ["battery", "battery-low"]
    if (p <= 60) return ["battery", "battery-mid"]
    if (p <= 80) return ["battery", "battery-good"]
    return ["battery", "battery-full"]
  })

  const tooltip = createComputed(() => {
    const p = Math.round(percent() * 100)
    return charging() ? `${p}% (charging)` : `${p}%`
  })

  return (
    <label cssClasses={cssClass} label={label} tooltipText={tooltip} />
  )
}
