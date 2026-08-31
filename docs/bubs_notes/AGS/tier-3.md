# Tier 3 — Dynamic & Advanced

For UIs that change shape at runtime — notification centres,
dynamic workspace lists, app launchers.

---

## Pattern 9: Reactive Lists with `<For>`

Use `<For>` when the list itself changes — items being added or removed.

```typescript
import { For, Accessor } from "ags"

// list must be an accessor — e.g. from createState or createBinding
let list: Accessor<Array<any>>

<box>
  {/* For re-renders items as the list changes */}
  <For each={list}>
    {/* item is a plain value, index is an Accessor<number> */}
    {(item, index: Accessor<number>) => (
      <label label={index(i => `${i}. ${item}`)} />
    )}
  </For>
</box>
```

> New items are **appended** — `<For>` does not preserve order.
> Always wrap `<For>` in a `<box>` to avoid ordering glitches.

**`<For>` vs `.map()`**

| | Use when |
|---|---|
| `.map()` | List is fixed — content may change, but items don't come and go |
| `<For>` | Items are added or removed at runtime |

---

## Pattern 10: Nullable Unpacking with `<With>`

Render only when a reactive value is not null — and get access to the unwrapped value.

```typescript
import { With } from "ags"

// maybeNull is an Accessor<T | null>
<box>
  {/* nothing is rendered while maybeNull() is null */}
  <With value={maybeNull}>
    {/* value here is T, not T | null — safely unwrapped */}
    {(value) => <label label={value.name} />}
  </With>
</box>
```

> Like `<For>`, replaced widgets are **appended** — wrap in a container.
> Prefer the `visible` prop for simple show/hide.
> Use `<With>` when you need to safely access properties on a nullable value.

---

## Pattern 11: Side Effects with `createEffect`

Run code whenever a dependency changes. This is for side effects — not for building UI.

```typescript
import { createEffect } from "ags"

// runs once immediately, then again whenever count() changes
createEffect(() => {
  console.log("count changed to", count())
})
```

> The rule: any accessor called as `accessor()` inside the effect is tracked.
> Use `.peek()` to read a value without tracking it as a dependency.

```typescript
createEffect(() => {
  // count changes will re-run this effect
  // name changes will NOT — .peek() reads without tracking
  console.log(count(), name.peek())
})
```

> Use `createEffect` sparingly. If you find yourself using it to update UI,
> reach for `createComputed` + JSX binding instead.

---

## Lifecycle Hooks

```typescript
import { onCleanup, onMount } from "ags"

// onCleanup — runs when the current scope is destroyed (widget removed)
// use this to cancel timers or disconnect signals
onCleanup(() => { /* cleanup */ })

// onMount — runs after the root scope finishes setting up
// use this for one-time initialisation that needs the widget to exist first
onMount(() => { /* setup */ })
```

---

## Edge Case Patterns — Learn as Needed

These come up occasionally. Don't memorise them now — come back when you need one.

### createMemo — computed that deduplicates

```typescript
import { createMemo } from "ags"

// like createComputed, but only notifies downstream if the output actually changed
// useful when the transform is expensive or downstream rerenders are costly
const memo = createMemo(() => value())
```

### createExternal — custom reactive source

```typescript
import { createExternal } from "ags"

// wrap any external event source (setInterval, GLib signal, etc.) into an accessor
const counter = createExternal(0, (set) => {
  const id = setInterval(() => set(v => v + 1), 1000)
  return () => clearInterval(id)  // return a cleanup function
})
```

### createConnection — GObject signal as accessor

```typescript
import { createConnection } from "ags"

// turn a GObject signal into a reactive accessor
// fires the transform whenever the signal fires, producing a new value
const value = createConnection(
  "initial",
  [obj, "signal-name", (arg, current) => newValue]
)
```

### Accessor interface

```typescript
accessor()              // read + register as dependency (use in JSX / computed)
accessor.peek()         // read WITHOUT registering as dependency
accessor.subscribe(cb)  // manually subscribe — returns a dispose function
```

---

## Try Building

- **Notification centre** — `Notifd` + `<For>` to render a live list of notifications
- **App launcher** — `Apps` + `<entry>` + a reactive filtered list that updates as you type
- **Workspace bar** — `Hyprland` + `<For>` for buttons that appear/disappear with workspaces

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

// GObject decorators (for creating your own GObject classes)
import GObject, { register, property } from "ags/gobject"

// GTK / GDK
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
