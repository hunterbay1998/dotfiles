# Battery

Shows a level bar and percentage. When charging, shows a lightning bolt instead.

```tsx
export default function Battery() {
  const battery = AstalBattery.get_default()
  const percent = createBinding(battery, "percentage")
  const charging = createBinding(battery, "charging")
  const cssClasses = createComputed(() =>
    charging() ? ["battery", "charging"] : getBatteryClass(percent())
  )

  return (
    <box cssClasses={cssClasses}>
      {/* charging — shows lightning bolt */}
      <label label="󱐋" visible={charging} />

      {/* not charging — shows level bar + percent */}
      <box visible={charging.as(c => !c)}>
        <levelbar value={percent} minValue={0} maxValue={1} />
        <label label={percent.as(p => `${Math.round(p * 100)}%`)} />
      </box>
    </box>
  )
}
```

## How it works
- `createBinding(battery, "percentage")` — watches battery level (0 to 1)
- `createComputed(() => ...)` — reads both bindings inside to pick the right CSS class
- `getBatteryClass` — returns a class like `low`, `medium`, `full` based on percentage
- `levelbar` — a GTK progress bar styled to look like a battery
