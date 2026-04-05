import app from "ags/gtk4/app"
import { monitorFile } from "ags/file"
import { exec } from "ags/process"
import style from "./style/style.scss"
import Bar from "./widget/Bar"
import { PowerMenu } from "./widget/bar/Power"
import { BatteryMenu } from "./widget/bar/Battery"
import { WifiMenu } from "./widget/bar/Wifi"
import { VolumeMenu } from "./widget/bar/Volume"
import { TrayMenu } from "./widget/bar/Tray"
import Launcher from "./widget/Launcher"

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
    app.get_monitors().map(WifiMenu)
    app.get_monitors().map(VolumeMenu)
    app.get_monitors().map(TrayMenu)
    app.get_monitors().map(Launcher)

    monitorFile(stylePath, reloadCss)
  },
})
