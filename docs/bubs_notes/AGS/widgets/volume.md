# Volume

Shows a button with a volume icon. Icon changes based on mute state and level.

```tsx
import { createBinding } from "ags"
import Wp from "gi://AstalWp"

const speaker = Wp.get_default()!.audio.defaultSpeaker

function getVolumeIcon(mute: boolean, volume: number): string {
  if (mute || volume === 0) return "󰝟"
  if (volume < 0.33) return "󰕿"
  if (volume < 0.66) return "󰖀"
  return "󰕾"
}

export default function VolumeButton() {
  const mute = createBinding(speaker, "mute")

  return (
    <button cssClasses={["volume-button"]}>
      <label label={mute.as(m => getVolumeIcon(m, speaker.volume))} />
    </button>
  )
}
```

## How it works
- `Wp.get_default()!.audio.defaultSpeaker` — gets the current audio output
- `createBinding(speaker, "mute")` — watches mute state
- `mute.as(...)` — picks the right icon based on mute and volume level
