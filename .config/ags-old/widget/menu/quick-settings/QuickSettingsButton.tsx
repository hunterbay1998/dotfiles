import app from "ags/gtk4/app"
import { Gtk } from "ags/gtk4"

export default function QuickSettingsButton() {
  return (
    <button
      cssClasses={["qs-button"]}
      onClicked={() => app.toggle_window("quick-settings")}
      $={(self: Gtk.Button) => {
        const motion = new Gtk.EventControllerMotion()
        motion.connect("enter", () => {
          const win = app.get_window("quick-settings")
          if (win && !win.visible) app.toggle_window("quick-settings")
        })
        self.add_controller(motion)
        ;(self as any)._motion = motion
      }}
    >
      <label label="󰕾 󰤨" />
    </button>
  )
}
