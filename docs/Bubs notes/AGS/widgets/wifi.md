# Wifi

Shows a button with a wifi icon that changes based on signal strength.

```tsx
import { createBinding } from "ags"
import Network from "gi://AstalNetwork"

const network = Network.get_default()
const wifi = network.wifi

function getWifiIcon(strength: number): string {
  if (strength >= 80) return "󰤨"
  if (strength >= 60) return "󰤥"
  if (strength >= 40) return "󰤢"
  if (strength >= 20) return "󰤟"
  return "󰤯"
}

export default function WifiButton() {
  const strength = createBinding(wifi, "strength")

  return (
    <button cssClasses={["wifi-button"]}>
      <label label={strength.as(getWifiIcon)} />
    </button>
  )
}
```

## How it works
- `Network.get_default()` — gets the network service
- `createBinding(wifi, "strength")` — watches signal strength (0-100)
- `strength.as(getWifiIcon)` — picks the right icon based on strength
