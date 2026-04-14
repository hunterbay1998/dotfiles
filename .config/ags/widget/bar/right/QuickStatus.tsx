/* ==========================================
   QUICK STATUS BAR INDICATORS
   Volume, Brightness, Wifi, Bluetooth
   — click opens the side menu
   ========================================== */

import app from "ags/gtk4/app"
import { createBinding, createState } from "ags"
import { execAsync } from "ags/process"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import AstalBluetooth from "gi://AstalBluetooth"

const speaker = Wp.get_default()!.audio.defaultSpeaker
const wifi = Network.get_default().wifi
const bluetooth = AstalBluetooth.get_default()

function getVolumeIcon(mute: boolean, volume: number): string {
  if (mute || volume === 0) return "󰝟"
  if (volume < 0.33) return "󰕿"
  if (volume < 0.66) return "󰖀"
  return "󰕾"
}

function getWifiIcon(strength: number): string {
  if (strength >= 80) return "󰤨"
  if (strength >= 60) return "󰤥"
  if (strength >= 40) return "󰤢"
  if (strength >= 20) return "󰤟"
  return "󰤯"
}

export default function QuickStatus() {
  const volume = createBinding(speaker, "volume")
  const mute = createBinding(speaker, "mute")
  const wifiStrength = createBinding(wifi, "strength")
  const wifiEnabled = createBinding(wifi, "enabled")
  const btPowered = createBinding(bluetooth.adapter, "powered")
  const [brightness, setBrightness] = createState(100)

  execAsync(["bash", "-c", "brightnessctl -m | cut -d, -f4 | tr -d %"])
    .then(out => {
      const v = parseInt(out.trim(), 10)
      if (!isNaN(v)) setBrightness(v)
    })
    .catch(() => {})

  return (
    <button
      cssClasses={["qs-bar-group"]}
      onClicked={() => app.toggle_window("side-menu")}
    >
      <box spacing={6}>

        {/* Volume */}
        <box cssClasses={["qs-bar-item"]} spacing={3}>
          <label
            cssClasses={["qs-bar-icon", "qs-bar-vol"]}
            label={mute.as(m => getVolumeIcon(m, speaker.volume))}
          />
          <label
            cssClasses={["qs-bar-label"]}
            label={volume.as(v => `${Math.round(v * 100)}%`)}
          />
        </box>

        {/* Brightness */}
        <box cssClasses={["qs-bar-item"]} spacing={3}>
          <label cssClasses={["qs-bar-icon", "qs-bar-bright"]} label="󰃞" />
          <label
            cssClasses={["qs-bar-label"]}
            label={brightness(v => `${v}%`)}
          />
        </box>

        {/* Wifi */}
        <label
          cssClasses={["qs-bar-icon", "qs-bar-wifi"]}
          label={wifiStrength.as(s => wifi.enabled ? getWifiIcon(s) : "󰤭")}
        />

        {/* Bluetooth */}
        <label
          cssClasses={["qs-bar-icon", "qs-bar-bt"]}
          label={btPowered.as(p => p ? "󰂯" : "󰂲")}
        />

      </box>
    </button>
  )
}
