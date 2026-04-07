# Variables

## Setting a variable
```bash
name="bailey"
```
No spaces around the `=`.

## Using a variable
```bash
echo $name
# output: bailey
```

## Common variables
```bash
age=21
file="/home/bailey/file.txt"
```

## Read user input into a variable
```bash
read name
echo "Hello $name"
```

## Command output into a variable
```bash
today=$(date)
echo $today
```
