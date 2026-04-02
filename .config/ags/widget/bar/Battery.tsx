import AstalBattery from "gi://AstalBattery"
import { createBinding, createComputed } from "ags"

  export default function Battery() {
    const battery = AstalBattery.get_default()
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

    return (
      <label label={createBinding(battery, "percentage").as((p) => `${Math.round(p * 100)}%`)} />
    )
  }
