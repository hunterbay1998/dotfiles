import app from "ags/gtk4/app"
import { createBinding, createComputed } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import AstalWp from "gi://AstalWp?version=0.1"

const wp = AstalWp.Wp.get_default()!

export default function VolumeWindow(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const speaker = wp.defaultSpeaker
  const volume = createBinding(speaker, "volume")
  const muted = createBinding(speaker, "mute")

  const icon = createComputed(() => {
    if (muted()) return "󰸈"
    const v = Math.round(volume() * 100)
    return v >= 70 ? "󰕾" : v >= 30 ? "󰖀" : v > 0 ? "󰕿" : "󰸈"
  })

  const pct = createComputed(() => `${Math.round(volume() * 100)}%`)

  return (
    <window
      name="volume-menu"
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      marginTop={5}
      marginRight={8}
      application={app}
      visible={false}
    >
      <box cssClasses={["volume-menu-box"]} orientation={Gtk.Orientation.VERTICAL} spacing={8}>
        <box spacing={8}>
          <button
            cssClasses={["volume-mute-btn"]}
            onClicked={() => { speaker.mute = !speaker.mute }}
          >
            <label label={icon} />
          </button>
          <label label={pct} cssClasses={["volume-pct"]} />
        </box>
        <slider
          cssClasses={["volume-slider"]}
          hexpand
          value={volume}
          onChangeValue={(self) => {
            speaker.volume = self.get_value()
          }}
        />
      </box>
    </window>
  )
}
