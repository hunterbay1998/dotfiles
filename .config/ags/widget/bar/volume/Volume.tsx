import { createBinding, createComputed } from "ags"
import { Gtk } from "ags/gtk4"
import AstalWp from "gi://AstalWp?version=0.1"

const wp = AstalWp.Wp.get_default()!

export default function Volume() {
  const volume = createBinding(wp.defaultSpeaker, "volume")
  const muted = createBinding(wp.defaultSpeaker, "mute")

  const label = createComputed(() => {
    if (muted()) return "󰸈 Muted"

    const v = Math.round(volume() * 100)
    const icon = v >= 70 ? "󰕾" :
                 v >= 30 ? "󰖀" :
                 v > 0   ? "󰕿" :
                 "󰸈"

    return `${icon} ${v}󰏰`
  })

  return (
    <box cssClasses={["volume"]}>
      <Gtk.EventControllerScroll
        flags={Gtk.EventControllerScrollFlags.VERTICAL}
        onScroll={(_, _dx, dy) => {
          const current = wp.defaultSpeaker.volume
          wp.defaultSpeaker.volume = Math.max(0, Math.min(1, current - dy * 0.05))
        }}
      />
      <label label={label} />
    </box>
  )
}
