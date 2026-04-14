import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import { SideMenu } from "./widget/bar/right/SideMenu"
import { NotifMenu } from "./widget/bar/right/NotifMenu"
import Launcher from "./widget/Launcher"
import Dock from "./widget/Dock"
import OSD from "./widget/OSD"
import Settings from "./widget/Settings"
import NotifToast from "./widget/NotifToast"

app.start({
  css: style,
  main() {
    const monitors = app.get_monitors()
    monitors.map(Bar)
    monitors.map(Dock)
    OSD()
    SideMenu(monitors[0])
    NotifMenu(monitors[0])
    NotifToast(monitors[0])
    Launcher(monitors[0])
    Settings(monitors[0])
  },
})
