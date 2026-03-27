import { createComputed } from "ags"

// count is a number — but a label needs a string
// createComputed transforms one reactive value into another
const label = createComputed(() => count().toString())

// shorthand — does the exact same thing, just shorter
// read as: "take count, transform it with this function"
const label = count(c => c.toString())

// whenever count changes, label automatically recalculates
// you don't have to do anything — it just updates
