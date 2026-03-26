import { createState, For } from "ags"
import Apps from "gi://AstalApps"
import Gtk from "gi://Gtk"
import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"

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
      anchor={TOP | BOTTOM | LEFT}
      exclusivity={Astal.Exclusivity.NORMAL}
      class="launcher"
      keymode={Astal.Keymode.ON_DEMAND}
    >
      <box orientation={Gtk.Orientation.VERTICAL} widthRequest={400}>
        <entry
          placeholderText="Search apps..."
            onNotifyText={(self) => {
              setResults(apps.fuzzy_query(self.text))
            }}
        />
        <For each={results}>
          {(a) => (
            <button onClicked={() => a.launch()}>
              <label label={a.name} />
            </button>
          )}
        </For>
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
