//ags team made this for me to import
import AstalBattery from "gi://AstalBattery"
//will watch and update the label everytime the % changes 
import { createBinding } from "ags"
// means the variable wont change 
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


export default function Battery() {
  const battery = AstalBattery.get_default()
  const binding = createBinding(battery, "percentage")
  const formatPercent = (p: number) => `${Math.round(p * 100)}%`
  return (
    <box cssName="battery">
      <label cssName="nerd-Font" label={binding.as(getBatteryIcon)} />
      <label label={binding.as(formatPercent)} />
    </box>
  )
}
