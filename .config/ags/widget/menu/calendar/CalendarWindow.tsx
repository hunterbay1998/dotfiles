import app from "ags/gtk4/app"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import GLib from "gi://GLib"

export default function CalendarWindow(gdkmonitor: Gdk.Monitor) {
  const { TOP } = Astal.WindowAnchor
  let closeTimer = 0

  return (
    <window
      name="calendar"
      gdkmonitor={gdkmonitor}
      anchor={TOP}
      marginTop={5}
      application={app}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyIsActive={(self) => {
        if (!self.isActive) {
          closeTimer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
            if (!self.isActive) self.visible = false
            closeTimer = 0
            return GLib.SOURCE_REMOVE
          })
        } else if (closeTimer) {
          GLib.source_remove(closeTimer)
          closeTimer = 0
        }
      }}
    >
      <box cssClasses={["calendar-box"]}>
        <Gtk.Calendar cssClasses={["calendar"]} />
      </box>
    </window>
  )
}
