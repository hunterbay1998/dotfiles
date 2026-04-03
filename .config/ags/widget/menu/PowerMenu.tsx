import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"


export default function PowerMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT } = Astal.WindowAnchor

  return (
    <window
      name="power-menu"
      anchor={TOP | LEFT}
      application={app}
      visible={false}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <button cssClasses={["power-button-reboot"]} onClicked={() => execAsync("systemctl reboot")}>
          <label label="Restart" />
        </button>
        <button cssClasses={["power-button-shutdown"]} onClicked={() => execAsync("systemctl poweroff")}>
          <label label="Shutdown" />
        </button>
        <button cssClasses={["power-button-suspend"]} onClicked={() => execAsync("systemctl suspend")}>
          <label label="Suspend" />
        </button>
      </box>
    </window>
  )
}
