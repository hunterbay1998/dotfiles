import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import clock from "./widget/center/clock"

app.start({
  css: style,
  main() {
    app.get_monitors().map(Bar)
    app.get_monitors().map(clock)
  },
})
