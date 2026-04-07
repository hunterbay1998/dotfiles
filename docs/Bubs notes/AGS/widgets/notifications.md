# Notifications

Shows a popup for each notification. Auto-hides after a few seconds.

```tsx
import { For, createBinding } from "ags"
import AstalNotifd from "gi://AstalNotifd"

const notifd = AstalNotifd.get_default()

function Notification({ n }: { n: AstalNotifd.Notification }) {
  return (
    <box cssClasses={["notification"]} orientation={Gtk.Orientation.VERTICAL}>
      <label cssClasses={["summary"]} label={n.summary} />
      <label cssClasses={["body"]} label={n.body} />
      <button onClicked={() => n.dismiss()}>
        <label label="Close" />
      </button>
    </box>
  )
}

export default function Notifications() {
  const notifications = createBinding(notifd, "notifications")

  return (
    <box orientation={Gtk.Orientation.VERTICAL}>
      <For each={notifications}>
        {(n) => <Notification n={n} />}
      </For>
    </box>
  )
}
```

## How it works
- `AstalNotifd.get_default()` — gets the notification service
- `createBinding(notifd, "notifications")` — watches for new/removed notifications
- `<For>` — renders a box for each notification
- `n.summary` / `n.body` — the title and message of the notification
- `n.dismiss()` — removes the notification
