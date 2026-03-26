# Tier 2 — Connect to Your System

Now your bar reads real data — workspaces, volume, battery, network.
3 new patterns on top of Tier 1.

---

## Pattern 6: Binding

Bind to a GObject property. The UI updates when the property changes.

```typescript
import { createBinding } from "ags"

const volume = createBinding(speaker, "volume")

// use it like any accessor
<label label={volume(v => `${Math.round(v * 100)}%`)} />

// nested binding
const value = createBinding(outer, "nested", "field")
```

---

## Pattern 7: Library Singleton

Astal libraries give you system objects. The pattern is always:

```
import Thing from "gi://AstalThing"
const thing = Thing.get_default()
const prop = createBinding(thing, "propertyName")
```

Install everything on Arch:

```bash
yay -S libastal-meta
```

### Hyprland — workspaces & active window

```typescript
import Hyprland from "gi://AstalHyprland"

const hypr = Hyprland.get_default()
const workspaces = createBinding(hypr, "workspaces")
const focused = createBinding(hypr, "focusedWorkspace")

// list all window titles
for (const client of hypr.get_clients()) {
  print(client.title)
}
```

### WirePlumber — volume

```typescript
import Wp from "gi://AstalWp"

const wp = Wp.get_default()!
const speaker = wp.audio.default_speaker!
const volume = createBinding(speaker, "volume")

<slider value={volume} onChangeValue={(self) => {
  speaker.volume = self.value
}} />
```

> WirePlumber loads async — lists are empty at first. Listen for `ready` signal.

### Battery

```typescript
import Battery from "gi://AstalBattery"

const battery = Battery.get_default()
const percentage = createBinding(battery, "percentage")

<label label={percentage(p => `${Math.round(p * 100)}%`)} />
```

### Network

```typescript
import Network from "gi://AstalNetwork"

const network = Network.get_default()
const ssid = createBinding(network.wifi, "ssid")

<label label={ssid} />
```

### Bluetooth

```typescript
import Bluetooth from "gi://AstalBluetooth"

const bt = Bluetooth.get_default()
for (const device of bt.get_devices()) {
  print(device.name)
}
```

### Media (Mpris)

```typescript
import Mpris from "gi://AstalMpris"

const player = Mpris.Player.new("spotify")
// note: not get_default() — you create a player by name
if (player.available) print(player.title)
```

### System Tray

```typescript
import Tray from "gi://AstalTray"

const tray = Tray.get_default()
for (const item of tray.get_items()) {
  print(item.title)
}
```

### Notifications

```typescript
import Notifd from "gi://AstalNotifd"

const notifd = Notifd.get_default()
notifd.connect("notified", (_, id) => {
  const n = notifd.get_notification(id)
  print(n.summary, n.body)
})
```

### App Launcher

```typescript
import Apps from "gi://AstalApps"

// note: not get_default() — you create an instance
const apps = new Apps.Apps({
  nameMultiplier: 2,
  entryMultiplier: 0,
  executableMultiplier: 2,
})
for (const app of apps.fuzzy_query("firefox")) print(app.name)
```

### Power Profiles

```typescript
import PowerProfiles from "gi://AstalPowerProfiles"

const pp = PowerProfiles.get_default()
print(pp.activeProfile)
```

---

## Pattern 8: Poll & Subprocess

For things without an Astal library, shell out.

```typescript
import { createPoll } from "ags/time"
import { exec, execAsync, subprocess } from "ags/process"

// poll every second
const date = createPoll("", 1000, `bash -c "date +%H:%M"`)

// poll with a function
const date = createPoll("", 1000, () => new Date().toString())

// one-off command (prefer async)
const result = await execAsync("whoami")

// long-running process
subprocess("tail -f /tmp/log", (stdout) => {
  console.log(stdout)
})
```

> Commands run WITHOUT a shell — use `bash -c "..."` if you need pipes/env vars.
> Always prefer Astal libraries over polling/subprocesses.

---

## The Two Exceptions

Most libraries use `Thing.get_default()` but watch out for:

| Library | Init pattern                          |
|---------|---------------------------------------|
| Mpris   | `Mpris.Player.new("player-name")`     |
| Apps    | `new Apps.Apps({ ...options })`       |

Everything else is `.get_default()`.

---

## Try Building: A Live Bar

Take your Tier 1 bar and replace the static content:

- Left: Hyprland workspaces (bind to `hypr.workspaces`)
- Center: Clock (you already have this)
- Right: Volume slider + battery % + wifi SSID

When this feels natural, move to Tier 3.
