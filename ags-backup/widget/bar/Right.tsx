/* ==========================================
   RIGHT BAR CONTENT
   ========================================== */

import { Gtk } from "ags/gtk4"
import Battery from "./right/Battery"
import SideMenuButton from "./right/SideMenu"

export default function RightContent() {
  return (
    <box cssClasses={["bar-pill"]} halign={Gtk.Align.END} marginEnd={8}>
      <SideMenuButton />
      <Battery />
    </box>
  )
}
