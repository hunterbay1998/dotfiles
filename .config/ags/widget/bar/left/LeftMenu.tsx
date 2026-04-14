/* ==========================================
   LEFT MENU
   Includes: LeftMenuButton, LeftMenu
   ========================================== */

import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding, createComputed, For } from "ags"
import { autoHideOnLeave } from "../../util"
import Mpris from "gi://AstalMpris"

const mpris = Mpris.get_default()

function MediaPlayer({ player }: { player: Mpris.Player }) {
  const title      = createBinding(player, "title")
  const artist     = createBinding(player, "artist")
  const coverArt   = createBinding(player, "coverArt")
  const status     = createBinding(player, "playbackStatus")
  const position   = createBinding(player, "position")
  const length     = createBinding(player, "length")

  const playIcon = status.as(s =>
    s === Mpris.PlaybackStatus.PLAYING ? "󰏤" : "󰐊"
  )

  const progress = createComputed([position, length], (pos, len) =>
    len > 0 ? pos / len : 0
  )

  return (
    <box cssClasses={["media-player"]} orientation={Gtk.Orientation.VERTICAL}>

      {/* Cover art + info */}
      <box cssClasses={["media-top"]} spacing={12}>
        <image
          cssClasses={["media-cover"]}
          file={coverArt.as(c => c ?? "")}
          widthRequest={64}
          heightRequest={64}
        />
        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER} hexpand>
          <label
            cssClasses={["media-title"]}
            label={title.as(t => t || "Nothing playing")}
            xalign={0}
            ellipsize={3}
            maxWidthChars={22}
          />
          <label
            cssClasses={["media-artist"]}
            label={artist.as(a => a || "")}
            xalign={0}
            ellipsize={3}
            maxWidthChars={22}
          />
        </box>
      </box>

      {/* Progress bar */}
      <box cssClasses={["media-progress-box"]}>
        <levelbar
          cssClasses={["media-progress"]}
          hexpand
          heightRequest={3}
          valign={Gtk.Align.CENTER}
          value={progress}
          minValue={0}
          maxValue={1}
        />
      </box>

      {/* Controls */}
      <box cssClasses={["media-controls"]} halign={Gtk.Align.CENTER} spacing={8}>
        <button cssClasses={["media-btn"]} onClicked={() => player.previous()}>
          <label label="󰒮" />
        </button>
        <button cssClasses={["media-btn", "media-play"]} onClicked={() => player.play_pause()}>
          <label label={playIcon} />
        </button>
        <button cssClasses={["media-btn"]} onClicked={() => player.next()}>
          <label label="󰒭" />
        </button>
      </box>

    </box>
  )
}

function NoMedia() {
  return (
    <box cssClasses={["media-empty"]} halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER}>
      <label cssClasses={["media-empty-icon"]} label="󰝚" />
      <label cssClasses={["media-empty-label"]} label="No media playing" />
    </box>
  )
}

export function LeftMenu(_gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT } = Astal.WindowAnchor
  const players = createBinding(mpris, "players")

  return (
    <window
      name="left-menu"
      anchor={TOP | LEFT}
      application={app}
      visible={false}
      $={(self) => autoHideOnLeave(self, 2000)}
    >
      <box orientation={Gtk.Orientation.VERTICAL} cssClasses={["left-menu"]} widthRequest={280}>
        {players.as(list =>
          list.length > 0
            ? list.map(p => <MediaPlayer player={p} />)
            : [<NoMedia />]
        )}
      </box>
    </window>
  )
}

export default function LeftMenuButton() {
  return (
    <button
      cssClasses={["left-menu-button"]}
      onClicked={() => app.toggle_window("left-menu")}
    >
      <label label="󰝚" />
    </button>
  )
}
