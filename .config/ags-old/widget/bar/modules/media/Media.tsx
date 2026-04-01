import { createBinding, createComputed, For } from "ags"
import { Gtk } from "ags/gtk4"
import AstalMpris from "gi://AstalMpris?version=0.1"

const mpris = AstalMpris.Mpris.get_default()

function PlayerWidget({ player }: { player: AstalMpris.Player }) {
  const title = createBinding(player, "title")
  const artist = createBinding(player, "artist")
  const status = createBinding(player, "playbackStatus")

  const icon = createComputed(() =>
    status() === AstalMpris.PlaybackStatus.PLAYING ? "󰏤" : "󰐊"
  )

  const label = createComputed(() => {
    const t = title() || ""
    const a = artist() || ""
    if (a && t) return `${a} — ${t}`
    return t || a || ""
  })

  return (
    <box cssClasses={["media"]} spacing={6}>
      <button cssClasses={["media-btn"]} onClicked={() => player.previous()}>
        <label label="󰒮" />
      </button>
      <button cssClasses={["media-btn"]} onClicked={() => player.play_pause()}>
        <label label={icon} />
      </button>
      <button cssClasses={["media-btn"]} onClicked={() => player.next()}>
        <label label="󰒭" />
      </button>
      <label label={label} cssClasses={["media-label"]} ellipsize={3} maxWidthChars={30} />
    </box>
  )
}

export default function Media() {
  const players = createBinding(mpris, "players")

  const firstPlayer = createComputed(() => {
    const p = players()
    return p.length > 0 ? [p[0]] : []
  })

  return (
    <box>
      <For each={firstPlayer}>
        {(player) => <PlayerWidget player={player} />}
      </For>
    </box>
  )
}
