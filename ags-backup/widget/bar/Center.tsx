/* ==========================================
   CENTER BAR CONTENT
   ========================================== */

import Clock from "./center/Clock"
import Workspaces from "./center/Workspaces"

export default function CenterContent() {
  return (
    <box cssClasses={["bar-pill"]}>
      <Clock />
      <Workspaces />
    </box>
  )
}
