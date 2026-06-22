# Lists
> Chapters 3 & 4 — Python Crash Course

A list is an ordered collection of items. Items can be any type and a list can mix types.

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']
print(bicycles)
```

---

## Chapter 3 — Intro to Lists

### Accessing Items

Lists are **zero-indexed** — first item is `[0]`.

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']

print(bicycles[0])          # trek
print(bicycles[0].title())  # Trek
print(bicycles[-1])         # specialized  (last item)
print(bicycles[-2])         # redline      (second to last)
```

### Using Items in a Message

```python
message = f"My first bicycle was a {bicycles[0].title()}."
print(message)
# My first bicycle was a Trek.
```

---

### Modifying Items

```python
motorcycles = ['honda', 'yamaha', 'suzuki']
motorcycles[0] = 'ducati'
print(motorcycles)  # ['ducati', 'yamaha', 'suzuki']
```

### Adding Items

```python
motorcycles = ['honda', 'yamaha', 'suzuki']

# append — adds to the end
motorcycles.append('ducati')
print(motorcycles)  # ['honda', 'yamaha', 'suzuki', 'ducati']

# insert — adds at a specific index
motorcycles.insert(0, 'ducati')
print(motorcycles)  # ['ducati', 'honda', 'yamaha', 'suzuki']
```

### Removing Items

```python
motorcycles = ['honda', 'yamaha', 'suzuki', 'ducati']

# del — removes by index, value is gone
del motorcycles[0]
print(motorcycles)  # ['yamaha', 'suzuki', 'ducati']

# pop() — removes last item AND returns it so you can use it
popped_motorcycle = motorcycles.pop()
print(motorcycles)        # ['honda', 'yamaha']
print(popped_motorcycle)  # suzuki

# pop(index) — pop from any position
first = motorcycles.pop(0)
print(first)  # honda

# remove() — removes by value (only first match)
too_expensive = 'ducati'
motorcycles.remove(too_expensive)
print(motorcycles)
print(f"A {too_expensive.title()} is too expensive for me.")
```

> Use `del` when you don't need the value. Use `pop()` when you do.

---

### Organising a List

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']

# sort() — permanent, alphabetical
cars.sort()
print(cars)  # ['audi', 'bmw', 'subaru', 'toyota']

# sort(reverse=True) — permanent, reverse alphabetical
cars.sort(reverse=True)
print(cars)  # ['toyota', 'subaru', 'bmw', 'audi']

# sorted() — temporary, original list unchanged
print(sorted(cars))  # sorted version
print(cars)          # still original order

# reverse() — permanent, reverses current order
cars.reverse()
print(cars)

# len() — number of items
print(len(cars))  # 4
```

---

## Chapter 4 — Working with Lists

### Looping Through a List

```python
magicians = ['alice', 'david', 'carolina']
for magician in magicians:
    print(f"{magician.title()}, that was a great trick!")
    print(f"I can't wait to see your next trick, {magician.title()}.\n")

print("Thank you, everyone. That was a great magic show!")
```

> Everything indented inside the `for` loop runs once per item.
> The line after the loop (no indent) runs once when the loop is done.

---

### Making Numerical Lists with range()

```python
# range(stop) — 0 up to but not including stop
for value in range(5):
    print(value)   # 0, 1, 2, 3, 4

# range(start, stop)
for value in range(1, 6):
    print(value)   # 1, 2, 3, 4, 5

# range(start, stop, step)
even_numbers = list(range(2, 11, 2))
print(even_numbers)  # [2, 4, 6, 8, 10]

# build a list of squares
squares = []
for value in range(1, 11):
    squares.append(value**2)
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

### Simple Stats on a Number List

```python
digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

min(digits)  # 0
max(digits)  # 9
sum(digits)  # 45
```

---

### List Comprehensions

A shorter way to generate a list from a loop — one line instead of three.

```python
# long way
squares = []
for value in range(1, 11):
    squares.append(value**2)

# list comprehension — same result
squares = [value**2 for value in range(1, 11)]
print(squares)
```

---

### Slicing a List

A slice pulls out part of a list. The end index is **not included**.

```python
players = ['charles', 'martina', 'michael', 'florence', 'eli']

players[0:3]   # ['charles', 'martina', 'michael']
players[1:4]   # ['martina', 'michael', 'florence']
players[:3]    # first 3 — same as [0:3]
players[2:]    # from index 2 to end
players[-3:]   # last 3 items
```

### Looping Through a Slice

```python
print("Here are the first three players on my team:")
for player in players[:3]:
    print(player.title())
```

### Copying a List

```python
my_foods = ['pizza', 'falafel', 'carrot cake']

# correct way — slice copies the whole list
friend_foods = my_foods[:]

my_foods.append('cannoli')
friend_foods.append('ice cream')

print(my_foods)    # ['pizza', 'falafel', 'carrot cake', 'cannoli']
print(friend_foods) # ['pizza', 'falafel', 'carrot cake', 'ice cream']
```

> If you did `friend_foods = my_foods` instead, both variables point to the **same** list — changes to one affect both.

---

### Tuples

A tuple looks like a list but uses `()` and **cannot be changed** after creation.
Use a tuple when you want values to stay fixed.

```python
dimensions = (200, 50)
print(dimensions[0])  # 200
print(dimensions[1])  # 50

# looping works the same as a list
for dimension in dimensions:
    print(dimension)
```

You **cannot** change a value inside a tuple:
```python
dimensions[0] = 250  # TypeError!
```

But you **can** assign a new tuple to the variable:
```python
dimensions = (400, 100)
print(dimensions)  # (400, 100)
```

> A tuple with one item needs a trailing comma: `point = (3,)`
