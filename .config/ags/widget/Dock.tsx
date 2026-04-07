/* ==========================================
   DOCK
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import Apps from "gi://AstalApps"
import AstalHyprland from "gi://AstalHyprland"

const appsService = new Apps.Apps()
const hyprland = AstalHyprland.get_default()!

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

const HIDE_DELAY = 500
const TRIGGER_ZONE = 5 // px from bottom edge to trigger show

export default function Dock(gdkmonitor: Gdk.Monitor) {
  const { LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor
  let hideTimeout: ReturnType<typeof setTimeout> | null = null
  let dockWindow: Astal.Window

  const geo = gdkmonitor.get_geometry()
  const monitorBottom = geo.y + geo.height
  const monitorLeft = geo.x
  const monitorRight = geo.x + geo.width

  function clearTimer() {
    if (hideTimeout !== null) { clearTimeout(hideTimeout); hideTimeout = null }
  }

  function showDock() {
    clearTimer()
    dockWindow?.set_visible(true)
  }

  function hideDock() {
    hideTimeout = setTimeout(() => dockWindow?.set_visible(false), HIDE_DELAY)
  }

  // Show dock when cursor reaches the bottom edge of this monitor
  hyprland.connect("notify::cursor-position", () => {
    const { x, y } = hyprland.cursor_position
    if (x >= monitorLeft && x < monitorRight && y >= monitorBottom - TRIGGER_ZONE) {
      showDock()
    }
  })

  return (
    <window
      name="dock"
      gdkmonitor={gdkmonitor}
      anchor={LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.NORMAL}
      layer={Astal.Layer.OVERLAY}
      application={app}
      visible={false}
      $={(self) => {
        dockWindow = self
        const motion = new Gtk.EventControllerMotion()
        motion.connect("enter", clearTimer)
        motion.connect("leave", hideDock)
        self.add_controller(motion)
      }}
    >
      <box
        cssClasses={["dock"]}
        orientation={Gtk.Orientation.HORIZONTAL}
        halign={Gtk.Align.CENTER}
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
