# Workspaces

Shows 5 workspace buttons. The active one gets a `focused` class. Clicking switches to that workspace.

```tsx
import { createBinding } from "ags"
import Hyprland from "gi://AstalHyprland"

const hyprland = Hyprland.get_default()

export default function Workspaces() {
  const focused = createBinding(hyprland, "focusedWorkspace")

  return (
    <box cssClasses={["workspaces"]}>
      {[1, 2, 3, 4, 5].map(id => (
        <button
          cssClasses={focused.as(fw => fw?.id === id ? ["workspace", "focused"] : ["workspace"])}
          onClicked={() => hyprland.dispatch("workspace", String(id))}
        >
          <label label={String(id)} />
        </button>
      ))}
    </box>
  )
}
```

## How it works
- `createBinding(hyprland, "focusedWorkspace")` — watches which workspace is active
- `.map()` — creates a button for each workspace 1-5
- `focused.as(...)` — checks if this button's id matches the active one, adds `focused` class if so
- `hyprland.dispatch("workspace", ...)` — switches workspace on click
