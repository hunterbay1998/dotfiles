import app from "ags/gtk4/app"
import { Gtk } from "ags/gtk4"

export default function DropMenu() {
  return (
    <button
      cssClasses={["Drop-Menu"]}
      onClicked={() => app.toggle_window("drop-menu")}
      $={(self: Gtk.Button) => {
        const motion = new Gtk.EventControllerMotion()
        motion.connect("enter", () => {
          const win = app.get_window("drop-menu")
          if (win && !win.visible) app.toggle_window("drop-menu")
        })
        self.add_controller(motion)
        ;(self as any)._motion = motion
      }}
    >
      <label label="󰄠" />
    </button>
  )
}
