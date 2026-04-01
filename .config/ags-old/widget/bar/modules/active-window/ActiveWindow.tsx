import { createBinding, createComputed } from "ags"
import AstalHyprland from "gi://AstalHyprland?version=0.1"

const hyprland = AstalHyprland.Hyprland.get_default()

export default function ActiveWindow() {
  const focused = createBinding(hyprland, "focusedClient")

  const title = createComputed(() => {
    const client = focused()
    if (!client) return ""
    const t = client.title || client.class || ""
    return t.length > 40 ? t.slice(0, 40) + "…" : t
  })

  return <label cssClasses={["active-window"]} label={title} />
}
