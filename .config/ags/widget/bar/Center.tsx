/* ==========================================
   CENTER BAR CONTENT
   ========================================== */

import Workspaces from "./center/Workspaces"

export default function CenterContent() {
  return (
    <box cssClasses={["bar-pill"]}>
      <Workspaces />
    </box>
  )
}
