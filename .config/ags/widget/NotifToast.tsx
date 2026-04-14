/* ==========================================
   NOTIFICATION TOASTS
   Pop up on the right when a notification arrives,
   auto-dismiss after 5 seconds.
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createState, For } from "ags"
import Notifd from "gi://AstalNotifd"
import GLib from "gi://GLib"

const notifd = Notifd.get_default()

// List of notification IDs currently showing as toasts
const [toastIds, setToastIds] = createState<number[]>([])

function removeToast(id: number) {
  setToastIds((prev) => prev.filter(n => n !== id))
}

// New notification arrived
// `replaced` is true when this ID is replacing an existing notification
notifd.connect("notified", (_self: unknown, id: number, _replaced: boolean) => {
  setToastIds((prev) => [...prev.filter(n => n !== id), id])

  GLib.timeout_add(GLib.PRIORITY_DEFAULT, 5000, () => {
    removeToast(id)
    return GLib.SOURCE_REMOVE
  })
})

// Dismissed externally (e.g. from notif menu) — remove toast too
notifd.connect("resolved", (_self: unknown, id: number) => {
  removeToast(id)
})

function ToastItem({ id }: { id: number }) {
  const notif = notifd.get_notification(id)
  if (!notif) return <box />

  return (
    <box cssClasses={["toast-item"]} orientation={Gtk.Orientation.VERTICAL}>

      {/* Header row: icon + app name + dismiss */}
      <box cssClasses={["toast-header"]}>
        <image
          cssClasses={["toast-app-icon"]}
          iconName={notif.appIcon || "dialog-information"}
          pixelSize={16}
        />
        <label
          cssClasses={["toast-app-name"]}
          label={notif.appName || ""}
          hexpand
          xalign={0}
        />
        <button
          cssClasses={["toast-dismiss"]}
          onClicked={() => {
            removeToast(id)
            notif.dismiss()
          }}
        >
          <label label="󰅙" />
        </button>
      </box>

      {/* Summary */}
      <label
        cssClasses={["toast-summary"]}
        label={notif.summary || ""}
        xalign={0}
        ellipsize={3}
        maxWidthChars={34}
      />

      {/* Body (hidden if empty) */}
      <label
        cssClasses={["toast-body"]}
        label={notif.body || ""}
        xalign={0}
        wrap
        maxWidthChars={34}
        visible={!!notif.body}
      />

    </box>
  )
}

export default function NotifToast(_gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="notif-toast"
      anchor={TOP | RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      layer={Astal.Layer.OVERLAY}
      application={app}
      visible={toastIds.as(list => list.length > 0)}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["toast-container"]}>
        <For each={toastIds}>
          {(id) => <ToastItem id={id} />}
        </For>
      </box>
    </window>
  )
}
