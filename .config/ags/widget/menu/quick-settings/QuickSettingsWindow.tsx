import app from "ags/gtk4/app"
import { createBinding, createComputed } from "ags"
import { Astal, Gtk } from "ags/gtk4"
import GLib from "gi://GLib"
import AstalWp from "gi://AstalWp?version=0.1"
import AstalNetwork from "gi://AstalNetwork?version=0.1"
import AstalBluetooth from "gi://AstalBluetooth?version=0.1"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"

const wp = AstalWp.Wp.get_default()!
const network = AstalNetwork.get_default()
const bluetooth = AstalBluetooth.Bluetooth.get_default()

function getBrightness(): number {
  try {
    const [, cur] = GLib.file_get_contents("/sys/class/backlight/amdgpu_bl1/brightness")
    const [, max] = GLib.file_get_contents("/sys/class/backlight/amdgpu_bl1/max_brightness")
    const c = parseInt(new TextDecoder().decode(cur).trim())
    const m = parseInt(new TextDecoder().decode(max).trim())
    return m > 0 ? c / m : 0
  } catch {
    return 0
  }
}

function VolumeSection() {
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
    <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
      <box spacing={8}>
        <button
          cssClasses={["qs-icon-btn"]}
          onClicked={() => { speaker.mute = !speaker.mute }}
        >
          <label label={icon} />
        </button>
        <label label={pct} cssClasses={["qs-label"]} />
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
  )
}

function MicSection() {
  const mic = wp.defaultMicrophone
  const volume = createBinding(mic, "volume")
  const muted = createBinding(mic, "mute")

  const icon = createComputed(() => muted() ? "󰍭" : "󰍬")
  const pct = createComputed(() => `${Math.round(volume() * 100)}%`)

  return (
    <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
      <box spacing={8}>
        <button
          cssClasses={["qs-icon-btn"]}
          onClicked={() => { mic.mute = !mic.mute }}
        >
          <label label={icon} />
        </button>
        <label label={pct} cssClasses={["qs-label"]} />
      </box>
      <slider
        cssClasses={["mic-slider"]}
        hexpand
        value={volume}
        onChangeValue={(self) => {
          mic.volume = self.get_value()
        }}
      />
    </box>
  )
}

function BluetoothSection() {
  const powered = createBinding(bluetooth, "isPowered")
  const toggleLabel = createComputed(() => powered() ? "󰂯  Bluetooth On" : "󰂲  Bluetooth Off")
  const btnLabel = createComputed(() => powered() ? "Disable" : "Enable")

  return (
    <box spacing={8}>
      <label label={toggleLabel} cssClasses={["qs-label"]} halign={Gtk.Align.START} hexpand />
      <button
        cssClasses={["qs-toggle-btn"]}
        onClicked={() => { bluetooth.isPowered = !bluetooth.isPowered }}
      >
        <label label={btnLabel} />
      </button>
    </box>
  )
}

function BrightnessSection() {
  const brightness = createPoll(getBrightness(), 2000, () => getBrightness())
  const pct = createComputed(() => `${Math.round(brightness() * 100)}%`)

  return (
    <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
      <box spacing={8}>
        <label label="󰃟" cssClasses={["qs-icon-label"]} />
        <label label={pct} cssClasses={["qs-label"]} />
      </box>
      <slider
        cssClasses={["brightness-slider"]}
        hexpand
        value={brightness}
        onChangeValue={(self) => {
          const val = Math.round(self.get_value() * 100)
          execAsync(["brightnessctl", "set", `${val}%`])
        }}
      />
    </box>
  )
}

function WifiSection() {
  const enabled = createBinding(network.wifi, "enabled")
  const ssid = createBinding(network.wifi, "ssid")
  const strength = createBinding(network.wifi, "strength")
  const primary = createBinding(network, "primary")

  const statusLabel = createComputed(() => {
    if (primary() === AstalNetwork.Primary.WIRED) return "󰈀  Ethernet"
    if (!enabled()) return "󰤭  Wi-Fi Off"
    const name = ssid()
    return name ? `󰤨  ${name}` : "󰤭  Not connected"
  })

  const strengthLabel = createComputed(() => {
    if (!enabled() || primary() === AstalNetwork.Primary.WIRED) return ""
    return `Signal: ${strength()}%`
  })

  const toggleLabel = createComputed(() => enabled() ? "Disable" : "Enable")

  return (
    <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
      <box spacing={8}>
        <label label={statusLabel} cssClasses={["qs-label"]} halign={Gtk.Align.START} hexpand />
        <button
          cssClasses={["qs-toggle-btn"]}
          onClicked={() => {
            execAsync(["nmcli", "radio", "wifi", enabled() ? "off" : "on"])
          }}
        >
          <label label={toggleLabel} />
        </button>
      </box>
      <label label={strengthLabel} cssClasses={["qs-sublabel"]} halign={Gtk.Align.START} />
    </box>
  )
}

export default function QuickSettingsWindow(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  let closeTimer = 0

  return (
    <window
      name="quick-settings"
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      marginTop={5}
      marginRight={8}
      application={app}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyIsActive={(self) => {
        if (!self.isActive) {
          closeTimer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
            if (!self.isActive) self.visible = false
            closeTimer = 0
            return GLib.SOURCE_REMOVE
          })
        } else if (closeTimer) {
          GLib.source_remove(closeTimer)
          closeTimer = 0
        }
      }}
    >
      <box cssClasses={["qs-box"]} orientation={Gtk.Orientation.VERTICAL} spacing={10}>
        <VolumeSection />
        <box cssClasses={["qs-separator"]} />
        <BrightnessSection />
        <box cssClasses={["qs-separator"]} />
        <MicSection />
        <box cssClasses={["qs-separator"]} />
        <WifiSection />
        <box cssClasses={["qs-separator"]} />
        <BluetoothSection />
      </box>
    </window>
  )
}
