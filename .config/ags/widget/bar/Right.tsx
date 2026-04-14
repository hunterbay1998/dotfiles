/* ==========================================
   RIGHT BAR CONTENT
   ========================================== */

import { Gtk } from "ags/gtk4"
import Battery from "./right/Battery"
import QuickStatus from "./right/QuickStatus"
import NotifButton from "./right/NotifMenu"

export default function RightContent() {
  return (
    <box cssClasses={["bar-pill"]} halign={Gtk.Align.END} marginEnd={8}>
      <NotifButton />
      <QuickStatus />
      <Battery />
    </box>
  )
}
