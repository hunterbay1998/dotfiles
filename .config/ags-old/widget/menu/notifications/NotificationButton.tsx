import app from "ags/gtk4/app"
import { createBinding, createComputed } from "ags"
import { Gtk } from "ags/gtk4"
import AstalNotifd from "gi://AstalNotifd?version=0.1"

const notifd = AstalNotifd.Notifd.get_default()

export default function NotificationButton() {
  const notifications = createBinding(notifd, "notifications")
  const label = createComputed(() => {
    const count = notifications().length
    return count > 0 ? `󰂚 ${count}` : "󰂜"
  })

  return (
    <button
      cssClasses={["notif-button"]}
      onClicked={() => app.toggle_window("notification-menu")}
      $={(self: Gtk.Button) => {
        const motion = new Gtk.EventControllerMotion()
        motion.connect("enter", () => {
          const win = app.get_window("notification-menu")
          if (win && !win.visible) app.toggle_window("notification-menu")
        })
        self.add_controller(motion)
        ;(self as any)._motion = motion
      }}
    >
      <label label={label} />
    </button>
  )
}
