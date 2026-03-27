# Tier 1 — Build a Static Bar

Learn these 5 patterns and you can build a working bar with a clock,
buttons, and basic interactivity. No system integration yet.

---

## Pattern 1: Component

A widget is just a function that returns JSX.

```typescript
function MyButton() {
  return (
    <button onClicked={() => console.log("clicked")}>
      <label label="Click me" />
    </button>
  )
}
```

- lowercase = builtin widget (`<box>`, `<button>`, `<label>`)
- Capitalised = your component (`<MyButton />`)

Nest them like HTML:

```typescript
function MyBar() {
  return (
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

Create a value that the UI reacts to.

```typescript
import { createState } from "ags"

const [count, setCount] = createState(0)

count()              // read  (call as function)
setCount(5)          // write (set directly)
setCount(v => v + 1) // write (updater function)
```

---

## Pattern 3: Derived State

Transform one value into another. The UI updates automatically.

```typescript
import { createComputed } from "ags"

const label = createComputed(() => count().toString())

// shorthand — same thing:
const label = count(c => c.toString())
```

The rule: call accessors as functions `count()` to track them as dependencies.

---

## Pattern 4: Event Handler

Respond to user interaction.

```typescript
// button
<button onClicked={(self) => console.log("clicked")} />

// text input
<entry onNotifyText={(self) => console.log(self.text)} />

// switch
<switch active onNotifyActive={(self) => console.log(self.active)} />
```

Pattern: `on` + `SignalName` in camelCase.

---

## Pattern 5: Conditional & List Rendering

Show/hide things:

```typescript
// show if true
<box>{condition && <Widget />}</box>

// either/or
<box>{condition ? <A /> : <B />}</box>
```

Render a list:

```typescript
const items = ["one", "two", "three"]

<box>
  {items.map(item => <label label={item} />)}
</box>
```

---

## Widgets You'll Use

| Widget        | What it does             | Key props                         |
|---------------|--------------------------|-----------------------------------|
| `<window>`    | Root of everything       | `visible`, `monitor`, `anchor`    |
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

app.start({
  css: "/path/to/style.css",
  main() {
    Bar(0)
  },
})
```

---

## CSS Basics

```typescript
// class on a widget
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

GTK CSS is NOT web CSS — many properties differ.

---

## Try Building: A Static Bar

```typescript
import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import { createState, createComputed } from "ags"
import { createPoll } from "ags/time"

function Clock() {
  const time = createPoll("", 1000, () => new Date().toLocaleTimeString())
  return <label label={time} />
}

function Counter() {
  const [count, setCount] = createState(0)
  const label = count(c => `Clicked: ${c}`)

  return (
    <box>
      <label label={label} />
      <button onClicked={() => setCount(v => v + 1)}>+</button>
    </box>
  )
}

function Bar(monitor = 0) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  return (
    <window visible monitor={monitor} anchor={TOP | LEFT | RIGHT} class="bar">
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
    Bar(0)
  },
})
```

When this feels natural, move to Tier 2.
