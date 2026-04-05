/* ==========================================
   DOCK
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createState } from "ags"
import Apps from "gi://AstalApps"

const appsService = new Apps.Apps()

// Edit this list to change your pinned apps
const PINNED = [
  "kitty",
  "chromium",
  "steam",
  "code",
  "discord",
  "spotify",
  "obsidian",
]

function findApp(name: string) {
  return appsService.fuzzy_query(name)[0] ?? null
}

export default function Dock(gdkmonitor: Gdk.Monitor) {
  const { LEFT, TOP, BOTTOM } = Astal.WindowAnchor
  const [visible, setVisible] = createState(false)
  let timeout: ReturnType<typeof setTimeout> | null = null

  function show() {
    if (timeout !== null) { clearTimeout(timeout); timeout = null }
    setVisible(true)
  }

  function hide() {
    timeout = setTimeout(() => setVisible(false), 500)
  }

  return (
    <window
      name="dock"
      gdkmonitor={gdkmonitor}
      anchor={LEFT | TOP | BOTTOM}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={app}
      visible
    >
      <box
        cssClasses={visible.as(v => v ? ["dock"] : ["dock", "dock-hidden"])}
        orientation={Gtk.Orientation.VERTICAL}
        valign={Gtk.Align.CENTER}
        $={(self) => {
          const motion = new Gtk.EventControllerMotion()
          motion.connect("enter", show)
          motion.connect("leave", hide)
          self.add_controller(motion)
        }}
      >
        {PINNED.map(name => {
          const entry = findApp(name)
          if (!entry) return null
          return (
            <button
              cssClasses={["dock-item"]}
              tooltipText={entry.name}
              onClicked={() => entry.launch()}
            >
              <image iconName={entry.iconName} pixelSize={36} />
            </button>
          )
        })}
      </box>
    </window>
  )
}
