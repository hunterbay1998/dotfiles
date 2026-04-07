# Clock

Uses `createPoll` to update the time every second and display it in a label.

```tsx
import { createPoll } from "ags/time"

export default function Clock() {
  const time = createPoll("", 1000, "date '+%H:%M'")
  
  return <label cssClasses={["clock"]} label={time} />
}
```

## How it works
- `createPoll` runs the shell command `date '+%H:%M'` every 1000ms (1 second)
- The result updates `time` automatically
- `label={time}` binds the label text to that value
