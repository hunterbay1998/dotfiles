# Tier 2 — Connect to Your System

Now your bar reads real data — workspaces, volume, battery, network.
3 new patterns on top of Tier 1.

---

## Pattern 6: Binding

Bind to a GObject property so the UI updates when that property changes.
GObject is the underlying object system GTK uses — Astal libraries expose it.

```typescript
import { createBinding } from "ags"

// createBinding(object, "propertyName")
// returns an accessor — use it exactly like createState
const volume = createBinding(speaker, "volume")

// transform it inline just like any other accessor
<label label={volume(v => `${Math.round(v * 100)}%`)} />

// you can also bind to nested properties
const value = createBinding(outer, "nested", "field")
```

> `createBinding` is like `createState` but the source of truth is a GObject
> property rather than something you set yourself.

---

## Pattern 7: Library Singletons

Astal libraries give you live system objects. The pattern is almost always:

```
import Thing from "gi://AstalThing"
const thing = Thing.get_default()
const prop = createBinding(thing, "propertyName")
```

Install all libraries at once on Arch:

```bash
paru -S libastal-meta
```

---

### Hyprland — workspaces & active window

```typescript
import Hyprland from "gi://AstalHyprland"

const hypr = Hyprland.get_default()

// bind to the full list of workspaces — updates as they're created/destroyed
const workspaces = createBinding(hypr, "workspaces")

// bind to whichever workspace is currently focused
const focused = createBinding(hypr, "focusedWorkspace")

// one-off read — list all open window titles right now
for (const client of hypr.get_clients()) {
  print(client.title)
}
```

---

### WirePlumber — volume

```typescript
import Wp from "gi://AstalWp"

const wp = Wp.get_default()!
const speaker = wp.audio.default_speaker!

// bind volume so the slider stays in sync with system volume
const volume = createBinding(speaker, "volume")

<slider value={volume} onChangeValue={(self) => {
  // write back to the system when the user drags
  speaker.volume = self.value
}} />
```

> WirePlumber loads async — device lists may be empty at startup.
> Listen for the `ready` signal before reading device lists.

---

### Battery

```typescript
import Battery from "gi://AstalBattery"

const battery = Battery.get_default()

// percentage is 0.0–1.0, so multiply by 100 for display
const percentage = createBinding(battery, "percentage")

<label label={percentage(p => `${Math.round(p * 100)}%`)} />
```

---

### Network

```typescript
import Network from "gi://AstalNetwork"

const network = Network.get_default()

// ssid is the name of the connected wifi network
const ssid = createBinding(network.wifi, "ssid")

<label label={ssid} />
```

---

### Bluetooth

```typescript
import Bluetooth from "gi://AstalBluetooth"

const bt = Bluetooth.get_default()

// one-off read — not a binding, just a snapshot
for (const device of bt.get_devices()) {
  print(device.name)
}
```

---

### Media (Mpris)

```typescript
import Mpris from "gi://AstalMpris"

// NOTE: Mpris is different — you create a player by name, not get_default()
const player = Mpris.Player.new("spotify")

if (player.available) print(player.title)
```

---

### System Tray

```typescript
import Tray from "gi://AstalTray"

const tray = Tray.get_default()

// one-off read of current tray items
for (const item of tray.get_items()) {
  print(item.title)
}
```

---

### Notifications

```typescript
import Notifd from "gi://AstalNotifd"

const notifd = Notifd.get_default()

// connect to the "notified" signal — fires whenever a notification arrives
notifd.connect("notified", (_, id) => {
  const n = notifd.get_notification(id)
  print(n.summary, n.body)
})
```

---

### App Launcher

```typescript
import Apps from "gi://AstalApps"

// NOTE: Apps is different too — you create an instance with scoring options
// these weights control how fuzzy_query ranks results
const apps = new Apps.Apps({
  nameMultiplier: 2,       // name matches score higher
  entryMultiplier: 0,      // ignore .desktop entry name
  executableMultiplier: 2, // executable name matches score higher
})

// fuzzy_query returns a ranked list of matching apps
for (const app of apps.fuzzy_query("firefox")) print(app.name)
```

---

### Power Profiles

```typescript
import PowerProfiles from "gi://AstalPowerProfiles"

const pp = PowerProfiles.get_default()
print(pp.activeProfile) // e.g. "balanced", "power-saver", "performance"
```

---

## Pattern 8: Poll & Subprocess

For things that don't have an Astal library — shell out instead.

```typescript
import { createPoll } from "ags/time"
import { exec, execAsync, subprocess } from "ags/process"

// poll a shell command every second
// NOTE: commands run WITHOUT a shell — wrap in bash -c if you need pipes
const date = createPoll("", 1000, `bash -c "date +%H:%M"`)

// poll with a JS function instead (no shell needed)
const date = createPoll("", 1000, () => new Date().toString())

// one-off async command — prefer this over sync exec
const result = await execAsync("whoami")

// long-running process — callback fires on each line of stdout
subprocess("tail -f /tmp/log", (stdout) => {
  console.log(stdout)
})
```

> Always prefer Astal libraries over polling/subprocesses when available.
> Libraries are more efficient and give you proper reactive bindings.

---

## The Two Exceptions

Most libraries use `Thing.get_default()` — but these two are different:

| Library | Why it's different | Init pattern |
|---------|--------------------|--------------|
| Mpris   | One instance per player app | `Mpris.Player.new("player-name")` |
| Apps    | Needs scoring config | `new Apps.Apps({ ...options })` |

Everything else is `.get_default()`.

---

## Try Building: A Live Bar

Take your Tier 1 bar and swap out the static content:

- **Left**: Hyprland workspaces — bind to `hypr.workspaces`, render each one as a button
- **Center**: Clock — you already have this from Tier 1
- **Right**: Volume slider + battery % + wifi SSID

When this feels natural, move to Tier 3.
