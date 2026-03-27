# Tier 3 — Dynamic & Advanced

For UIs that change shape at runtime — notification centres,
dynamic workspace lists, app launchers.

---

## Pattern 9: Reactive Lists with `<For>`

When the list itself changes (items added/removed), use `<For>`.

```typescript
import { For, Accessor } from "ags"

let list: Accessor<Array<any>>

<box>
  <For each={list}>
    {(item, index: Accessor<number>) => (
      <label label={index(i => `${i}. ${item}`)} />
    )}
  </For>
</box>
```

> New items are **appended** — order is not kept.
> Always wrap `<For>` in a container `<box>` to avoid ordering issues.

vs `.map()`: use `.map()` for static lists, `<For>` for lists that change.

---

## Pattern 10: Nullable Unpacking with `<With>`

Render only when a reactive value is not null.

```typescript
import { With } from "ags"

<box>
  <With value={maybeNull}>
    {(value) => <label label={value.name} />}
  </With>
</box>
```

> Previous widget is removed and new one **appended** — wrap in a container.
> Prefer setting `visible` prop when you can. Use `<With>` when you need
> to unpack a nullable or access nested values.

---

## Pattern 11: Side Effects with `createEffect`

Run code whenever a dependency changes. Not for UI — for side effects.

```typescript
import { createEffect } from "ags"

createEffect(() => {
  console.log("count changed to", count())
})
```

The rule: any accessor called as a function inside the effect is tracked.
Use `.peek()` to read without tracking.

```typescript
createEffect(() => {
  // count is tracked, name is NOT tracked
  console.log(count(), name.peek())
})
```

> Use sparingly — most things should be `createComputed` + JSX binding.

---

## Lifecycle Hooks

```typescript
import { onCleanup, onMount } from "ags"

// runs when scope is disposed (widget destroyed)
onCleanup(() => { /* cleanup timers, listeners */ })

// runs after root scope returns
onMount(() => { /* initial setup */ })
```

---

## Edge Case Patterns (learn as needed)

### createMemo — computed that deduplicates

```typescript
import { createMemo } from "ags"

// only notifies downstream if the output actually changes
const memo = createMemo(() => value())
```

### createExternal — custom reactive source

```typescript
import { createExternal } from "ags"

const counter = createExternal(0, (set) => {
  const id = setInterval(() => set(v => v + 1), 1000)
  return () => clearInterval(id)  // cleanup
})
```

### createConnection — GObject signal as accessor

```typescript
import { createConnection } from "ags"

const value = createConnection(
  "initial",
  [obj, "signal-name", (arg, current) => newValue]
)
```

### Accessor interface

```typescript
accessor()              // read + track dependency
accessor.peek()         // read WITHOUT tracking
accessor.subscribe(cb)  // manual subscribe, returns dispose fn
```

---

## Try Building

- **Notification centre**: Use `Notifd` + `<For>` to render a dynamic list
- **App launcher**: Use `Apps` + `<entry>` + reactive filtered list
- **Workspace bar**: Use `Hyprland` + `<For>` for dynamic workspace buttons

---

## Quick Import Reference

```typescript
// app
import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"

// state
import { createState, createComputed, createBinding,
         createEffect, createMemo, createExternal,
         createConnection } from "ags"

// components
import { For, With, Accessor } from "ags"

// utilities
import { createPoll, interval, timeout, idle } from "ags/time"
import { exec, execAsync, subprocess } from "ags/process"
import { readFile, readFileAsync, writeFile, monitorFile } from "ags/file"

// GObject decorators
import GObject, { register, property } from "ags/gobject"

// GTK
import Gtk from "gi://Gtk"
import Gdk from "gi://Gdk"
import GLib from "gi://GLib"

// Astal libraries
import Hyprland from "gi://AstalHyprland"
import Wp from "gi://AstalWp"
import Network from "gi://AstalNetwork"
import Battery from "gi://AstalBattery"
import Bluetooth from "gi://AstalBluetooth"
import Mpris from "gi://AstalMpris"
import Notifd from "gi://AstalNotifd"
import Tray from "gi://AstalTray"
import Apps from "gi://AstalApps"
import PowerProfiles from "gi://AstalPowerProfiles"
```
