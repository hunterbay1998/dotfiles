/* ==========================================
   BRIGHTNESS WIDGETS
   Includes: BrightnessSection
   ========================================== */

import { Gtk } from "ags/gtk4"
import { createState } from "ags"

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
          self.set_value(100)
          self.connect("value-changed", () => {
            setPercent(Math.round(self.get_value()))
          })
        }}
      />
    </box>
  )
}
