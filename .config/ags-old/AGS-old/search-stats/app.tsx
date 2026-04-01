import { createState, For } from "ags"
import Apps from "gi://AstalApps"
import Gtk from "gi://Gtk"
import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import { SysStats } from "./SysStats"

function Launcher() {
  const { TOP, BOTTOM, LEFT } = Astal.WindowAnchor
  
  const apps = new Apps.Apps({
    nameMultiplier: 2,
    executableMultiplier: 2, 
  })
  
  const [results, setResults] =
    createState<Apps.Application[]>([])
  

  return (
    <window
      name="launcher"
      namespace="launcher"
      anchor={TOP | BOTTOM | LEFT}
      exclusivity={Astal.Exclusivity.NORMAL}
      layer={Astal.Layer.OVERLAY}
      class="launcher"
      keymode={Astal.Keymode.ON_DEMAND}
    >
      <box orientation={Gtk.Orientation.VERTICAL} widthRequest={300}>
        <entry
          placeholderText="Search apps..."
            onNotifyText={(self) => {
              setResults(apps.fuzzy_query(self.text).slice(0, 10))
            }}
        />
        <scrolledwindow class="app-list" vexpand={false} heightRequest={300}>
          <box orientation={Gtk.Orientation.VERTICAL}>
            <For each={results}>
              {(a) => (
                <button onClicked={() => a.launch()}>
                  <box>
                    <image iconName={a.iconName} pixelSize={16} />
                    <label label={a.name} />
                  </box>
                </button>
              )}
            </For>
          </box>
        </scrolledwindow>
        <SysStats />
      </box>
    </window>  
  )
}

app.start({
  css: "./style.css",
  main() {
    app.add_window(Launcher())
  },
})
