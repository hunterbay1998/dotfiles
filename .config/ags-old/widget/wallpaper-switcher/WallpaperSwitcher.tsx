import app from "ags/gtk4/app"
import { Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import GLib from "gi://GLib?version=2.0"
import Gio from "gi://Gio?version=2.0"

const HOME = GLib.get_home_dir()
const WALLPAPER_DIR = `${HOME}/Pictures/Wallpaper`

function getWallpapers(): string[] {
  const images: string[] = []

  function scanDir(path: string) {
    const dir = Gio.File.new_for_path(path)
    const enumerator = dir.enumerate_children(
      "standard::name,standard::type",
      Gio.FileQueryInfoFlags.NONE,
      null,
    )

    let info = enumerator.next_file(null)
    while (info !== null) {
      const name = info.get_name()
      const type = info.get_file_type()
      const fullPath = `${path}/${name}`

      if (type === Gio.FileType.DIRECTORY) {
        scanDir(fullPath)
      } else if (/\.(png|jpg|jpeg|webp)$/i.test(name)) {
        images.push(fullPath)
      }

      info = enumerator.next_file(null)
    }
  }

  scanDir(WALLPAPER_DIR)
  return images.sort()
}

function setWallpaper(path: string) {
  execAsync(["hyprctl", "hyprpaper", "preload", path])
    .then(() => execAsync(["hyprctl", "monitors", "-j"]))
    .then((out) => {
      const monitors = JSON.parse(out) as Array<{ name: string }>
      return Promise.all(
        monitors.map((m) =>
          execAsync(["hyprctl", "hyprpaper", "wallpaper", `${m.name},${path}`]),
        )
      )
    })
    .catch(printerr)
}

app.start({
  main() {
    const wallpapers = getWallpapers()

    ;(
      <Gtk.Window
        title="Wallpaper Switcher"
        defaultWidth={420}
        defaultHeight={500}
        application={app}
        $={(self: Gtk.Window) => {
          const key = new Gtk.EventControllerKey()
          key.connect("key-pressed", (_: Gtk.EventControllerKey, keyval: number) => {
            if (keyval === Gdk.KEY_Escape) app.quit()
          })
          self.add_controller(key)
          self.present()
        }}
        onCloseRequest={() => {
          app.quit()
          return false
        }}
      >
        <Gtk.ScrolledWindow>
          <box orientation={Gtk.Orientation.VERTICAL}>
            {wallpapers.map((path) => {
              const label = path.replace(`${WALLPAPER_DIR}/`, "")
              return (
                <button
                  onClicked={() => {
                    setWallpaper(path)
                    app.quit()
                  }}
                >
                  <label label={label} halign={Gtk.Align.START} />
                </button>
              )
            })}
          </box>
        </Gtk.ScrolledWindow>
      </Gtk.Window>
    )
  },
})
