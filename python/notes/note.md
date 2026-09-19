# Python Dictionaries

## Methods

### .keys()
- Returns all the keys in a dict

### .values()
- Returns all the values in a dict

### .items()
- Returns each key and value together as a `(key, value)` pair

## Example

```python
os_errors = {
    "linux": 2,
    "windows": 10,
    "mac_os": 5
}

print(list(os_errors.keys()))    # ['linux', 'windows', 'mac_os']
print(list(os_errors.values()))  # [2, 10, 5]
print(list(os_errors.items()))   # [('linux', 2), ('windows', 10), ('mac_os', 5)]

for os_name, count in os_errors.items():
    print(os_name, count)
```
