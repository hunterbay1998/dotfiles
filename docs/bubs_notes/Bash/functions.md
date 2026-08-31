# Functions

## Basic function
```bash
greet() {
  echo "hello"
}

greet  # call it
```

## Function with arguments
```bash
greet() {
  echo "hello $1"
}

greet bailey  # output: hello bailey
```
`$1` is the first argument, `$2` is the second, and so on.

## Function with a return value
```bash
add() {
  echo $(( $1 + $2 ))
}

result=$(add 3 5)
echo $result  # output: 8
```

## Multiple arguments
```bash
info() {
  echo "name: $1, age: $2"
}

info bailey 21
```
