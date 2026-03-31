import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/bar/Bar"
import DropMenuWindow from "./widget/menu/DropMenuWindow"
import StatsWindow from "./widget/menu/stats/StatsWindow"
import QuickSettingsWindow from "./widget/menu/quick-settings/QuickSettingsWindow"
import NotificationWindow from "./widget/menu/notifications/NotificationWindow"
import AppLauncherWindow from "./widget/menu/app-launcher/AppLauncherWindow"
import CalendarWindow from "./widget/menu/calendar/CalendarWindow"
import NotificationPopup from "./widget/menu/notifications/NotificationPopup"
import Gio from "gi://Gio"
import GLib from "gi://GLib"

function watchScss() {
  const configDir = `${GLib.get_home_dir()}/.config/ags`

  const scssFiles = [
    "style.scss",
  ]

  function reloadCss() {
    const launcher = new Gio.SubprocessLauncher({
      flags: Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE,
    })
    launcher.set_cwd(configDir)
    const proc = launcher.spawnv(["sass", "--no-source-map", "style.scss"])
    proc.communicate_utf8_async(null, null, (p, res) => {
      const [, stdout, stderr] = p!.communicate_utf8_finish(res)
      if (stderr?.trim()) return console.error("scss:", stderr)
      app.apply_css(stdout!, true)
      console.log("scss reloaded")
    })
  }

  return scssFiles.map(f => {
    const file = Gio.File.new_for_path(`${configDir}/${f}`)
    const monitor = file.monitor_file(Gio.FileMonitorFlags.NONE, null)
    monitor.connect("changed", (_m, _f, _o, event) => {
      if (event !== Gio.FileMonitorEvent.CHANGES_DONE_HINT) return
      reloadCss()
    })
    return monitor
  })
}

let scssMonitors: Gio.FileMonitor[]

app.start({
  css: style,
  main() {
    const monitors = app.get_monitors()
    console.log("monitors:", monitors.length)
    monitors.map(Bar)
    monitors.map(DropMenuWindow)
    monitors.map(StatsWindow)
    monitors.map(QuickSettingsWindow)
    monitors.map(NotificationWindow)
    monitors.map(NotificationPopup)
    monitors.map(AppLauncherWindow)
    monitors.map(CalendarWindow)
    scssMonitors = watchScss()
  },
})
