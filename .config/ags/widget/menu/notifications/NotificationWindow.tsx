import app from "ags/gtk4/app"
import { createBinding, For } from "ags"
import { Astal, Gdk, Gtk } from "ags/gtk4"
import AstalNotifd from "gi://AstalNotifd?version=0.1"
import GLib from "gi://GLib"

let closeTimer = 0

const notifd = AstalNotifd.Notifd.get_default()

function timeAgo(unixTime: number): string {
  const now = GLib.get_real_time() / 1_000_000
  const diff = Math.floor(now - unixTime)
  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function NotificationItem({ n }: { n: AstalNotifd.Notification }) {
  return (
    <box cssClasses={["notif-item"]} orientation={Gtk.Orientation.VERTICAL} spacing={2}>
      <box spacing={8}>
        <label label={n.appName || "Unknown"} cssClasses={["notif-app"]} halign={Gtk.Align.START} hexpand />
        <label label={timeAgo(n.time)} cssClasses={["notif-time"]} halign={Gtk.Align.END} />
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

export default function NotificationWindow(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const notifications = createBinding(notifd, "notifications")

  return (
    <window
      name="notification-menu"
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      marginTop={5}
      marginRight={8}
      application={app}
      visible={false}
      keymode={Astal.Keymode.ON_DEMAND}
      onNotifyIsActive={(self) => {
        if (!self.isActive) {
          closeTimer = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
            if (!self.isActive) self.visible = false
            closeTimer = 0
            return GLib.SOURCE_REMOVE
          })
        } else if (closeTimer) {
          GLib.source_remove(closeTimer)
          closeTimer = 0
        }
      }}
    >
      <box cssClasses={["notif-box"]} orientation={Gtk.Orientation.VERTICAL} spacing={6}>
        <box spacing={8}>
          <label label="Notifications" cssClasses={["notif-title"]} halign={Gtk.Align.START} hexpand />
          <button
            cssClasses={["notif-clear-btn"]}
            onClicked={() => {
              notifd.get_notifications().forEach(n => n.dismiss())
            }}
          >
            <label label="Clear All" />
          </button>
        </box>
        <scrolledwindow
          vexpand
          heightRequest={300}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}
        >
          <box orientation={Gtk.Orientation.VERTICAL} spacing={4}>
            <For each={notifications}>
              {(n) => <NotificationItem n={n} />}
            </For>
          </box>
        </scrolledwindow>
      </box>
    </window>
  )
}
