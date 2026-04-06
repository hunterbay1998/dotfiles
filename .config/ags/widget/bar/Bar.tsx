/* ==========================================
   BAR WINDOW
   Single exclusive window — assembles left,
   center and right content.
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import LeftContent from "./Left"
import CenterContent from "./Center"
import RightContent from "./Right"

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
