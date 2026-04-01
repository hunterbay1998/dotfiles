import { Gtk } from "ags/gtk4"
import AppLauncherButton from "../../menu/app-launcher/AppLauncherButton"
import StatsButton from "../../menu/StatsButton"
import Clock from "../modules/clock/Clock"

export default function Left() {
  return (
    <box $type="start" halign={Gtk.Align.START} spacing={8}>
      <AppLauncherButton />
      <Clock />
      <StatsButton />
    </box>
  )
}
