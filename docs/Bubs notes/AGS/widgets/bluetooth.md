# Bluetooth

A toggle button that shows bluetooth state and toggles it on/off when clicked.

```tsx
import { createBinding } from "ags"
import AstalBluetooth from "gi://AstalBluetooth"

const bluetooth = AstalBluetooth.get_default()

export function BluetoothToggle() {
  const powered = createBinding(bluetooth.adapter, "powered")
  const connected = createBinding(bluetooth, "isConnected")

  return (
    <button
      cssClasses={powered.as(p => p ? ["qs-toggle", "active"] : ["qs-toggle"])}
      onClicked={() => { bluetooth.adapter.powered = !bluetooth.adapter.powered }}
    >
      <label label="󰂯" />
    </button>
  )
}
```

## How it works
- `AstalBluetooth.get_default()` — gets the bluetooth service
- `createBinding(bluetooth.adapter, "powered")` — watches if bluetooth is on or off
- `createBinding(bluetooth, "isConnected")` — watches if a device is connected
- `powered.as(...)` — adds `active` class when bluetooth is on
- `onClicked` — toggles bluetooth on/off
