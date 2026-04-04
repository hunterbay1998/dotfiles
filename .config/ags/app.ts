import app from "ags/gtk4/app"
import style from "./style/style.scss"
import Bar from "./widget/Bar"
import PowerMenu from "./widget/menu/PowerMenu"
import BatteryMenu from "./widget/menu/BatteryMenu"

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar)
    app.get_monitors().map(PowerMenu)
    app.get_monitors().map(BatteryMenu)
   },
})
