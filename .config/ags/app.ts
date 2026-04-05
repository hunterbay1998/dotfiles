import app from "ags/gtk4/app"
import { monitorFile } from "ags/file"
import { exec } from "ags/process"
import style from "./style/style.scss"
import { LeftBar, RightBar } from "./widget/Bar"
import { SideMenu } from "./widget/bar/right/SideMenu"
import Launcher from "./widget/Launcher"
import Dock from "./widget/Dock"

const stylePath = `${SRC}/style`
const scss = `${stylePath}/style.scss`
const css = `/tmp/ags-style.css`

function reloadCss() {
  exec(`sass ${scss} ${css}`)
  app.apply_css(css, true)
}

app.start({
  css: style,
  main() {
    app.get_monitors().map(LeftBar)
    app.get_monitors().map(RightBar)
    app.get_monitors().map(SideMenu)
    app.get_monitors().map(Launcher)
    app.get_monitors().map(Dock)

    monitorFile(stylePath, reloadCss)
  },
})
