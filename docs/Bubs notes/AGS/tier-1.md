# Tier 1 — Build a Static Bar

Learn these 5 patterns and you can build a working bar with a clock,
buttons, and basic interactivity. No system integration yet.

---

## Pattern 1: Component

A widget is just a function that returns JSX.

```typescript
function MyButton() {
  return (
    // onClicked is the event — more on events in Pattern 4
    <button onClicked={() => console.log("clicked")}>
      <label label="Click me" />
    </button>
  )
}
```

> **lowercase** = builtin GTK widget (`<box>`, `<button>`, `<label>`)
> **Capitalised** = your own component (`<MyButton />`)

Nest them like HTML:

```typescript
function MyBar() {
  return (
    // window is the root — everything lives inside one
    <window visible>
      <box>
        <MyButton />
        <MyButton />
      </box>
    </window>
  )
}
```

---

## Pattern 2: State

Create a value that the UI automatically reacts to when it changes.

```typescript
import { createState } from "ags"

// createState returns [getter, setter] — like a reactive variable
const [count, setCount] = createState(0)

count()              // read  — call it like a function
setCount(5)          // write — set to a fixed value
setCount(v => v + 1) // write — update based on current value (safer)
```

> Think of `count` like a live variable. Whenever you call `setCount`,
> anything in the UI that reads `count()` will update automatically.

---

## Pattern 3: Derived State

Transform one reactive value into another. The UI updates automatically.

```typescript
import { createComputed } from "ags"

// long form — explicit
const label = createComputed(() => count().toString())

// shorthand — call the accessor with a transform function (same result)
const label = count(c => c.toString())
```

> The rule: any accessor called as `count()` inside a computed is tracked
> as a dependency. When `count` changes, `label` recalculates.

---

## Pattern 4: Event Handler

Respond to user interaction.

```typescript
// button click — self is the button widget
<button onClicked={(self) => console.log("clicked")} />

// text input — fires whenever the text changes
<entry onNotifyText={(self) => console.log(self.text)} />

// toggle switch — fires when toggled
<switch active onNotifyActive={(self) => console.log(self.active)} />
```

> Pattern: `on` + signal name in camelCase.
> e.g. `notify::text` signal → `onNotifyText` prop

---

## Pattern 5: Conditional & List Rendering

Show/hide things based on state:

```typescript
// show only when condition is true
<box>{condition && <Widget />}</box>

// either/or — show A or B
<box>{condition ? <A /> : <B />}</box>
```

Render a static list:

```typescript
const items = ["one", "two", "three"]

// .map() works for lists that don't change
// for lists that grow/shrink at runtime, use <For> (see Tier 3)
<box>
  {items.map(item => <label label={item} />)}
</box>
```

---

## Widgets You'll Use

| Widget        | What it does             | Key props                         |
|---------------|--------------------------|-----------------------------------|
| `<window>`    | Root of everything       | `visible`, `gdkmonitor`, `anchor` |
| `<box>`       | Container (row/column)   | `orientation`, children           |
| `<centerbox>` | Start/center/end layout  | children use `$type="start"` etc  |
| `<label>`     | Text                     | `label`, `useMarkup`, `wrap`      |
| `<button>`    | Clickable                | `onClicked`                       |
| `<image>`     | Icon/image               | `iconName`, `file`                |
| `<revealer>`  | Show/hide with animation | `revealChild`, `transitionType`   |

---

## Entry Point

```typescript
import app from "ags/gtk4/app"

// app.start() boots the whole thing
// css: path to your stylesheet
// main: called once on startup — create your windows here
app.start({
  css: "/path/to/style.css",
  main() {
    app.get_monitors().map(Bar)
  },
})
```

---

## CSS Basics

```typescript
// attach a CSS class to any widget with the class prop
<box class="my-widget" />
```

```css
/* style.css */
window {
  background: transparent;
}

.my-widget {
  padding: 10px;
  background-color: #1e1e2e;
  color: #cdd6f4;
  border-radius: 8px;
}
```

> GTK CSS is NOT web CSS — many properties behave differently or don't exist.

---

## Try Building: A Static Bar

Type this out — don't copy-paste. It uses everything from Tier 1.

```typescript
import app from "ags/gtk4/app"
import { Astal, Gdk } from "ags/gtk4"
import { createState, createComputed } from "ags"
import { createPoll } from "ags/time"

// createPoll(initial, intervalMs, command or function)
// updates every 1000ms by calling the function
function Clock() {
  const time = createPoll("", 1000, () => new Date().toLocaleTimeString())
  return <label label={time} />
}

function Counter() {
  const [count, setCount] = createState(0)

  // shorthand derived state — transforms count into a string
  const label = count(c => `Clicked: ${c}`)

  return (
    <box>
      <label label={label} />
      {/* updater form is safer — always works off the latest value */}
      <button onClicked={() => setCount(v => v + 1)}>+</button>
    </box>
  )
}

function Bar(gdkmonitor: Gdk.Monitor) {
  // anchor pins the bar to the top edge, stretching left to right
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  return (
    <window visible gdkmonitor={gdkmonitor} anchor={TOP | LEFT | RIGHT} class="bar">
      {/* centerbox splits children into start / center / end */}
      <centerbox>
        <box $type="start">
          <Counter />
        </box>
        <box $type="center">
          <Clock />
        </box>
        <box $type="end">
          <label label="right side" />
        </box>
      </centerbox>
    </window>
  )
}

app.start({
  main() {
    app.get_monitors().map(Bar)
  },
})
```

When this feels natural to type from memory, move to [[tier-2]].
