/* ==========================================
   SETTINGS PANEL
   Tabs: Audio, Bluetooth, WiFi, Wallpaper
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createState, createBinding, For } from "ags"
import { execAsync } from "ags/process"
import Wp from "gi://AstalWp"
import AstalBluetooth from "gi://AstalBluetooth"
import Network from "gi://AstalNetwork"
import GdkPixbuf from "gi://GdkPixbuf"
import Gio from "gi://Gio"
import GLib from "gi://GLib"

const wp = Wp.get_default()!
const bluetooth = AstalBluetooth.get_default()
const network = Network.get_default()
const wifi = network.wifi

function sigStrIcon(s: number) {
  if (s >= 80) return "󰤨"
  if (s >= 60) return "󰤥"
  if (s >= 40) return "󰤢"
  if (s >= 20) return "󰤟"
  return "󰤯"
}

// ─── Audio Tab ───────────────────────────────────────────────

function AudioTab() {
  const spk = wp.audio.defaultSpeaker
  const mic = wp.audio.defaultMicrophone

  const spkVol  = createBinding(spk, "volume")
  const spkMute = createBinding(spk, "mute")
  const micVol  = createBinding(mic, "volume")
  const micMute = createBinding(mic, "mute")
  const speakers = createBinding(wp.audio, "speakers")
  const mics     = createBinding(wp.audio, "microphones")

  return (
    <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["settings-content"]} spacing={4} vexpand>

      <label cssClasses={["settings-section-title"]} label="Output" xalign={0} />

      <box cssClasses={["settings-slider-card"]} orientation={Gtk.Orientation.VERTICAL}>
        <box cssClasses={["settings-slider-header"]}>
          <label cssClasses={["settings-slider-icon"]}
            label={spkMute.as(m => m ? "󰝟" : "󰕾")} />
          <label cssClasses={["settings-slider-label"]} label="Volume" hexpand xalign={0} />
          <label cssClasses={["settings-slider-value"]}
            label={spkVol.as(v => `${Math.round(v * 100)}%`)} />
        </box>
        <slider cssClasses={["settings-slider"]} hexpand drawValue={false}
          $={(self) => {
            self.set_range(0, 1)
            self.set_increments(0.05, 0.1)
            self.set_value(spk.volume)
            let busy = false
            self.connect("value-changed", () => { if (!busy) spk.volume = self.get_value() })
            spk.connect("notify::volume", () => { busy = true; self.set_value(spk.volume); busy = false })
          }}
        />
      </box>

      <label cssClasses={["settings-subsection-title"]} label="Output Devices" xalign={0} />
      <scrolledwindow cssClasses={["settings-scroll"]} vexpand
        vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
        hscrollbarPolicy={Gtk.PolicyType.NEVER}>
        <box orientation={Gtk.Orientation.VERTICAL}>
          <For each={speakers}>
            {(ep) => (
              <button
                cssClasses={createBinding(ep, "isDefault").as(d =>
                  d ? ["settings-device-row", "active"] : ["settings-device-row"])}
                onClicked={() => { ep.isDefault = true }}
              >
                <box spacing={10}>
                  <label cssClasses={["settings-device-icon"]} label="󰓃" />
                  <label cssClasses={["settings-device-name"]} hexpand xalign={0}
                    label={ep.description} maxWidthChars={32} ellipsize={3} />
                  <label cssClasses={["settings-device-check"]} label="󰄬"
                    visible={createBinding(ep, "isDefault")} />
                </box>
              </button>
            )}
          </For>
        </box>
      </scrolledwindow>

      <label cssClasses={["settings-section-title"]} label="Input" xalign={0} />

      <box cssClasses={["settings-slider-card"]} orientation={Gtk.Orientation.VERTICAL}>
        <box cssClasses={["settings-slider-header"]}>
          <label cssClasses={["settings-slider-icon"]}
            label={micMute.as(m => m ? "󰍭" : "󰍬")} />
          <label cssClasses={["settings-slider-label"]} label="Microphone" hexpand xalign={0} />
          <label cssClasses={["settings-slider-value"]}
            label={micVol.as(v => `${Math.round(v * 100)}%`)} />
        </box>
        <slider cssClasses={["settings-slider"]} hexpand drawValue={false}
          $={(self) => {
            self.set_range(0, 1)
            self.set_increments(0.05, 0.1)
            self.set_value(mic.volume)
            let busy = false
            self.connect("value-changed", () => { if (!busy) mic.volume = self.get_value() })
            mic.connect("notify::volume", () => { busy = true; self.set_value(mic.volume); busy = false })
          }}
        />
      </box>

      <label cssClasses={["settings-subsection-title"]} label="Input Devices" xalign={0} />
      <scrolledwindow cssClasses={["settings-scroll"]} vexpand
        vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
        hscrollbarPolicy={Gtk.PolicyType.NEVER}>
        <box orientation={Gtk.Orientation.VERTICAL}>
          <For each={mics}>
            {(ep) => (
              <button
                cssClasses={createBinding(ep, "isDefault").as(d =>
                  d ? ["settings-device-row", "active"] : ["settings-device-row"])}
                onClicked={() => { ep.isDefault = true }}
              >
                <box spacing={10}>
                  <label cssClasses={["settings-device-icon"]} label="󰍬" />
                  <label cssClasses={["settings-device-name"]} hexpand xalign={0}
                    label={ep.description} maxWidthChars={32} ellipsize={3} />
                  <label cssClasses={["settings-device-check"]} label="󰄬"
                    visible={createBinding(ep, "isDefault")} />
                </box>
              </button>
            )}
          </For>
        </box>
      </scrolledwindow>

    </box>
  )
}

// ─── Bluetooth Tab ───────────────────────────────────────────

function BluetoothTab() {
  const [powered, setPowered] = createState(false)
  const devices = createBinding(bluetooth, "devices")

  function refreshPowered() {
    execAsync("bluetoothctl show")
      .then(out => setPowered(out.includes("Powered: yes")))
      .catch(() => setPowered(false))
  }

  refreshPowered()

  return (
    <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["settings-content"]} spacing={4} vexpand>

      <box cssClasses={["settings-toggle-row"]}>
        <label cssClasses={["settings-toggle-icon"]} label="󰂯" />
        <label cssClasses={["settings-toggle-label"]} label="Bluetooth" hexpand xalign={0} />
        <button
          cssClasses={powered.as(p => p ? ["settings-toggle-btn", "active"] : ["settings-toggle-btn"])}
          onClicked={() => {
            const next = !powered.peek()
            const cmd = next
              ? "rfkill unblock bluetooth && bluetoothctl power on"
              : "bluetoothctl power off"
            execAsync(["bash", "-c", cmd])
              .then(() => refreshPowered())
              .catch(console.error)
          }}
        >
          <label label={powered.as(p => p ? "On" : "Off")} />
        </button>
      </box>

      <label cssClasses={["settings-section-title"]} label="Devices" xalign={0} />

      <scrolledwindow cssClasses={["settings-scroll"]} vexpand
        vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
        hscrollbarPolicy={Gtk.PolicyType.NEVER}>
        <box orientation={Gtk.Orientation.VERTICAL}>
          <For each={devices}>
            {(device) => (
              <box cssClasses={["settings-bt-row"]}>
                <label cssClasses={["settings-bt-icon"]}
                  label={createBinding(device, "connected").as(c => c ? "󰂱" : "󰂲")} />
                <box orientation={Gtk.Orientation.VERTICAL} hexpand valign={Gtk.Align.CENTER}>
                  <label cssClasses={["settings-bt-name"]} label={device.name} xalign={0} />
                  <label cssClasses={["settings-bt-status"]}
                    label={createBinding(device, "connected").as(c => c ? "Connected" : "Paired")}
                    xalign={0} />
                </box>
                <label
                  cssClasses={["settings-bt-battery"]}
                  label={createBinding(device, "batteryPercentage").as(b => b > 0 ? `${b}%` : "")}
                  visible={createBinding(device, "batteryPercentage").as(b => b > 0)}
                />
                <button
                  cssClasses={createBinding(device, "connected").as(c =>
                    c ? ["settings-bt-btn", "disconnect"] : ["settings-bt-btn"])}
                  onClicked={() => {
                    if (device.connected) device.disconnect_device()
                    else device.connect_device()
                  }}
                >
                  <label label={createBinding(device, "connected").as(c => c ? "Disconnect" : "Connect")} />
                </button>
              </box>
            )}
          </For>
        </box>
      </scrolledwindow>

    </box>
  )
}

// ─── WiFi Tab ────────────────────────────────────────────────

function WifiTab() {
  const [search, setSearch] = createState("")
  const enabled  = createBinding(wifi, "enabled")
  const ssid     = createBinding(wifi, "ssid")
  const strength = createBinding(wifi, "strength")
  const aps      = createBinding(wifi, "accessPoints")

  function connect(apSsid: string) {
    execAsync(`nmcli device wifi connect "${apSsid}"`)
      .catch(() => execAsync("nm-connection-editor"))
  }

  return (
    <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["settings-content"]} spacing={4} vexpand>

      <box cssClasses={["settings-toggle-row"]}>
        <label cssClasses={["settings-toggle-icon"]} label={strength.as(sigStrIcon)} />
        <label cssClasses={["settings-toggle-label"]} label="WiFi" hexpand xalign={0} />
        <button
          cssClasses={enabled.as(e => e ? ["settings-toggle-btn", "active"] : ["settings-toggle-btn"])}
          onClicked={() => { wifi.enabled = !wifi.enabled }}
        >
          <label label={enabled.as(e => e ? "On" : "Off")} />
        </button>
      </box>

      <box cssClasses={["settings-wifi-connected"]} visible={enabled.as(e => e && !!wifi.ssid)}>
        <label cssClasses={["settings-wifi-connected-icon"]} label="󰤨" />
        <box orientation={Gtk.Orientation.VERTICAL} hexpand valign={Gtk.Align.CENTER}>
          <label cssClasses={["settings-wifi-connected-ssid"]} label={ssid.as(s => s ?? "")} xalign={0} />
          <label cssClasses={["settings-wifi-connected-status"]} label="Connected" xalign={0} />
        </box>
        <label cssClasses={["settings-wifi-strength"]} label={strength.as(s => `${s}%`)} />
      </box>

      <box cssClasses={["settings-wifi-search-row"]} spacing={8}>
        <box cssClasses={["settings-wifi-search"]} hexpand>
          <label cssClasses={["settings-search-icon"]} label="󰍉" />
          <entry
            cssClasses={["settings-search-entry"]}
            placeholderText="Search networks..."
            hexpand
            $={(self) => self.connect("notify::text", () => setSearch(self.text))}
          />
        </box>
        <button cssClasses={["settings-scan-btn"]} onClicked={() => wifi.scan()}>
          <label label="󰑐 Scan" />
        </button>
      </box>

      <scrolledwindow cssClasses={["settings-scroll"]} vexpand
        vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
        hscrollbarPolicy={Gtk.PolicyType.NEVER}>
        <box orientation={Gtk.Orientation.VERTICAL}>
          <For each={search.as(s =>
            aps.peek()
              .filter(ap => ap.ssid && ap.ssid.toLowerCase().includes(s.toLowerCase()))
              .sort((a, b) => b.strength - a.strength)
          )}>
            {(ap) => (
              <button
                cssClasses={ssid.as(s => s === ap.ssid
                  ? ["settings-ap-row", "connected"]
                  : ["settings-ap-row"])}
                onClicked={() => { if (wifi.ssid !== ap.ssid) connect(ap.ssid) }}
              >
                <box spacing={10}>
                  <label cssClasses={["settings-ap-icon"]} label={sigStrIcon(ap.strength)} />
                  <label cssClasses={["settings-ap-ssid"]} label={ap.ssid} hexpand xalign={0} />
                  <label cssClasses={["settings-ap-strength"]} label={`${ap.strength}%`} />
                  <label cssClasses={["settings-ap-check"]} label="󰄬"
                    visible={ssid.as(s => s === ap.ssid)} />
                </box>
              </button>
            )}
          </For>
        </box>
      </scrolledwindow>

    </box>
  )
}

// ─── Wallpaper Tab ───────────────────────────────────────────

const WALLPAPER_DIR = `${GLib.get_home_dir()}/Pictures/AGSpaper`

interface DirContents {
  folders: { name: string; path: string }[]
  files: string[]
}

function getDirContents(dir: string): DirContents {
  try {
    const gdir = Gio.File.new_for_path(dir)
    const enumerator = gdir.enumerate_children("standard::name,standard::type", Gio.FileQueryInfoFlags.NONE, null)
    const folders: { name: string; path: string }[] = []
    const files: string[] = []
    let info: Gio.FileInfo | null
    while ((info = enumerator.next_file(null)) !== null) {
      const name = info.get_name()
      const path = `${dir}/${name}`
      if (info.get_file_type() === Gio.FileType.DIRECTORY) {
        folders.push({ name, path })
      } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(name)) {
        files.push(path)
      }
    }
    return {
      folders: folders.sort((a, b) => a.name.localeCompare(b.name)),
      files: files.sort(),
    }
  } catch {
    return { folders: [], files: [] }
  }
}

function loadThumbAsync(path: string, pic: Gtk.Picture) {
  GLib.idle_add(GLib.PRIORITY_LOW, () => {
    try {
      const pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_scale(path, 260, 163, true)
      if (pixbuf) pic.set_paintable(Gdk.Texture.new_for_pixbuf(pixbuf))
    } catch { }
    return GLib.SOURCE_REMOVE
  })
}

const HYPRPAPER_CONF      = `${GLib.get_home_dir()}/.config/hypr/hyprpaper.conf`
const HYPRPAPER_HOST_CONF = `${GLib.get_home_dir()}/.config/hypr/hyprpaper-${GLib.get_host_name()}.conf`

async function setWallpaper(path: string, setCurrent: (p: string) => void) {
  try {
    const monitorsJson = await execAsync("hyprctl monitors -j")
    const monitors: { name: string }[] = JSON.parse(monitorsJson)

    const preload = `preload = ${path}`
    const walls = monitors
      .map(m => `wallpaper {\n  monitor = ${m.name}\n  path = ${path}\n  fit_mode = cover\n}`)
      .join("\n")
    const config = `ipc = on\n${preload}\n${walls}\nsplash = false`

    // Write to both: hostname file persists across reboots, main file used on immediate restart
    await execAsync(["python3", "-c",
      `c=${JSON.stringify(config)};open(${JSON.stringify(HYPRPAPER_CONF)},'w').write(c);open(${JSON.stringify(HYPRPAPER_HOST_CONF)},'w').write(c)`
    ])

    await execAsync("bash -c 'pkill -x hyprpaper; sleep 0.3; hyprpaper &'")
    setCurrent(path)
  } catch (e) {
    console.error("Failed to set wallpaper:", e)
  }
}

async function getCurrentWallpaper(): Promise<string> {
  try {
    const conf = await execAsync(`cat ${HYPRPAPER_CONF}`)
    const match = conf.match(/path\s*=\s*(.+)/)
    return match?.[1]?.trim() ?? ""
  } catch {
    return ""
  }
}

const SLIDESHOW_CONFIG_PATH = `${GLib.get_home_dir()}/.config/ags/wallpaper-slideshow.json`

function loadSlideshowConfig() {
  try {
    const [, bytes] = GLib.file_get_contents(SLIDESHOW_CONFIG_PATH)
    return JSON.parse(new TextDecoder().decode(bytes)) as {
      enabled: boolean; interval: number; selected: string[]
    }
  } catch {
    return { enabled: false, interval: 30, selected: [] as string[] }
  }
}

function saveSlideshowConfig(enabled: boolean, interval: number, selected: string[]) {
  const json = JSON.stringify({ enabled, interval, selected })
  execAsync(["python3", "-c",
    `open(${JSON.stringify(SLIDESHOW_CONFIG_PATH)}, 'w').write(${JSON.stringify(json)})`
  ])
}

let slideshowTimer: number | null = null

function stopSlideshowTimer() {
  if (slideshowTimer !== null) {
    GLib.source_remove(slideshowTimer)
    slideshowTimer = null
  }
}

function startSlideshowTimer(selected: string[], intervalMins: number, setCurrent: (p: string) => void) {
  stopSlideshowTimer()
  if (selected.length === 0) return
  slideshowTimer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, intervalMins * 60 * 1000, () => {
    const idx = Math.floor(Math.random() * selected.length)
    setWallpaper(selected[idx], setCurrent)
    return GLib.SOURCE_CONTINUE
  })
}

function WallpaperTab() {
  const saved = loadSlideshowConfig()
  const [current, setCurrent] = createState("")
  const [slideshowOn, setSlideshowOn] = createState(saved.enabled)
  const [intervalMins, setIntervalMins] = createState(saved.interval)
  const [selected, setSelected] = createState<string[]>(saved.selected)
  const [selectedFolder, setSelectedFolder] = createState<string | null>(null)
  const filterRef = { apply: (_q: string) => {}, clear: () => {} }
  const gridRef   = { build: (_path: string) => {} }

  const root = getDirContents(WALLPAPER_DIR)
  const [folders] = createState(root.folders)

  getCurrentWallpaper().then(setCurrent)

  if (saved.enabled && saved.selected.length > 0)
    startSlideshowTimer(saved.selected, saved.interval, setCurrent)

  const INTERVALS = [
    { label: "5m", value: 5 },
    { label: "15m", value: 15 },
    { label: "30m", value: 30 },
    { label: "1h", value: 60 },
    { label: "2h", value: 120 },
  ]

  return (
    <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["settings-content"]} spacing={6}>

      {/* Slideshow bar */}
      <box cssClasses={["settings-slideshow-bar"]}>
        <label cssClasses={["settings-slideshow-icon"]} label="󰼝" />
        <label cssClasses={["settings-slideshow-label"]} label="Slideshow" hexpand xalign={0} />

        <box cssClasses={["settings-interval-group"]} spacing={4}
          visible={slideshowOn.as(e => e)}>
          {INTERVALS.map(({ label, value }) => (
            <button
              cssClasses={intervalMins.as(i => i === value
                ? ["settings-interval-btn", "active"]
                : ["settings-interval-btn"])}
              onClicked={() => {
                setIntervalMins(value)
                saveSlideshowConfig(slideshowOn.peek(), value, selected.peek())
                if (slideshowOn.peek()) startSlideshowTimer(selected.peek(), value, setCurrent)
              }}
            >
              <label label={label} />
            </button>
          ))}
        </box>

        <button
          cssClasses={slideshowOn.as(e => e
            ? ["settings-toggle-btn", "active"]
            : ["settings-toggle-btn"])}
          onClicked={() => {
            const next = !slideshowOn.peek()
            setSlideshowOn(next)
            saveSlideshowConfig(next, intervalMins.peek(), selected.peek())
            if (next) startSlideshowTimer(selected.peek(), intervalMins.peek(), setCurrent)
            else stopSlideshowTimer()
          }}
        >
          <label label={slideshowOn.as(e => e ? "On" : "Off")} />
        </button>
      </box>

      <label
        cssClasses={["settings-slideshow-hint"]}
        label={selected.as(s => s.length === 0
          ? "Click wallpapers below to add them to the rotation"
          : `${s.length} wallpaper${s.length === 1 ? "" : "s"} in rotation`)}
        xalign={0}
        visible={slideshowOn.as(e => e)}
      />

      {/* ── Folder list view ── */}
      <scrolledwindow cssClasses={["settings-scroll"]} hexpand vexpand
        visible={selectedFolder.as(f => f === null)}
        vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
        hscrollbarPolicy={Gtk.PolicyType.NEVER}>
        <box orientation={Gtk.Orientation.VERTICAL}>
          <For each={folders}>
            {({ name, path }) => (
              <button
                cssClasses={["settings-folder-row"]}
                onClicked={() => { setSelectedFolder(path); gridRef.build(path); filterRef.clear() }}
              >
                <box spacing={12}>
                  <label cssClasses={["settings-folder-icon"]} label="󰉋" />
                  <label cssClasses={["settings-folder-name"]} label={name} hexpand xalign={0} />
                  <label cssClasses={["settings-folder-chevron"]} label="›" />
                </box>
              </button>
            )}
          </For>
        </box>
      </scrolledwindow>

      {/* ── Wallpaper view ── */}
      <box orientation={Gtk.Orientation.VERTICAL} spacing={6} vexpand
        visible={selectedFolder.as(f => f !== null)}>

        {/* Back + folder name */}
        <box spacing={8}>
          <button cssClasses={["settings-vpn-back-btn"]}
            onClicked={() => { setSelectedFolder(null); filterRef.clear() }}>
            <label label="‹ Back" />
          </button>
          <label
            cssClasses={["settings-wallpaper-breadcrumb"]}
            label={selectedFolder.as(f => f?.split("/").pop() ?? "")}
            hexpand xalign={0}
          />
        </box>

        {/* Search */}
        <box cssClasses={["settings-wifi-search"]} hexpand>
          <label cssClasses={["settings-search-icon"]} label="󰍉" />
          <entry
            cssClasses={["settings-search-entry"]}
            hexpand
            placeholderText="Search wallpapers…"
            $={(self) => {
              self.connect("notify::text", () => filterRef.apply(self.text.toLowerCase()))
              filterRef.clear = () => { self.set_text("") }
            }}
          />
        </box>

        {/* Wallpaper grid */}
        <scrolledwindow cssClasses={["settings-scroll"]} hexpand vexpand
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}>
          <box
            $={(container) => {
              const flow = new Gtk.FlowBox()
              flow.set_max_children_per_line(2)
              flow.set_min_children_per_line(2)
              flow.set_selection_mode(Gtk.SelectionMode.NONE)
              flow.set_row_spacing(10)
              flow.set_column_spacing(10)
              flow.set_homogeneous(true)
              flow.add_css_class("settings-wallpaper-grid")
              container.append(flow)

              const items: { child: Gtk.FlowBoxChild; name: string }[] = []

              function buildGrid(files: string[]) {
                let c: Gtk.Widget | null
                while ((c = flow.get_first_child()) !== null) flow.remove(c)
                items.length = 0

                files.forEach(path => {
                  const name = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? ""

                  const btn = new Gtk.Button()
                  btn.add_css_class("settings-wallpaper-item")

                  const wrap = new Gtk.Box()
                  wrap.set_orientation(Gtk.Orientation.VERTICAL)
                  wrap.set_spacing(6)

                  const overlay = new Gtk.Overlay()

                  const pic = new Gtk.Picture()
                  pic.add_css_class("settings-wallpaper-thumb")
                  pic.set_size_request(260, 163)
                  pic.set_content_fit(Gtk.ContentFit.COVER)
                  loadThumbAsync(path, pic)
                  overlay.set_child(pic)

                  const activeCheck = new Gtk.Label()
                  activeCheck.set_label("󰄬")
                  activeCheck.add_css_class("settings-wallpaper-check")
                  activeCheck.set_halign(Gtk.Align.END)
                  activeCheck.set_valign(Gtk.Align.END)
                  activeCheck.set_visible(false)
                  overlay.add_overlay(activeCheck)

                  const slideshowBadge = new Gtk.Label()
                  slideshowBadge.set_label("󰼝")
                  slideshowBadge.add_css_class("settings-wallpaper-slideshow-badge")
                  slideshowBadge.set_halign(Gtk.Align.END)
                  slideshowBadge.set_valign(Gtk.Align.START)
                  slideshowBadge.set_visible(saved.selected.includes(path))
                  overlay.add_overlay(slideshowBadge)

                  const nameLabel = new Gtk.Label()
                  nameLabel.set_label(name)
                  nameLabel.add_css_class("settings-wallpaper-name")
                  nameLabel.set_ellipsize(3)
                  nameLabel.set_max_width_chars(20)

                  wrap.append(overlay)
                  wrap.append(nameLabel)
                  btn.set_child(wrap)

                  current.subscribe(c => {
                    if (c === path) { btn.add_css_class("active"); activeCheck.set_visible(true) }
                    else { btn.remove_css_class("active"); activeCheck.set_visible(false) }
                  })

                  selected.subscribe(s => {
                    const inRotation = s.includes(path)
                    slideshowBadge.set_visible(inRotation)
                    if (inRotation) btn.add_css_class("in-rotation")
                    else btn.remove_css_class("in-rotation")
                  })

                  btn.connect("clicked", () => {
                    if (slideshowOn.peek()) {
                      const cur = selected.peek()
                      const next = cur.includes(path)
                        ? cur.filter(p => p !== path)
                        : [...cur, path]
                      setSelected(next)
                      saveSlideshowConfig(true, intervalMins.peek(), next)
                      startSlideshowTimer(next, intervalMins.peek(), setCurrent)
                    } else {
                      setWallpaper(path, setCurrent)
                    }
                  })

                  const child = new Gtk.FlowBoxChild()
                  child.set_child(btn)
                  flow.append(child)
                  items.push({ child, name: name.toLowerCase() })
                })

                filterRef.apply = (q) => {
                  items.forEach(({ child, name }) => {
                    child.set_visible(q === "" || name.includes(q))
                  })
                }
              }

              gridRef.build = (folderPath) => buildGrid(getDirContents(folderPath).files)
            }}
          />
        </scrolledwindow>
      </box>

    </box>
  )
}

