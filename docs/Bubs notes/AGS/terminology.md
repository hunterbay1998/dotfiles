# Terminology

## Variable
Stores a value so you can use it later.
```ts
const name = "bailey"
let age = 21
```
- `const` — value never changes
- `let` — value can change

## String
Text wrapped in quotes.
```ts
const greeting = "hello world"
```

## Number
A number value.
```ts
const count = 5
const price = 9.99
```

## Boolean
Either `true` or `false`.
```ts
const isVisible = true
const isHidden = false
```

## Array
A list of values.
```ts
const colours = ["red", "green", "blue"]
colours[0]  // "red" — starts at 0
```

## Object
A collection of named values.
```ts
const user = {
  name: "bailey",
  age: 21,
}
user.name  // "bailey"
```

## Function
A reusable block of code.
```ts
function greet(name) {
  return "hello " + name
}

greet("bailey")  // "hello bailey"
```

## Arrow function
A shorter way to write a function.
```ts
const greet = (name) => "hello " + name
```

## Return
Sends a value back out of a function.
```ts
const add = (a, b) => {
  return a + b
}
```

## If statement
Runs code only if a condition is true.
```ts
if (age > 18) {
  print("adult")
} else {
  print("not adult")
}
```
