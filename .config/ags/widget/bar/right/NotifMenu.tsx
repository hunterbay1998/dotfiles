/* ==========================================
   NOTIFICATION MENU
   Includes: NotifButton, NotifMenu
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding, For, createComputed } from "ags"
import { createPoll } from "ags/time"
import { autoHideOnLeave } from "../../util"
import Notifd from "gi://AstalNotifd"

const notifd = Notifd.get_default()

function NotifItem({ notif }: { notif: Notifd.Notification }) {
  return (
    <box cssClasses={["notif-item"]} orientation={Gtk.Orientation.VERTICAL}>

      {/* Header */}
      <box cssClasses={["notif-header"]}>
        <image
          cssClasses={["notif-app-icon"]}
          iconName={notif.appIcon || "dialog-information"}
          pixelSize={16}
        />
        <label
          cssClasses={["notif-app-name"]}
          label={notif.appName || "Unknown"}
          hexpand
          xalign={0}
        />
        <button
          cssClasses={["notif-dismiss"]}
          onClicked={() => notif.dismiss()}
        >
          <label label="󰅙" />
        </button>
      </box>

      {/* Summary */}
      <label
        cssClasses={["notif-summary"]}
        label={notif.summary || ""}
        xalign={0}
        ellipsize={3}
        maxWidthChars={30}
      />

      {/* Body */}
      <label
        cssClasses={["notif-body"]}
        label={notif.body || ""}
        xalign={0}
        wrap
        maxWidthChars={30}
        visible={!!notif.body}
      />

    </box>
  )
}

function EmptyNotifs() {
  return (
    <box cssClasses={["notif-empty"]} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} spacing={8}>
      <label cssClasses={["notif-empty-icon"]} label="󰂚" />
      <label cssClasses={["notif-empty-label"]} label="No notifications" />
    </box>
  )
}

export function NotifMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor
  const notifications = createBinding(notifd, "notifications")

  return (
    <window
      name="notif-menu"
      anchor={TOP | RIGHT}
      application={app}
      visible={false}
      $={(self) => autoHideOnLeave(self, 2000)}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["notif-menu"]} widthRequest={300}>

        {/* Top row */}
        <box cssClasses={["notif-menu-header"]}>
          <label cssClasses={["notif-menu-title"]} label="Notifications" hexpand xalign={0} />
          <button
            cssClasses={["notif-clear-btn"]}
            onClicked={() => notifd.get_notifications().forEach(n => n.dismiss())}
          >
            <label label="Clear all" />
          </button>
        </box>

        {/* Empty state */}
        <EmptyNotifs visible={notifications.as(list => list.length === 0)} />

        {/* List */}
        <scrolledwindow
          cssClasses={["notif-scroll"]}
          heightRequest={300}
          vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
          hscrollbarPolicy={Gtk.PolicyType.NEVER}
          visible={notifications.as(list => list.length > 0)}
        >
          <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["notif-list"]}>
            <For each={notifications}>
              {(n) => <NotifItem notif={n} />}
            </For>
          </box>
        </scrolledwindow>

      </box>
    </window>
  )
}

export default function NotifButton() {
  const notifications = createBinding(notifd, "notifications")
  const hasNotifs = notifications.as(list => list.length > 0)
  const count = notifications.as(list => list.length > 0 ? String(list.length) : "")
  const time = createPoll("", 1000, "date '+%H:%M'")

  return (
    <button
      cssClasses={["notif-clock-btn"]}
      onClicked={() => app.toggle_window("notif-menu")}
    >
      <box spacing={6}>
        <label cssClasses={["notif-clock-time"]} label={time} />
        <label cssClasses={["notif-clock-dot"]} label="●" visible={hasNotifs} />
        <label cssClasses={["notif-clock-count"]} label={count} visible={hasNotifs} />
      </box>
    </button>
  )
}
