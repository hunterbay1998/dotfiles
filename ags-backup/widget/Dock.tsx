/* ==========================================
   DOCK
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createState } from "ags"
import Apps from "gi://AstalApps"

const appsService = new Apps.Apps()

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
  const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor
  const [revealed, setRevealed] = createState(false)

  return (
    <window
      visible
      name="dock"
      gdkmonitor={gdkmonitor}
      anchor={LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.NORMAL}
      layer={Astal.Layer.OVERLAY}
      application={app}
    >
      <box
        orientation={Gtk.Orientation.VERTICAL}
        $={(self) => {
          const motion = new Gtk.EventControllerMotion()
          motion.connect("enter", () => { print("enter fired"); setRevealed(true) })
          motion.connect("leave", () => { print("leave fired"); setRevealed(false) })
          self.add_controller(motion)
        }}
      >
        {/* Invisible strip at the bottom edge — keeps the box hoverable when dock is hidden */}
        <box heightRequest={8} hexpand />
        <revealer
          revealChild={revealed}
          transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
          transitionDuration={200}
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
        </revealer>
      </box>
    </window>
  )
}
