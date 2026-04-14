/* ==========================================
   BAR WINDOW
   Single exclusive window — assembles left,
   center and right content.
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import LeftContent from "./bar/Left"
import CenterContent from "./bar/Center"
import RightContent from "./bar/Right"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      marginTop={6}
      marginLeft={8}
      marginRight={8}
      application={app}
    >
      <centerbox>
        <box $type="start" halign={Gtk.Align.START} hexpand={false}>
          <LeftContent />
        </box>
        <box $type="center" halign={Gtk.Align.CENTER} hexpand={false}>
          <CenterContent />
        </box>
        <box $type="end" halign={Gtk.Align.END} hexpand={false}>
          <RightContent />
        </box>
      </centerbox>
    </window>
  )
}
