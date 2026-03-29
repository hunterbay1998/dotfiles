import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import Workspaces from "./Workspaces"
import Clock from "./Clock"
import PowerButton from "./powermenu/PowerButton"
import BatteryWidget from "./Battery"
import Volume from "./Volume"
import Wifi from "./Wifi"
import Tray from "./Tray"


export default function Bar(gdkmonitor: Gdk.Monitor) {
  
  const { TOP, LEFT, RIGHT} = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      margin={8}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start" halign={Gtk.Align.START} spacing={8}>
          <PowerButton />
          <Clock />
          <Tray />
        </box>

        <box $type="center" halign={Gtk.Align.CENTER}>
          <Workspaces />
        </box>

        <box $type="end" halign={Gtk.Align.END} spacing={8}>
          <Volume />
          <Wifi />
          <BatteryWidget />
       </box>
      </centerbox>
    </window>  

  )
}  
