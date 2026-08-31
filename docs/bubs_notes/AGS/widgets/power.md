# Power

A button that runs system power commands — shutdown, reboot, suspend.

```tsx
import { execAsync } from "ags/process"

export default function PowerButton() {
  return (
    <box>
      <button onClicked={() => execAsync("systemctl reboot")}>
        <label label="Restart" />
      </button>
      <button onClicked={() => execAsync("systemctl poweroff")}>
        <label label="Shutdown" />
      </button>
      <button onClicked={() => execAsync("systemctl suspend")}>
        <label label="Suspend" />
      </button>
    </box>
  )
}
```

## How it works
- `execAsync` — runs a shell command when clicked
- `systemctl reboot` — restarts the machine
- `systemctl poweroff` — shuts down
- `systemctl suspend` — sleeps
