import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"
import GLib from "gi://GLib"
import { SysStats } from "./SysStats"

export default function StatsWindow(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT } = Astal.WindowAnchor
  let closeTimer = 0

  return (
    <window
      name="stats-menu"
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT}
      marginTop={5}
      marginLeft={8}
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
      <box cssClasses={["stats-menu-box"]}>
        <SysStats />
      </box>
    </window>
  )
}
