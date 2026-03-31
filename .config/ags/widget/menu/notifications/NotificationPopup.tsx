import app from "ags/gtk4/app"
import { createComputed, createState, For } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import AstalNotifd from "gi://AstalNotifd?version=0.1"
import GLib from "gi://GLib"

const notifd = AstalNotifd.Notifd.get_default()

const [popups, setPopups] = createState<AstalNotifd.Notification[]>([])

notifd.connect("notified", (_self, id) => {
  const n = notifd.get_notification(id)
  if (!n) return
  setPopups([n, ...popups()])

  GLib.timeout_add(GLib.PRIORITY_DEFAULT, 4000, () => {
    setPopups(popups().filter(p => p.id !== id))
    return GLib.SOURCE_REMOVE
  })
})

notifd.connect("resolved", (_self, id) => {
  setPopups(popups().filter(p => p.id !== id))
})

function PopupItem({ n }: { n: AstalNotifd.Notification }) {
  return (
    <box cssClasses={["notif-popup-item"]} orientation={Gtk.Orientation.VERTICAL} spacing={2}>
      <box spacing={8}>
        <label label={n.appName || "Unknown"} cssClasses={["notif-app"]} halign={Gtk.Align.START} hexpand />
        <button cssClasses={["notif-dismiss"]} onClicked={() => n.dismiss()}>
          <label label="󰅖" />
        </button>
      </box>
      <label label={n.summary} cssClasses={["notif-summary"]} halign={Gtk.Align.START} wrap />
      {n.body ? (
        <label label={n.body} cssClasses={["notif-body"]} halign={Gtk.Align.START} wrap />
      ) : <box />}
    </box>
  )
}

export default function NotificationPopup(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const hasPopups = createComputed(() => popups().length > 0)

  return (
    <window
      name="notification-popup"
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      marginTop={5}
      marginRight={8}
      application={app}
      visible={hasPopups}
    >
      <box cssClasses={["notif-popup-box"]} orientation={Gtk.Orientation.VERTICAL} spacing={6}>
        <For each={popups}>
          {(n) => <PopupItem n={n} />}
        </For>
      </box>
    </window>
  )
}
