/* ==========================================
   OSD — Volume & Brightness overlay
   Appears automatically when values change
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk } from "ags/gtk4"
import { createState } from "ags"
import Wp from "gi://AstalWp"
import GLib from "gi://GLib"
import Gio from "gi://Gio"

const speaker = Wp.get_default()!.audio.defaultSpeaker

function getVolumeIcon(mute: boolean, vol: number): string {
  if (mute || vol === 0) return "󰝟"
  if (vol < 0.33) return "󰕿"
  if (vol < 0.66) return "󰖀"
  return "󰕾"
}

function getBrightnessIcon(pct: number): string {
  if (pct > 0.75) return "󰃠"
  if (pct > 0.5)  return "󰃟"
  if (pct > 0.25) return "󰃞"
  return "󰃝"
}

export default function OSD() {
  const { BOTTOM } = Astal.WindowAnchor
  const [value, setValue] = createState(0)
  const [icon, setIcon] = createState("󰕾")

  return (
    <window
      name="osd"
      anchor={Astal.WindowAnchor.RIGHT}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.NORMAL}
      application={app}
      visible={false}
      marginRight={16}
      $={(self) => {
        let hideTimer: ReturnType<typeof setTimeout> | null = null

        function show(v: number, i: string) {
          setValue(v)
          setIcon(i)
          self.set_visible(true)
          if (hideTimer) clearTimeout(hideTimer)
          hideTimer = setTimeout(() => {
            self.set_visible(false)
            hideTimer = null
          }, 1500)
        }

        // Volume — skip first emission on startup
        let initVolume = true
        let initMute = true
        speaker.connect("notify::volume", () => {
          if (initVolume) { initVolume = false; return }
          show(speaker.volume, getVolumeIcon(speaker.mute, speaker.volume))
        })
        speaker.connect("notify::mute", () => {
          if (initMute) { initMute = false; return }
          show(speaker.mute ? 0 : speaker.volume, getVolumeIcon(speaker.mute, speaker.volume))
        })

        // Brightness — read directly from sysfs (no process spawn)
        function readBrightness(): number {
          try {
            const base = "/sys/class/backlight"
            const dir = Gio.File.new_for_path(base)
            const iter = dir.enumerate_children("standard::name", 0, null)
            const info = iter.next_file(null)
            if (!info) return -1
            const device = `${base}/${info.get_name()}`
            const [, cur] = GLib.file_get_contents(`${device}/brightness`)
            const [, max] = GLib.file_get_contents(`${device}/max_brightness`)
            return parseInt(new TextDecoder().decode(cur)) / parseInt(new TextDecoder().decode(max))
          } catch { return -1 }
        }

        let prevBright = -1
        GLib.timeout_add(GLib.PRIORITY_LOW, 500, () => {
          const pct = readBrightness()
          if (pct >= 0 && prevBright >= 0 && Math.abs(pct - prevBright) > 0.005) {
            show(pct, getBrightnessIcon(pct))
          }
          prevBright = pct
          return GLib.SOURCE_CONTINUE
        })
      }}
    >
      <box cssClasses={["osd"]} orientation={Gtk.Orientation.VERTICAL} spacing={10} halign={Gtk.Align.CENTER}>
        <label cssClasses={["osd-icon"]} label={icon} />
        <levelbar
          cssClasses={["osd-bar"]}
          widthRequest={6}
          heightRequest={160}
          halign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}
          inverted
          value={value}
          minValue={0}
          maxValue={1}
        />
        <label
          cssClasses={["osd-percent"]}
          label={value(v => `${Math.round(v * 100)}%`)}
        />
      </box>
    </window>
  )
}
