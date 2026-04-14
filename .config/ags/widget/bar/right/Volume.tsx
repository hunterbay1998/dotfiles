/* ==========================================
   VOLUME WIDGETS
   Includes: VolumeButton, VolumeMenu
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "ags"
import Wp from "gi://AstalWp"

const speaker = Wp.get_default()!.audio.defaultSpeaker

function getVolumeIcon(mute: boolean, volume: number): string {
  if (mute || volume === 0) return "󰝟"
  if (volume < 0.33) return "󰕿"
  if (volume < 0.66) return "󰖀"
  return "󰕾"
}

export function VolumeMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const volume = createBinding(speaker, "volume")
  const mute = createBinding(speaker, "mute")

  return (
    <window
      name="volume-menu"
      anchor={TOP | RIGHT}
      marginTop={5}
      marginRight={8}
      application={app}
      visible={false}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["volume-menu"]} widthRequest={220}>
        <box cssClasses={["volume-header"]}>
          <button cssClasses={["volume-mute-btn"]} onClicked={() => { speaker.mute = !speaker.mute }}>
            <label label={mute.as(m => m ? "󰝟" : "󰕾")} />
          </button>
          <label hexpand label={volume.as(v => `${Math.round(v * 100)}%`)} />
        </box>
        <slider
          cssClasses={["volume-slider"]}
          hexpand
          drawValue={false}
          $={(self) => {
            self.set_range(0, 1)
            self.set_increments(0.05, 0.1)
            self.set_value(speaker.volume)

            let updating = false
            self.connect("value-changed", () => {
              if (!updating) speaker.volume = self.get_value()
            })
            speaker.connect("notify::volume", () => {
              updating = true
              self.set_value(speaker.volume)
              updating = false
            })
          }}
        />
      </box>
    </window>
  )
}

export function VolumeSection() {
  const volume = createBinding(speaker, "volume")
  const mute = createBinding(speaker, "mute")

  return (
    <box cssClasses={["qs-volume"]} orientation={Gtk.Orientation.VERTICAL}>
      <box cssClasses={["qs-volume-header"]}>
        <button cssClasses={["qs-volume-icon"]} onClicked={() => { speaker.mute = !speaker.mute }}>
          <label label={mute.as(m => getVolumeIcon(m, speaker.volume))} />
        </button>
        <label hexpand cssClasses={["qs-volume-label"]} label="Volume" xalign={0} />
        <label cssClasses={["qs-volume-percent"]} label={volume.as(v => `${Math.round(v * 100)}%`)} />
      </box>
      <slider
        cssClasses={["qs-volume-slider"]}
        hexpand
        drawValue={false}
        $={(self) => {
          self.set_range(0, 1)
          self.set_increments(0.05, 0.1)
          self.set_value(speaker.volume)
          let updating = false
          self.connect("value-changed", () => {
            if (!updating) speaker.volume = self.get_value()
          })
          speaker.connect("notify::volume", () => {
            updating = true
            self.set_value(speaker.volume)
            updating = false
          })
        }}
      />
    </box>
  )
}

export default function VolumeButton() {
  const mute = createBinding(speaker, "mute")

  return (
    <button
      cssClasses={["volume-button"]}
      onClicked={() => app.toggle_window("volume-menu")}
    >
      <label label={mute.as(m => getVolumeIcon(m, speaker.volume))} />
    </button>
  )
}
