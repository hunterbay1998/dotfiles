# Loops

## For loop
```bash
for i in 1 2 3 4 5; do
  echo $i
done
```

## For loop over a range
```bash
for i in {1..10}; do
  echo $i
done
```

## For loop over files
```bash
for file in ~/Documents/*; do
  echo $file
done
```

## While loop
```bash
count=0
while [ $count -lt 5 ]; do
  echo $count
  count=$((count + 1))
done
```

## Break out of a loop
```bash
for i in {1..10}; do
  if [ $i -eq 5 ]; then
    break
  fi
  echo $i
done
```

## Skip to next iteration
```bash
for i in {1..10}; do
  if [ $i -eq 5 ]; then
    continue
  fi
  echo $i
done
```
