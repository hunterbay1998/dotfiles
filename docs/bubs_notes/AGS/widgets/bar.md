# Bar

A bar is a window anchored to the top of the screen.

## Basic bar
```tsx
import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox />
    </window>
  )
}
```

## Key props
- `anchor` — pins the bar to the top, stretching left to right
- `exclusivity` — reserves space so windows don't go behind it
- `gdkmonitor` — which monitor to show it on
- `centerbox` — splits the bar into left, center, and right slots
