/* ==========================================
   APPLICATION LAUNCHER
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { For, createState } from "ags"
import Apps from "gi://AstalApps"

const apps = new Apps.Apps()

export default function Launcher(_gdkmonitor: Gdk.Monitor) {
  const [query, setQuery] = createState("")
  let entryWidget: Gtk.Entry

  function hide() {
    setQuery("")
    app.get_window("launcher")?.set_visible(false)
  }

  function launchTop() {
    const results = apps.fuzzy_query(query.get())
    if (results[0]) {
      results[0].launch()
      hide()
    }
  }

  return (
    <window
      name="launcher"
      anchor={Astal.WindowAnchor.TOP}
      marginTop={100}
      keymode={Astal.Keymode.ON_DEMAND}
      application={app}
      visible={false}
      $={(self) => {
        self.connect("notify::visible", () => {
          if (self.visible) {
            entryWidget.set_text("")
            entryWidget.grab_focus()
          }
        })
      }}
      onKeyPressed={(_, key) => {
        if (key === Gdk.KEY_Escape) hide()
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["launcher"]} widthRequest={400}>
        <entry
          cssClasses={["launcher-entry"]}
          placeholderText="Search apps..."
          $={(self) => {
            entryWidget = self
            self.connect("notify::text", () => setQuery(self.text))
            self.connect("activate", launchTop)
          }}
        />
        <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["launcher-results"]}>
          <For each={query.as(q => q.length > 0 ? apps.fuzzy_query(q).slice(0, 8) : [])}>
            {(item) => (
              <button
                cssClasses={["launcher-item"]}
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
      </box>
    </window>
  )
}
