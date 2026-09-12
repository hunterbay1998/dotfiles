# sed

sed edits files from the terminal without opening them.

## Find and replace in a file
```bash
sed -i 's/old/new/g' file.txt
```
- `-i` — edit the file in place
- `s/old/new/g` — replace all occurrences of `old` with `new`
- Without `-i` it just prints the result without changing the file

## Replace only the first occurrence
```bash
sed -i 's/old/new/' file.txt
```

## Delete a line containing text
```bash
sed -i '/text/d' file.txt
```

## Print a specific line
```bash
sed -n '5p' file.txt
```

## Preview changes before applying
```bash
sed 's/old/new/g' file.txt
```
Leave out `-i` to see the output without changing anything.
