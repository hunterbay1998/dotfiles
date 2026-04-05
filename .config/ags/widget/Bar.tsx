import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import Clock from "./bar/center/Clock"
import Workspaces from "./bar/center/Workspaces"
import Battery from "./bar/right/Battery"
import SideMenuButton from "./bar/right/SideMenu"

export function LeftBar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="left-bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox>
        <box $type="start" halign={Gtk.Align.START} hexpand={false} />

        <box $type="center" halign={Gtk.Align.CENTER} hexpand={false} cssClasses={["bar-pill"]}>
          <Clock />
          <Workspaces />
        </box>

        <box $type="end" halign={Gtk.Align.END} hexpand={false} cssClasses={["bar-pill"]} marginEnd={8}>
          <SideMenuButton />
          <Battery />
        </box>
      </centerbox>
    </window>
  )
}

export function RightBar(_gdkmonitor: Gdk.Monitor) {
  return <box />
}
