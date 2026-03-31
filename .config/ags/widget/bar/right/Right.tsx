import { Gtk } from "ags/gtk4"
import SysInfo from "../modules/sysinfo/SysInfo"
import BatteryWidget from "../modules/battery/Battery"
import QuickSettingsButton from "../../menu/quick-settings/QuickSettingsButton"
import NotificationButton from "../../menu/notifications/NotificationButton"

export default function Right() {
  return (
    <box $type="end" halign={Gtk.Align.END} spacing={8}>
      <SysInfo />
      <QuickSettingsButton />
      <BatteryWidget />
      <NotificationButton />
    </box>
  )
}
