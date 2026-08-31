# Brightness

A slider that reads and controls screen brightness using `brightnessctl`.

```tsx
import { createState } from "ags"
import { execAsync } from "ags/process"

export function BrightnessSection() {
  const [percent, setPercent] = createState(100)

  return (
    <box>
      <label label="󰃞" />
      <label label={percent(v => `${v}%`)} />
      <slider
        $={(self) => {
          self.set_range(0, 100)

          // read current brightness on startup
          execAsync(["bash", "-c", "brightnessctl -m | cut -d, -f4 | tr -d %"])
            .then(out => {
              const current = parseInt(out.trim(), 10)
              self.set_value(current)
              setPercent(current)
            })

          // set brightness when slider moves
          self.connect("value-changed", () => {
            const v = Math.round(self.get_value())
            setPercent(v)
            execAsync(["brightnessctl", "-q", "set", `${v}%`])
          })
        }}
      />
    </box>
  )
}
```

## How it works
- `createState(100)` — stores the current brightness percentage
- `execAsync` on startup — reads current brightness from `brightnessctl`
- `value-changed` — fires when the slider moves, updates state and sets brightness
- `brightnessctl set ${v}%` — sets the actual screen brightness
