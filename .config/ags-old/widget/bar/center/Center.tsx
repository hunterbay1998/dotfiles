import { Gtk } from "ags/gtk4"
import Workspaces from "../modules/workspaces/Workspaces"

export default function Center() {
  return (
    <box $type="center" halign={Gtk.Align.CENTER} spacing={12}>
      <Workspaces />
    </box>
  )
}
