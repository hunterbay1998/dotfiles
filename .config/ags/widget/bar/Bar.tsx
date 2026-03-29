import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import Workspaces from "./workspaces/Workspaces"
import Clock from "./clock/Clock"
import PowerButton from "./power-button/PowerButton"
import BatteryWidget from "./battery/Battery"
import Volume from "./volume/Volume"
import Wifi from "./wifi/Wifi"
import Tray from "./tray/Tray"


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
