import app from "ags/gtk4/app"

export default function StatsButton() {
  return (
    <button cssClasses={["stats-button"]} onClicked={() => app.toggle_window("stats-menu")}>
      <label label="STATS" />
    </button>
  )
}
