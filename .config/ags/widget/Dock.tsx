/* ==========================================
   DOCK
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import Apps from "gi://AstalApps"
import GLib from "gi://GLib"

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

const SHOW_ZONE   = 2   // px from bottom edge to trigger show
const HIDE_ZONE   = 80  // px from bottom before hiding
const SLIDE_DIST  = 80  // px to slide below screen when hidden

function findApp(name: string) {
  return appsService.fuzzy_query(name)[0] ?? null
}

export default function Dock(gdkmonitor: Gdk.Monitor) {
  const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor
  const screenHeight = gdkmonitor.get_geometry().height

  return (
    <window
      visible={false}
      name="dock"
      gdkmonitor={gdkmonitor}
      anchor={LEFT | RIGHT | BOTTOM}
      exclusivity={Astal.Exclusivity.NORMAL}
      marginBottom={-SLIDE_DIST}
      application={app}
      $={(self) => {
        let animTimer: number | null = null
        let hideTimer: ReturnType<typeof setTimeout> | null = null
        let isShown = false
        let currentMargin = -SLIDE_DIST

        function animateTo(end: number, onDone?: () => void) {
          if (animTimer !== null) { GLib.source_remove(animTimer); animTimer = null }
          const start = currentMargin
          const steps = 20
          let step = 0

          animTimer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 15, () => {
            step++
            const t = step / steps
            // ease out cubic
            const eased = 1 - Math.pow(1 - t, 3)
            currentMargin = start + (end - start) * eased
            self.marginBottom = Math.round(currentMargin)

            if (step >= steps) {
              currentMargin = end
              self.marginBottom = end
              animTimer = null
              onDone?.()
              return GLib.SOURCE_REMOVE
            }
            return GLib.SOURCE_CONTINUE
          })
        }

        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 100, () => {
          execAsync("hyprctl cursorpos").then(out => {
            const y = parseInt(out.split(",")[1]?.trim() ?? "0", 10)
            const nearBottom    = y >= screenHeight - SHOW_ZONE
            const farFromBottom = y < screenHeight - HIDE_ZONE

            if (nearBottom && !isShown) {
              if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
              isShown = true
              self.set_visible(true)
              animateTo(0)
            } else if (farFromBottom && isShown) {
              if (!hideTimer) {
                hideTimer = setTimeout(() => {
                  isShown = false
                  animateTo(-SLIDE_DIST, () => self.set_visible(false))
                  hideTimer = null
                }, 500)
              }
            } else if (nearBottom && hideTimer) {
              clearTimeout(hideTimer)
              hideTimer = null
              isShown = true
              animateTo(0)
            }
          })
          return GLib.SOURCE_CONTINUE
        })
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
