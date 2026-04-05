/* ==========================================
   APPLICATION LAUNCHER
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { For, createState, createBinding } from "ags"
import Apps from "gi://AstalApps"
import AstalHyprland from "gi://AstalHyprland"

const appsService = new Apps.Apps()
const hyprland = AstalHyprland.get_default()

const PAGES = ["Apps", "Kill"]

export default function Launcher(_gdkmonitor: Gdk.Monitor) {
  const [query, setQuery] = createState("")
  const [selected, setSelected] = createState(0)
  const [page, setPage] = createState(0)
  let entryWidget: Gtk.Entry

  function getAppResults(q: string) {
    return q.length > 0
      ? appsService.fuzzy_query(q).slice(0, 20)
      : appsService.fuzzy_query("").slice(0, 20)
  }

  function getClientResults(q: string) {
    const clients = hyprland.get_clients()
    if (q.length === 0) return clients.slice(0, 8)
    return clients.filter(c =>
      c.title.toLowerCase().includes(q.toLowerCase()) ||
      c.class.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 8)
  }

  function hide() {
    setQuery("")
    setSelected(0)
    app.get_window("launcher")?.set_visible(false)
  }

  function execute() {
    const p = page.peek()
    if (p === 0) {
      const results = getAppResults(query.peek())
      const item = results[selected.peek()] ?? results[0]
      if (item) { item.launch(); hide() }
    } else {
      const results = getClientResults(query.peek())
      const client = results[selected.peek()] ?? results[0]
      if (client) { hyprland.dispatch("closewindow", `address:${client.address}`); hide() }
    }
  }

  return (
    <window
      name="launcher"
      anchor={Astal.WindowAnchor.NONE}
      keymode={Astal.Keymode.ON_DEMAND}
      application={app}
      visible={false}
      $={(self) => {
        self.connect("notify::visible", () => {
          if (self.visible) {
            entryWidget.set_text("")
            entryWidget.grab_focus()
            setSelected(0)
          }
        })

        const key = new Gtk.EventControllerKey()
        key.connect("key-pressed", (_: never, keyval: number, _keycode: number, state: Gdk.ModifierType) => {
          const alt = (state & Gdk.ModifierType.ALT_MASK) !== 0
          if (keyval === Gdk.KEY_Escape) { hide(); return true }
          if (alt && keyval === Gdk.KEY_j) {
            const max = (page.peek() === 0 ? getAppResults(query.peek()) : getClientResults(query.peek())).length - 1
            setSelected(s => Math.min(s + 1, max))
            return true
          }
          if (alt && keyval === Gdk.KEY_k) {
            setSelected(s => Math.max(s - 1, 0))
            return true
          }
          if (alt && keyval === Gdk.KEY_l) {
            setPage(p => Math.min(p + 1, PAGES.length - 1))
            setSelected(0); setQuery(""); entryWidget.set_text("")
            return true
          }
          if (alt && keyval === Gdk.KEY_h) {
            setPage(p => Math.max(p - 1, 0))
            setSelected(0); setQuery(""); entryWidget.set_text("")
            return true
          }
          if (keyval === Gdk.KEY_Return) { execute(); return true }
          return false
        })
        self.add_controller(key)
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["launcher"]} widthRequest={320}>

        {/* Page tabs */}
        <box cssClasses={["launcher-tabs"]}>
          {PAGES.map((name, i) => (
            <button
              cssClasses={page.as(p => p === i ? ["launcher-tab", "active"] : ["launcher-tab"])}
              hexpand
              onClicked={() => { setPage(i); setSelected(0); setQuery(""); entryWidget.set_text("") }}
            >
              <label label={name} />
            </button>
          ))}
        </box>

        <entry
          cssClasses={["launcher-entry"]}
          placeholderText={page.as(p => p === 0 ? "Search apps..." : "Filter windows...")}
          $={(self) => {
            entryWidget = self
            self.connect("notify::text", () => { setQuery(self.text); setSelected(0) })
          }}
        />

        {/* Apps page */}
        <scrolledwindow
          cssClasses={["launcher-scroll"]}
          heightRequest={200}
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}
          visible={page.as(p => p === 0)}
        >
          <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["launcher-results"]}>
            <For each={query.as(q => getAppResults(q))}>
              {(item, index) => (
                <button
                  cssClasses={selected.as(s => s === index() ? ["launcher-item", "selected"] : ["launcher-item"])}
                  onClicked={() => { item.launch(); hide() }}
                >
                  <box spacing={10}>
                    <image iconName={item.iconName} pixelSize={28} />
                    <label label={item.name} xalign={0} />
                  </box>
                </button>
              )}
            </For>
          </box>
        </scrolledwindow>

        {/* Kill page */}
        <scrolledwindow
          cssClasses={["launcher-scroll"]}
          heightRequest={200}
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}
          visible={page.as(p => p === 1)}
        >
          <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["launcher-results"]}>
            <For each={query.as(q => getClientResults(q))}>
              {(client, index) => (
                <button
                  cssClasses={selected.as(s => s === index() ? ["launcher-item", "selected"] : ["launcher-item"])}
                  onClicked={() => { hyprland.dispatch("closewindow", `address:${client.address}`); hide() }}
                >
                  <box spacing={10}>
                    <label cssClasses={["launcher-kill-icon"]} label="󰅙" />
                    <box orientation={Gtk.Orientation.VERTICAL}>
                      <label label={client.title.length > 40 ? client.title.slice(0, 40) + "…" : client.title} xalign={0} />
                      <label cssClasses={["launcher-kill-class"]} label={client.class} xalign={0} />
                    </box>
                  </box>
                </button>
              )}
            </For>
          </box>
        </scrolledwindow>

      </box>
    </window>
  )
}
