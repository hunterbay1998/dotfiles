# Python Functions

## Defining a Function

```python
def greet(name):
    return f"Hello, {name}!"
```

---

## Built-in Functions

These are available anywhere in Python — no import needed.

### Input / Output
| Function | What it does |
|----------|--------------|
| `print()` | Print to the terminal |
| `input()` | Get text input from the user |

### Type Conversion
| Function | What it does |
|----------|--------------|
| `int()` | Convert to integer |
| `float()` | Convert to float |
| `str()` | Convert to string |
| `bool()` | Convert to True/False |
| `list()` | Convert to list |
| `tuple()` | Convert to tuple |
| `set()` | Convert to set |
| `dict()` | Convert to dictionary |

### Math / Numbers
| Function | What it does |
|----------|--------------|
| `abs()` | Absolute value |
| `round()` | Round a number |
| `min()` | Smallest value |
| `max()` | Largest value |
| `sum()` | Add up all values |
| `pow(x, y)` | x to the power of y |

### Sequences / Iteration
| Function | What it does |
|----------|--------------|
| `len()` | Length of a sequence |
| `range()` | Generate a sequence of numbers |
| `enumerate()` | Loop with index + value |
| `zip()` | Combine multiple iterables |
| `sorted()` | Return a sorted list |
| `reversed()` | Reverse an iterable |
| `map()` | Apply a function to each item |
| `filter()` | Filter items by a condition |

### Type Checking / Info
| Function | What it does |
|----------|--------------|
| `type()` | Get the type of a value |
| `isinstance()` | Check if value is a certain type |
| `id()` | Get the memory address of an object |
| `dir()` | List attributes/methods of an object |
| `help()` | Show documentation |

### Other Useful Ones
| Function | What it does |
|----------|--------------|
| `open()` | Open a file |
| `hasattr()` | Check if object has an attribute |
| `getattr()` | Get attribute by name |
| `setattr()` | Set attribute by name |
| `callable()` | Check if something is callable |
| `any()` | True if any item is truthy |
| `all()` | True if all items are truthy |

---

## Methods Commonly Used Inside Functions

### String Methods
```python
s = "hello world"

s.upper()         # "HELLO WORLD"
s.lower()         # "hello world"
s.strip()         # remove whitespace from both ends
s.split(" ")      # ["hello", "world"]
s.replace("o", "0")  # "hell0 w0rld"
s.startswith("he")   # True
s.endswith("ld")     # True
s.find("world")      # 6 (index)
s.count("l")         # 3
s.join(["a", "b"])   # "a hello world b" — joins with s as separator
```

### List Methods
```python
nums = [3, 1, 2]

nums.append(4)     # add to end
nums.insert(0, 0)  # insert at index
nums.remove(1)     # remove first match
nums.pop()         # remove + return last item
nums.sort()        # sort in place
nums.reverse()     # reverse in place
nums.index(2)      # find index of value
nums.count(3)      # count occurrences
nums.copy()        # shallow copy
nums.clear()       # empty the list
```

### Dictionary Methods
```python
d = {"a": 1, "b": 2}

d.get("a")         # 1 (safe — no error if missing)
d.get("z", 0)      # 0 (default value)
d.keys()           # all keys
d.values()         # all values
d.items()          # key-value pairs (good for looping)
d.update({"c": 3}) # merge another dict in
d.pop("a")         # remove + return value
d.setdefault("x", 0)  # set only if key doesn't exist
```

### Set Methods
```python
s = {1, 2, 3}

s.add(4)
s.remove(2)
s.discard(99)     # remove if exists, no error if not
s.union({4, 5})   # combine sets
s.intersection({2, 3, 4})  # shared items
s.difference({2})           # items only in s
```

---

## Useful Patterns

### Default Arguments
```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
```

### *args and **kwargs
```python
def add(*args):
    return sum(args)

def show(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")
```

### Lambda (anonymous function)
```python
double = lambda x: x * 2
double(5)  # 10
```

### Return multiple values
```python
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4, 1, 5])
```
