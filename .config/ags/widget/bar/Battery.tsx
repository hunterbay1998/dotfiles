//ags team made this for me to import
import AstalBattery from "gi://AstalBattery"
//will watch and update the label everytime the % changes 
import { createBinding } from "ags"
// means the variable wont change 
import App from "ags/gtk4/app"

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


export default function Battery() {
  const battery = AstalBattery.get_default()
  const binding = createBinding(battery, "percentage")
  const formatPercent = (p: number) => `${Math.round(p * 100)}%`
  return (
    <button onClicked={() => App.toggle_window("battery-menu")}>
      <box cssClasses={binding.as(getBatteryClass)}> 
        <label cssClasses={["batteryIcon"]} label={binding.as(getBatteryIcon)} />
      </box>
    </button>
  )
}
