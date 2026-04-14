/* ==========================================
   POWER MENU WIDGETS
   Includes: PowerButton, PowerMenu
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

export function PowerMenu(_gdkmonitor: Gdk.Monitor) {
  const { NONE } = Astal.WindowAnchor

  return (
    <window
      name="power-menu"
      anchor={NONE}
      application={app}
      visible={false}
      $={(self) => {
        const motion = new Gtk.EventControllerMotion()
        let timeout: ReturnType<typeof setTimeout> | null = null

        motion.connect("leave", () => {
          timeout = setTimeout(() => self.set_visible(false), 1000)
        })
        motion.connect("enter", () => {
          if (timeout !== null) { clearTimeout(timeout); timeout = null }
        })
        self.add_controller(motion)
      }}
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

export function PowerToggle() {
  return (
    <button
      cssClasses={["qs-toggle", "qs-power"]}
      onClicked={() => app.toggle_window("power-menu")}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <box>
          <label cssClasses={["qs-toggle-icon"]} label="⏻" />
          <label cssClasses={["qs-toggle-name"]} label="Power" hexpand xalign={0} />
        </box>
        <label cssClasses={["qs-toggle-status"]} label="Shutdown / Reboot" xalign={0} />
      </box>
    </button>
  )
}

export default function PowerButton() {
  return (
    <button
      cssClasses={["power-button"]}
      onClicked={() => app.toggle_window("power-menu")}
    >
      <label label="⏻" />
    </button>
  )
}
