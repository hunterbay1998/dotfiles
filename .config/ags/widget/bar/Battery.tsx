//ags team made this for me to import
import AstalBattery from "gi://AstalBattery"
//will watch and update the label everytime the % changes 
import { createBinding, createState } from "ags"
// means the variable wont change 
import { Gtk } from "ags/gtk4"

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
  const [hovered, setHovered] = createState(false)
  
  
  return (
    <box 
       cssClasses={binding.as(getBatteryClass)}
       $={(self) => {                              
         const motion = new Gtk.EventControllerMotion()                   
         motion.connect("enter", () => setHovered(true))                           
         motion.connect("leave", () =>setHovered(false))                            
         self.add_controller(motion)
       }}                                              
      >
      <label cssClasses={["batteryIcon"]} label={binding.as(getBatteryIcon)} />
        <revealer
           revealChild={hovered}
           transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
        >
      <label cssClasses={["batteryPercentage"]} label={binding.as(formatPercent)} />
        </revealer>
    </box>
  )
}
