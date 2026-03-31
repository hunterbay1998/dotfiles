import { Gtk } from "ags/gtk4"
import Workspaces from "../modules/workspaces/Workspaces"
import AppLauncherButton from "../../menu/app-launcher/AppLauncherButton"
import StatsButton from "../../menu/StatsButton"

export default function Left() {
  return (
    <box $type="start" halign={Gtk.Align.START} spacing={8}>
      <AppLauncherButton />
      <Workspaces />
      <StatsButton />
    </box>
  )
}
