import app from "ags/gtk4/app"
import { monitorFile } from "ags/file"
import { exec } from "ags/process"
import style from "./style/style.scss"
import Bar from "./widget/Bar"
import PowerMenu from "./widget/menu/PowerMenu"
import BatteryMenu from "./widget/menu/BatteryMenu"

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
    app.get_monitors().map(Bar)
    app.get_monitors().map(PowerMenu)
    app.get_monitors().map(BatteryMenu)

    monitorFile(stylePath, reloadCss)
  },
})
