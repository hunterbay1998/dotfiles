# Tray

Shows system tray icons. Each app in the tray gets its own menu button.

```tsx
import { For, createBinding } from "ags"
import Tray from "gi://AstalTray"

const tray = Tray.get_default()

function TrayItem({ item }: { item: Tray.TrayItem }) {
  return (
    <menubutton
      cssClasses={["tray-item"]}
      tooltipMarkup={createBinding(item, "tooltipMarkup")}
      $={(self) => {
        self.menuModel = item.menuModel
        self.insert_action_group("dbusmenu", item.actionGroup)
      }}
    >
      <image gicon={createBinding(item, "gicon")} />
    </menubutton>
  )
}

export default function TrayButton() {
  return (
    <For each={createBinding(tray, "items")}>
      {(item) => <TrayItem item={item} />}
    </For>
  )
}
```

## How it works
- `Tray.get_default()` — gets the system tray service
- `createBinding(tray, "items")` — watches for apps added/removed from the tray
- `<For>` — renders a button for each tray item
- `menuModel` and `actionGroup` — connects the app's right-click menu