// ─── VPN Tab ─────────────────────────────────────────────────

interface VpnStatus {
  connected: boolean
  country: string
  city: string
  ip: string
  hostname: string
  uptime: string
}

function parseVpnStatus(raw: string): VpnStatus {
  const get = (key: string) => raw.match(new RegExp(`${key}:\\s*(.+)`))?.[1]?.trim() ?? ""
  return {
    connected: get("Status") === "Connected",
    country:   get("Country"),
    city:      get("City"),
    ip:        get("IP"),
    hostname:  get("Hostname"),
    uptime:    get("Uptime"),
  }
}

function VpnTab() {
  const [status, setStatus] = createState<VpnStatus>({
    connected: false, country: "", city: "", ip: "", hostname: "", uptime: ""
  })
  const [countries, setCountries] = createState<string[]>([])
  const [cities, setCities] = createState<string[]>([])
  const [selectedCountry, setSelectedCountry] = createState("")
  const [search, setSearch] = createState("")
  const [citySearch, setCitySearch] = createState("")
  const [loading, setLoading] = createState(false)

  async function refresh() {
    try {
      const raw = await execAsync("nordvpn status")
      setStatus(parseVpnStatus(raw))
    } catch {
      setStatus({ connected: false, country: "", city: "", ip: "", hostname: "", uptime: "" })
    }
  }

  async function loadCountries() {
    try {
      const raw = await execAsync("nordvpn countries")
      setCountries(raw.trim().split("\n").map(c => c.trim()).filter(Boolean).sort())
    } catch {
      setCountries([])
    }
  }

  async function selectCountry(country: string) {
    setSelectedCountry(country)
    setCities([])
    setCitySearch("")
    try {
      const raw = await execAsync(`nordvpn cities "${country}"`)
      setCities(raw.trim().split("\n").map(c => c.trim()).filter(Boolean).sort())
    } catch {
      setCities([])
    }
  }

  async function connect(country: string, city?: string) {
    setLoading(true)
    try {
      const cmd = city
        ? `nordvpn connect "${country}" "${city}"`
        : `nordvpn connect "${country}"`
      await execAsync(cmd)
      await refresh()
    } catch { }
    setLoading(false)
  }

  async function disconnect() {
    setLoading(true)
    try {
      await execAsync("nordvpn disconnect")
      await refresh()
    } catch { }
    setLoading(false)
  }

  refresh()
  loadCountries()

  GLib.timeout_add(GLib.PRIORITY_DEFAULT, 5000, () => { refresh(); return GLib.SOURCE_CONTINUE })

  return (
    <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["settings-content"]} spacing={6}>

      {/* Status card */}
      <box cssClasses={["settings-vpn-status-card"]} orientation={Gtk.Orientation.VERTICAL}>
        <box spacing={12}>
          <label cssClasses={status.as(s => s.connected ? ["settings-vpn-icon", "settings-vpn-icon-connected"] : ["settings-vpn-icon"])}
            label={status.as(s => s.connected ? "󰦝" : "󰦞")} />
          <box orientation={Gtk.Orientation.VERTICAL} hexpand valign={Gtk.Align.CENTER}>
            <label cssClasses={["settings-vpn-status-label"]}
              label={status.as(s => s.connected ? "Connected" : "Disconnected")} xalign={0} />
            <label cssClasses={["settings-vpn-status-sub"]}
              label={status.as(s => s.connected ? `${s.country} — ${s.city}` : "Not protected")}
              xalign={0} />
          </box>
          <button
            cssClasses={status.as(s => s.connected
              ? ["settings-vpn-connect-btn", "connected"]
              : ["settings-vpn-connect-btn"])}
            sensitive={loading.as(l => !l)}
            onClicked={() => status.peek().connected ? disconnect() : connect(status.peek().country || "United_States")}
          >
            <label label={loading.as(l => l ? "..." : status.peek().connected ? "Disconnect" : "Connect")} />
          </button>
        </box>

        {/* Connected details */}
        <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["settings-vpn-details"]}
          visible={status.as(s => s.connected)}>
          <box cssClasses={["settings-vpn-detail-row"]}>
            <label cssClasses={["settings-vpn-detail-key"]} label="IP" xalign={0} />
            <label cssClasses={["settings-vpn-detail-val"]} label={status.as(s => s.ip)} xalign={0} />
          </box>
          <box cssClasses={["settings-vpn-detail-row"]}>
            <label cssClasses={["settings-vpn-detail-key"]} label="Server" xalign={0} />
            <label cssClasses={["settings-vpn-detail-val"]} label={status.as(s => s.hostname)} xalign={0} ellipsize={3} maxWidthChars={28} />
          </box>
          <box cssClasses={["settings-vpn-detail-row"]}>
            <label cssClasses={["settings-vpn-detail-key"]} label="Uptime" xalign={0} />
            <label cssClasses={["settings-vpn-detail-val"]} label={status.as(s => s.uptime)} xalign={0} />
          </box>
        </box>
      </box>

      {/* Country view */}
      <box orientation={Gtk.Orientation.VERTICAL} spacing={6}
        visible={selectedCountry.as(c => c === "")}>

        <label cssClasses={["settings-section-title"]} label="Countries" xalign={0} />

        <box cssClasses={["settings-wifi-search"]}>
          <label cssClasses={["settings-search-icon"]} label="󰍉" />
          <entry cssClasses={["settings-search-entry"]} placeholderText="Search countries..." hexpand
            $={(self) => self.connect("notify::text", () => setSearch(self.text))} />
        </box>

        <scrolledwindow cssClasses={["settings-scroll"]} vexpand
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}>
          <box orientation={Gtk.Orientation.VERTICAL}>
            <For each={search.as(s =>
              countries.peek().filter(c => c.toLowerCase().includes(s.toLowerCase()))
            )}>
              {(country) => (
                <button
                  cssClasses={status.as(s => s.country === country
                    ? ["settings-vpn-country-row", "active"]
                    : ["settings-vpn-country-row"])}
                  onClicked={() => selectCountry(country)}
                >
                  <box spacing={10}>
                    <label cssClasses={["settings-vpn-country-icon"]} label="󰖓" />
                    <label cssClasses={["settings-vpn-country-name"]} label={country} hexpand xalign={0} />
                    <label cssClasses={["settings-vpn-country-icon"]} label="›" />
                  </box>
                </button>
              )}
            </For>
          </box>
        </scrolledwindow>
      </box>

      {/* City view */}
      <box orientation={Gtk.Orientation.VERTICAL} spacing={6}
        visible={selectedCountry.as(c => c !== "")}>

        {/* Header with back button */}
        <box spacing={8}>
          <button cssClasses={["settings-vpn-back-btn"]}
            onClicked={() => { setSelectedCountry(""); setSearch("") }}>
            <label label="‹ Back" />
          </button>
          <label cssClasses={["settings-section-title"]}
            label={selectedCountry.as(c => c.replace(/_/g, " "))} xalign={0} hexpand />
          <button
            cssClasses={["settings-vpn-connect-btn"]}
            sensitive={loading.as(l => !l)}
            onClicked={() => connect(selectedCountry.peek())}
          >
            <label label="Best" />
          </button>
        </box>

        <box cssClasses={["settings-wifi-search"]}>
          <label cssClasses={["settings-search-icon"]} label="󰍉" />
          <entry cssClasses={["settings-search-entry"]} placeholderText="Search cities..." hexpand
            $={(self) => self.connect("notify::text", () => setCitySearch(self.text))} />
        </box>

        <scrolledwindow cssClasses={["settings-scroll"]} vexpand
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}>
          <box orientation={Gtk.Orientation.VERTICAL}>
            <For each={citySearch.as(s =>
              cities.peek().filter(c => c.toLowerCase().includes(s.toLowerCase()))
            )}>
              {(city) => (
                <button
                  cssClasses={status.as(s =>
                    s.country === selectedCountry.peek() && s.city === city
                      ? ["settings-vpn-country-row", "active"]
                      : ["settings-vpn-country-row"])}
                  onClicked={() => connect(selectedCountry.peek(), city)}
                >
                  <box spacing={10}>
                    <label cssClasses={["settings-vpn-country-icon"]} label="󰍦" />
                    <label cssClasses={["settings-vpn-country-name"]} label={city} hexpand xalign={0} />
                    <label cssClasses={["settings-vpn-country-check"]} label="󰄬"
                      visible={status.as(s => s.country === selectedCountry.peek() && s.city === city)} />
                  </box>
                </button>
              )}
            </For>
          </box>
        </scrolledwindow>
      </box>

    </box>
  )
}

