/* ==========================================
   BRIGHTNESS WIDGETS
   Includes: BrightnessSection
   ========================================== */

import { Gtk } from "ags/gtk4"
import { createState } from "ags"
import { execAsync } from "ags/process"

export function BrightnessSection() {
  const [percent, setPercent] = createState(100)

  return (
    <box cssClasses={["qs-brightness"]} orientation={Gtk.Orientation.VERTICAL}>
      <box cssClasses={["qs-brightness-header"]}>
        <label cssClasses={["qs-brightness-icon"]} label="󰃞" />
        <label hexpand cssClasses={["qs-brightness-label"]} label="Brightness" xalign={0} />
        <label cssClasses={["qs-brightness-percent"]} label={percent(v => `${v}%`)} />
      </box>
      <slider
        cssClasses={["qs-brightness-slider"]}
        hexpand
        drawValue={false}
        $={(self) => {
          self.set_range(0, 100)
          self.set_increments(5, 10)

          // Read current brightness on startup
          execAsync(["bash", "-c", "brightnessctl -m | cut -d, -f4 | tr -d %"])
            .then(out => {
              const current = parseInt(out.trim(), 10)
              if (!isNaN(current)) {
                self.set_value(current)
                setPercent(current)
              }
            })
            .catch(() => {})

          self.connect("value-changed", () => {
            const v = Math.round(self.get_value())
            setPercent(v)
            execAsync(["brightnessctl", "-q", "set", `${v}%`]).catch(() => {})
          })
        }}
      />
    </box>
  )
}
