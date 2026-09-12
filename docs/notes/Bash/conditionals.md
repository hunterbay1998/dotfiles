# Conditionals

## Basic if statement
```bash
if [ "$name" = "bailey" ]; then
  echo "hey bailey"
fi
```

## if / else
```bash
if [ "$age" -gt 18 ]; then
  echo "adult"
else
  echo "not adult"
fi
```

## if / elif / else
```bash
if [ "$age" -lt 13 ]; then
  echo "child"
elif [ "$age" -lt 18 ]; then
  echo "teenager"
else
  echo "adult"
fi
```

## Comparison operators
| Operator | Meaning |
|----------|---------|
| `-eq` | equal to |
| `-ne` | not equal to |
| `-gt` | greater than |
| `-lt` | less than |
| `-ge` | greater than or equal |
| `-le` | less than or equal |
| `=` | string equal |
| `!=` | string not equal |