// ─── System Tab ──────────────────────────────────────────────

function SystemTab() {
  const POWER_PROFILES = [
    { id: "power-saver",  label: "Power Saver"  },
    { id: "balanced",     label: "Balanced"     },
    { id: "performance",  label: "Performance"  },
  ]

  const [gpuModes, setGpuModes]     = createState<string[]>([])
  const [gpuMode, setGpuMode]       = createState("")
  const [powerProfile, setPower]    = createState("")
  const [gpuMsg, setGpuMsg]         = createState("")

  async function refreshGpu() {
    try {
      const supported = await execAsync("supergfxctl -s")
      const modes = supported.replace(/[\[\]]/g, "").split(",").map(m => m.trim()).filter(Boolean)
      setGpuModes(modes)
      const current = await execAsync("supergfxctl -g")
      setGpuMode(current.trim())
    } catch { setGpuMode("") }
  }

  async function refreshPower() {
    try {
      const out = await execAsync("powerprofilesctl get")
      setPower(out.trim())
    } catch { setPower("") }
  }

  async function switchGpu(mode: string) {
    try {
      await execAsync(`supergfxctl -m ${mode}`)
      setGpuMode(mode)
      setGpuMsg("Logout required to apply")
    } catch { setGpuMsg("Failed to switch GPU mode") }
  }

  async function switchPower(profile: string) {
    try {
      await execAsync(`powerprofilesctl set ${profile}`)
      setPower(profile)
    } catch { }
  }

  refreshGpu()
  refreshPower()

  return (
    <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["settings-content"]} spacing={4} vexpand>

      <label cssClasses={["settings-section-title"]} label="GPU Mode" xalign={0} />
      <box cssClasses={["settings-slider-card"]} orientation={Gtk.Orientation.VERTICAL} spacing={6}>
        <box spacing={6}>
          <For each={gpuModes}>
            {(mode) => (
              <button
                hexpand
                cssClasses={gpuMode.as(m => m === mode
                  ? ["settings-option-pill", "active"]
                  : ["settings-option-pill"])}
                onClicked={() => switchGpu(mode)}
              >
                <label label={mode} halign={Gtk.Align.CENTER} hexpand />
              </button>
            )}
          </For>
        </box>
        <label
          cssClasses={["settings-vpn-status-sub"]}
          label={gpuMsg}
          xalign={0}
          visible={gpuMsg.as(m => m !== "")}
        />
      </box>

      <label cssClasses={["settings-section-title"]} label="Power Profile" xalign={0} />
      <box cssClasses={["settings-slider-card"]} spacing={6}>
        {POWER_PROFILES.map(({ id, label }) => (
          <button
            hexpand
            cssClasses={powerProfile.as(p => p === id
              ? ["settings-option-pill", "active"]
              : ["settings-option-pill"])}
            onClicked={() => switchPower(id)}
          >
            <label label={label} halign={Gtk.Align.CENTER} hexpand />
          </button>
        ))}
      </box>

    </box>
  )
}

