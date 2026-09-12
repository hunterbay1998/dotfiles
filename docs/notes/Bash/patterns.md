# Common Bash Patterns

## 1. Capture command output
```bash
result=$(some_command)
```

## 2. Check if empty
```bash
if [[ -z "$result" ]]; then
    echo "nothing there"
fi
```

## 3. Check if file/dir exists
```bash
if [[ -f "$file" ]]; then   # file exists
if [[ -d "$dir" ]];  then   # directory exists
```

## 4. Loop over files
```bash
for file in ~/Pictures/Screenshots/*; do
    echo "$file"
done
```

## 5. Loop over command output
```bash
while read -r line; do
    echo "$line"
done < <(some_command)
```

## 6. Pipe into fzf and do something
```bash
pick=$(some_command | fzf)
[[ -z "$pick" ]] && exit 0
# do something with $pick
```

## 7. Check arguments
```bash
if [[ $# -eq 0 ]]; then
    echo "Usage: ./script.sh <arg>"
    exit 1
fi

thing=$1
```

## 8. String contains
```bash
if [[ "$string" == *"word"* ]]; then
    echo "found it"
fi
```
