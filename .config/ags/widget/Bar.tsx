import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import Clock from "./bar/Clock"
import Battery from "./bar/Battery"
import PowerButton from "./bar/PowerButton"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start">
          <PowerButton />
        </box>

        <box $type="center">
          <Clock />
        </box>  
        
        <box $type="end">
          <Battery />
        </box>  
      </centerbox>
    </window>
  )
}
