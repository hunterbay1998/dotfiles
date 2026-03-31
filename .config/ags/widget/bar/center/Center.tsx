import { Gtk } from "ags/gtk4"
import Clock from "../modules/clock/Clock"
import ActiveWindow from "../modules/active-window/ActiveWindow"

export default function Center() {
  return (
    <box $type="center" halign={Gtk.Align.CENTER} spacing={12}>
      <ActiveWindow />
      <Clock />
    </box>
  )
}
