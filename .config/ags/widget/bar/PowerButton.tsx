import app from "ags/gtk4/app"

export default function PowerButton() {
  return (
    <button 
      cssClasses={["power-button"]}
      onClicked={() => app.toggle_window("power-menu")}
    >
      <label label="⏻" />
    </button>
  )
}
