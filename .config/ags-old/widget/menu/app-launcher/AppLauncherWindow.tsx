import app from "ags/gtk4/app"
import { createState, createBinding, createComputed, For } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import GLib from "gi://GLib"
import Apps from "gi://AstalApps?version=0.1"
import AstalMpris from "gi://AstalMpris?version=0.1"
import { execAsync } from "ags/process"
import { createPoll } from "ags/time"

const apps = new Apps.Apps({
  nameMultiplier: 2,
  executableMultiplier: 2,
})

const mpris = AstalMpris.Mpris.get_default()

function WeatherWidget() {
  const label = createPoll("", 600000, async () => {
    try {
      const out = await execAsync(["curl", "-sf", "wttr.in/?format=%c%t"])
      return out.trim()
    } catch {
      return ""
    }
  })

  return <label label={label} cssClasses={["launcher-weather"]} />
}

function MediaWidget() {
  const players = createBinding(mpris, "players")

  const firstPlayer = createComputed(() => {
    const p = players()
    return p.length > 0 ? [p[0]] : []
  })

  return (
    <box>
      <For each={firstPlayer}>
        {(player) => {
          const title = createBinding(player, "title")
          const artist = createBinding(player, "artist")
          const status = createBinding(player, "playbackStatus")

          const icon = createComputed(() =>
            status() === AstalMpris.PlaybackStatus.PLAYING ? "󰏤" : "󰐊"
          )

          const label = createComputed(() => {
            const t = title() || ""
            const a = artist() || ""
            if (a && t) return `${a} — ${t}`
            return t || a || ""
          })

          return (
            <box cssClasses={["launcher-media"]} spacing={6} halign={Gtk.Align.CENTER}>
              <button cssClasses={["media-btn"]} onClicked={() => player.previous()}>
                <label label="󰒮" />
              </button>
              <button cssClasses={["media-btn"]} onClicked={() => player.play_pause()}>
                <label label={icon} />
              </button>
              <button cssClasses={["media-btn"]} onClicked={() => player.next()}>
                <label label="󰒭" />
              </button>
              <label label={label} cssClasses={["media-label"]} ellipsize={3} maxWidthChars={25} />
            </box>
          )
        }}
      </For>
    </box>
  )
}

export default function AppLauncherWindow(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT } = Astal.WindowAnchor
  const [results, setResults] = createState<Apps.Application[]>([])
  const [query, setQuery] = createState("")
  let closeTimer = 0
  let entryRef: Gtk.Entry | null = null

  function launch(a: Apps.Application) {
    a.launch()
    app.toggle_window("app-launcher")
  }

  return (
    <window
      name="app-launcher"
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT}
      marginTop={5}
      marginLeft={8}
      application={app}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyVisible={(self) => {
        if (self.visible && entryRef) {
          setQuery("")
          setResults(apps.fuzzy_query("").slice(0, 20))
          entryRef.text = ""
          entryRef.grab_focus()
        }
      }}
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
      <box cssClasses={["launcher-box"]} orientation={Gtk.Orientation.VERTICAL} spacing={8}>
        <entry
          cssClasses={["launcher-search"]}
          placeholderText="Search apps..."
          $={(self: Gtk.Entry) => { entryRef = self }}
          onNotifyText={(self) => {
            setQuery(self.text)
            setResults(apps.fuzzy_query(self.text).slice(0, 20))
          }}
          onActivate={() => {
            const r = results()
            if (r.length > 0) launch(r[0])
          }}
        />
        <scrolledwindow
          cssClasses={["launcher-scroll"]}
          vexpand={false}
          heightRequest={400}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}
        >
          <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
            <For each={results}>
              {(a) => (
                <button cssClasses={["launcher-item"]} onClicked={() => launch(a)}>
                  <box spacing={10}>
                    <image iconName={a.iconName} pixelSize={24} />
                    <box orientation={Gtk.Orientation.VERTICAL} halign={Gtk.Align.START}>
                      <label label={a.name} cssClasses={["launcher-app-name"]} halign={Gtk.Align.START} />
                      {a.description ? (
                        <label
                          label={a.description}
                          cssClasses={["launcher-app-desc"]}
                          halign={Gtk.Align.START}
                          ellipsize={3}
                        />
                      ) : <box />}
                    </box>
                  </box>
                </button>
              )}
            </For>
          </box>
        </scrolledwindow>
        <box cssClasses={["qs-separator"]} />
        <MediaWidget />
        <box cssClasses={["qs-separator"]} />
        <WeatherWidget />
        <box cssClasses={["qs-separator"]} />
        <box cssClasses={["launcher-power"]} spacing={8} halign={Gtk.Align.CENTER}>
          <button cssClasses={["launcher-power-btn"]} onClicked={() => execAsync(["systemctl", "poweroff"])}>
            <label label="⏻" />
          </button>
          <button cssClasses={["launcher-power-btn"]} onClicked={() => execAsync(["systemctl", "reboot"])}>
            <label label="󰜉" />
          </button>
          <button cssClasses={["launcher-power-btn"]} onClicked={() => execAsync(["systemctl", "suspend"])}>
            <label label="󰤄" />
          </button>
          <button cssClasses={["launcher-power-btn"]} onClicked={() => execAsync(["hyprctl", "dispatch", "exit"])}>
            <label label="󰍃" />
          </button>
        </box>
      </box>
    </window>
  )
}
