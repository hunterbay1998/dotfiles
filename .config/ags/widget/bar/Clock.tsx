import { createPoll } from "ags/time"

export default function clock() {
  const time = createPoll("",1000, "date '+%I:%M%p'")

  return <label label={time} />
}
