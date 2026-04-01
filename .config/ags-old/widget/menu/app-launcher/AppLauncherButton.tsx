import app from "ags/gtk4/app"
import { Gtk } from "ags/gtk4"

export default function AppLauncherButton() {
  return (
    <button
      cssClasses={["launcher-button"]}
      onClicked={() => app.toggle_window("app-launcher")}
      $={(self: Gtk.Button) => {
        const motion = new Gtk.EventControllerMotion()
        motion.connect("enter", () => {
          const win = app.get_window("app-launcher")
          if (win && !win.visible) app.toggle_window("app-launcher")
        })
        self.add_controller(motion)
        ;(self as any)._motion = motion
      }}
    >
      <label label="󰣇" />
    </button>
  )
}
