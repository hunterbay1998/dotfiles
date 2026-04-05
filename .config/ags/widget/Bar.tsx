import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import Clock from "./bar/Clock"
import Battery from "./bar/Battery"
import PowerButton from "./bar/Power"
import Workspaces from "./bar/Workspaces"
import WifiButton from "./bar/Wifi"
import VolumeButton from "./bar/Volume"
import TrayButton from "./bar/Tray"

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
        <box $type="start" halign={Gtk.Align.START} hexpand={false}>
          <PowerButton />
          <Workspaces />
        </box>

        <box $type="center" halign={Gtk.Align.CENTER} hexpand={false}>
          <Clock />
        </box>  
        
        <box $type="end" halign={Gtk.Align.END} hexpand={false}>
          <TrayButton />
          <WifiButton />
          <VolumeButton />
          <Battery />
        </box>  
      </centerbox>
    </window>
  )
}
