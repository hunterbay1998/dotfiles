import { Gtk } from "ags/gtk4"

/** Hide `widget` after the pointer leaves; cancel if it re-enters in time. */
export function autoHideOnLeave(widget: Gtk.Widget, delayMs: number) {
  const motion = new Gtk.EventControllerMotion()
  let timeout: ReturnType<typeof setTimeout> | null = null

  function clearTimer() {
    if (timeout !== null) { clearTimeout(timeout); timeout = null }
  }

  motion.connect("leave", () => {
    timeout = setTimeout(() => widget.set_visible(false), delayMs)
  })
  motion.connect("enter", clearTimer)

  // If the window is shown externally (e.g. toggle_window), cancel any pending hide
  widget.connect("notify::visible", () => {
    if (widget.get_visible()) clearTimer()
  })

  widget.add_controller(motion)
}
