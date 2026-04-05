import { Gdk, Astal, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";

function Test(gdkmonitor: Gdk.Monitor) {
const { NONE } = Astal.WindowAnchor

return (
  <window
    visible
    name="Test"
    class="Test"
    gdkmonitor={gdkmonitor}
    exclusivity={Astal.Exclusivity.NORMAL}
    anchor={ NONE }
    application={app}
  >
    <box orientation={Gtk.Orientation.VERTICAL}>
      <label label="Bubba is king haha" cssClasses={["box"]} />
    </box>
  </window>
  )
}

app.start({
  main() {
    app.get_monitors().map(Test)
  },
})
