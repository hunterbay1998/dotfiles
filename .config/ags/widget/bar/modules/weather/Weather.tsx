import { createPoll } from "ags/time"
import { execAsync } from "ags/process"

export default function Weather() {
  const label = createPoll("", 600000, async () => {
    try {
      const out = await execAsync(["curl", "-sf", "wttr.in/?format=%c%t"])
      return out.trim()
    } catch {
      return ""
    }
  })

  return <label cssClasses={["weather"]} label={label} />
}
