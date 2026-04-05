import { Gtk } from "ags/gtk4"

/** Hide `widget` after the pointer leaves; cancel if it re-enters in time. */
export function autoHideOnLeave(widget: Gtk.Widget, delayMs: number) {
  const motion = new Gtk.EventControllerMotion()
  let timeout: ReturnType<typeof setTimeout> | null = null

  motion.connect("leave", () => {
    timeout = setTimeout(() => widget.set_visible(false), delayMs)
  })
  motion.connect("enter", () => {
    if (timeout !== null) { clearTimeout(timeout); timeout = null }
  })
  widget.add_controller(motion)
}
