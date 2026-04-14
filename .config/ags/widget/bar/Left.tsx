/* ==========================================
   LEFT BAR CONTENT
   ========================================== */

import app from "ags/gtk4/app"
import { SettingsButton } from "../Settings"

export default function LeftContent() {
  return (
    <box cssClasses={["bar-pill"]} marginStart={8}>
      <SettingsButton />
      <button cssClasses={["launcher-toggle"]} onClicked={() => app.toggle_window("launcher")}>
        <label label="󰍉" />
      </button>
    </box>
  )
}
