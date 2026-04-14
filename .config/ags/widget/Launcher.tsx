/* ==========================================
   APPLICATION LAUNCHER
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { autoHideOnLeave } from "./util"
import { For, createState } from "ags"
import Apps from "gi://AstalApps"

const appsService = new Apps.Apps()

export default function Launcher(_gdkmonitor: Gdk.Monitor) {
  const [query, setQuery] = createState("")
  const [selected, setSelected] = createState(0)
  let entryWidget: Gtk.Entry

  function getResults(q: string) {
    return appsService.fuzzy_query(q).slice(0, 20)
  }

  function hide() {
    setQuery("")
    setSelected(0)
    app.get_window("launcher")?.set_visible(false)
  }

  function execute() {
    const results = getResults(query.peek())
    const item = results[selected.peek()] ?? results[0]
    if (item) { item.launch(); hide() }
  }

  return (
    <window
      name="launcher"
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
      keymode={Astal.Keymode.ON_DEMAND}
      application={app}
      visible={false}
      marginTop={8}
      marginLeft={8}
      $={(self) => {
        autoHideOnLeave(self, 1000)
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
            setSelected(s => Math.min(s + 1, getResults(query.peek()).length - 1))
            return true
          }
          if (alt && keyval === Gdk.KEY_k) {
            setSelected(s => Math.max(s - 1, 0))
            return true
          }
          if (keyval === Gdk.KEY_Return) { execute(); return true }
          return false
        })
        self.add_controller(key)
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["launcher"]} widthRequest={340}>

        {/* Header */}
        <box cssClasses={["launcher-header"]} halign={Gtk.Align.FILL}>
          <label cssClasses={["launcher-title"]} label="Applications" hexpand xalign={0} />
          <label cssClasses={["launcher-hint"]} label="↵ launch  esc close" />
        </box>

        {/* Search entry with icon */}
        <box cssClasses={["launcher-entry-wrap"]}>
          <label cssClasses={["launcher-search-icon"]} label="󰍉" />
          <entry
            cssClasses={["launcher-entry"]}
            placeholderText="Search..."
            hexpand
            $={(self) => {
              entryWidget = self
              self.connect("notify::text", () => { setQuery(self.text); setSelected(0) })
            }}
          />
        </box>

        {/* Results */}
        <scrolledwindow
          cssClasses={["launcher-scroll"]}
          heightRequest={400}
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}
        >
          <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["launcher-results"]}>
            <For each={query.as(q => getResults(q))}>
              {(item, index) => (
                <button
                  cssClasses={selected.as(s => s === index() ? ["launcher-item", "selected"] : ["launcher-item"])}
                  onClicked={() => { item.launch(); hide() }}
                >
                  <box spacing={12}>
                    <box cssClasses={["launcher-icon-wrap"]}>
                      <image iconName={item.iconName} pixelSize={32} />
                    </box>
                    <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
                      <label cssClasses={["launcher-item-name"]} label={item.name} xalign={0} />
                      <label
                        cssClasses={["launcher-item-desc"]}
                        label={item.description ?? ""}
                        xalign={0}
                        visible={!!(item.description)}
                        maxWidthChars={36}
                        ellipsize={3}
                      />
                    </box>
                  </box>
                </button>
              )}
            </For>
          </box>
        </scrolledwindow>

        {/* Footer */}
        <box cssClasses={["launcher-footer"]}>
          <label
            cssClasses={["launcher-footer-label"]}
            label={query.as(q => {
              const n = getResults(q).length
              return n === 0 ? "No results" : `${n} app${n === 1 ? "" : "s"}`
            })}
            hexpand
            xalign={0}
          />
          <label cssClasses={["launcher-footer-label"]} label="alt+j/k navigate" />
        </box>

      </box>
    </window>
  )
}