// ─── Settings Window ─────────────────────────────────────────

type Tab = "audio" | "bluetooth" | "wifi" | "wallpaper" | "vpn" | "system"

export default function Settings(_gdkmonitor: Gdk.Monitor) {
  const [tab, setTab] = createState<Tab>("audio")

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: "audio",     icon: "󰕾", label: "Audio" },
    { id: "bluetooth", icon: "󰂯", label: "Bluetooth" },
    { id: "wifi",      icon: "󰤨", label: "WiFi" },
    { id: "wallpaper", icon: "󰸉", label: "Wallpaper" },
    { id: "vpn",       icon: "󰦝", label: "VPN"    },
    { id: "system",    icon: "󰍹", label: "System" },
  ]

  return (
    <window
      name="settings"
      application={app}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      $={(self) => {
        self.set_default_size(580, 580)
        self.set_resizable(false)
        const key = new Gtk.EventControllerKey()
        key.connect("key-pressed", (_: never, keyval: number) => {
          if (keyval === Gdk.KEY_Escape) { self.set_visible(false); return true }
          return false
        })
        self.add_controller(key)
      }}
    >
      <box cssClasses={["settings-window"]} widthRequest={580} heightRequest={580}>

        {/* Sidebar */}
        <box cssClasses={["settings-sidebar"]} orientation={Gtk.Orientation.VERTICAL} spacing={4}>
          <label cssClasses={["settings-sidebar-title"]} label="Settings" xalign={0} />
          {tabs.map(t => (
            <button
              cssClasses={tab.as(active => active === t.id
                ? ["settings-tab-btn", "active"]
                : ["settings-tab-btn"])}
              onClicked={() => setTab(t.id)}
            >
              <box spacing={10}>
                <label cssClasses={["settings-tab-icon"]} label={t.icon} />
                <label cssClasses={["settings-tab-label"]} label={t.label} />
              </box>
            </button>
          ))}
        </box>

        {/* Content */}
        <box cssClasses={["settings-main"]} hexpand vexpand orientation={Gtk.Orientation.VERTICAL}>
          <box vexpand visible={tab.as(t => t === "audio")}><AudioTab /></box>
          <box vexpand visible={tab.as(t => t === "bluetooth")}><BluetoothTab /></box>
          <box vexpand visible={tab.as(t => t === "wifi")}><WifiTab /></box>
          <box vexpand visible={tab.as(t => t === "wallpaper")}><WallpaperTab /></box>
          <box vexpand visible={tab.as(t => t === "vpn")}><VpnTab /></box>
          <box vexpand visible={tab.as(t => t === "system")}><SystemTab /></box>
        </box>

      </box>
    </window>
  )
}

export function SettingsButton() {
  return (
    <button cssClasses={["settings-bar-btn"]}
      onClicked={() => app.toggle_window("settings")}>
      <label label="󰒓" />
    </button>
  )
}
