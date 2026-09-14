"""
LOOP DRILLS
===========

How to use this file:
  1. Work top to bottom. Each section builds on the one before it.
  2. Type your loop under the TODO. Do NOT copy-paste from earlier answers.
  3. Run the file after each exercise:  python loop_drills.py
  4. Compare against the EXPECTED comment. If it doesn't match, fix it before moving on.
  5. Stuck for more than 5 minutes? Put a print() inside the loop and watch each pass.

Rules while drilling:
  - No sum(), max(), min(), len() on the accumulator exercises. Build it by hand.
  - No list comprehensions until Section J. Long form first.
  - Delete your answers and redo the whole file a few days later. That's the part
    that actually cements it.
"""

# =============================================================================
# SECTION A - BASIC ITERATION
# The loop body runs once per item. The loop variable is ONE item, not the list.
# =============================================================================

names = ["ana", "ben", "cleo"]

# A1. Print each name on its own line.
# EXPECTED:
# ana
# ben
# cleo

##for name in names:
##    print(name)


# A2. Print the numbers 1 to 10.
# EXPECTED: 1 2 3 4 5 6 7 8 9 10 (each on its own line)

##for i in range(1, 11):
##    print(i)


# A3. Print 10 down to 1. (hint: range takes a third argument, the step)
# EXPECTED: 10 9 8 7 6 5 4 3 2 1

#for x in range(10, 0, -1):
#    print(x, end=" ")
#print()

# A4. Print every even number from 0 to 20 inclusive.
# EXPECTED: 0 2 4 6 8 10 12 14 16 18 20

#for x in range(0, 21, 2):
#    print(x, end=" ")
#print()


# A5. Print each character of the word "python" on its own line.
# A string is iterable too.
# EXPECTED: p y t h o n

#word: str = "python"

#for letter in word:
#    print(letter, end=" ")
#print()


# A6. Print the first letter of each name in `names`.
# EXPECTED: a b c

for name in names:
    print(name[0], end=" ")
print()

# A7. Print each name in uppercase. (hint: .upper())
# EXPECTED: ANA BEN CLEO

for name in names:
    print(name.upper(), end=" ")
print()

# =============================================================================
# SECTION B - THE ACCUMULATOR
# Create the variable BEFORE the loop. Update it INSIDE. Use it AFTER.
# This is the single most important loop pattern.
# =============================================================================

prices = [4, 7, 2, 9]

# B1. Add up all the prices into a variable called `total`, then print it.
# EXPECTED: 22

total = 0
for price in prices:
    total += price
print(total)

# B2. Count how many numbers in [3, 8, 12, 5, 6] are even.
# Start a counter at 0 and add 1 each time you find one.
# EXPECTED: 3


# B3. Multiply [2, 3, 4] together. Careful: what should the accumulator start at?
# EXPECTED: 24


# B4. Count the total number of characters across all of `names`.
# EXPECTED: 10


numbers = [12, 45, 7, 89, 23]

# B5. Find the largest number without using max().
# Start with `best = numbers[0]`, then compare each item and replace if bigger.
# EXPECTED: 89


# B6. Find the smallest number without using min().
# EXPECTED: 7


# B7. Count the vowels in "mississippi".
# hint: if char in "aeiou"
# EXPECTED: 4


# B8. Build a single string containing all of `names` joined by commas.
# Start with an empty string and add to it. (Yes, .join() exists. Do it by hand.)
# EXPECTED: ana,ben,cleo   (a trailing comma is acceptable on the first attempt)


# =============================================================================
# SECTION C - BUILDING A NEW LIST
# Same as an accumulator, but the thing you accumulate into is a list.
# Create empty list -> loop -> .append() -> print after.
# =============================================================================

# C1. Build a list of the capitalised names.
# EXPECTED: ['Ana', 'Ben', 'Cleo']


# C2. Build a list of the squares of 1 to 10.
# EXPECTED: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]


# C3. Build a list of every multiple of 3 from 1 to 50.
# EXPECTED: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48]


words = ["ana", "bella", "cleo", "dan"]

# C4. Build a list of only the words longer than 3 characters.
# EXPECTED: ['bella', 'cleo']


# C5. Build a list of the LENGTH of each word.
# EXPECTED: [3, 5, 4, 3]


# C6. Reverse `words` into a new list without using .reverse() or [::-1].
# hint: insert at the front, or loop backwards with range(len(words) - 1, -1, -1)
# EXPECTED: ['dan', 'cleo', 'bella', 'ana']


mixed = [3, -7, 12, -2, 0, 8]

# C7. Split `mixed` into two lists: `positives` and `negatives`. Zero goes in neither.
# EXPECTED positives: [3, 12, 8]
# EXPECTED negatives: [-7, -2]


# =============================================================================
# SECTION D - ENUMERATE AND ZIP
# enumerate gives you the index alongside the item.
# zip walks two lists in step.
# =============================================================================

# D1. Print a numbered list of `names` starting at 1.
# Watch out: enumerate starts at 0 by default.
# EXPECTED:
# 1. ana
# 2. ben
# 3. cleo


# D2. Do D1 again, but use enumerate(names, start=1) instead of adding 1 yourself.
# EXPECTED: same as D1


scores = [72, 51, 88]

# D3. Print each name with its score, using zip.
# EXPECTED:
# ana scored 72
# ben scored 51
# cleo scored 88


# D4. Using zip, print only the names that scored 60 or above.
# EXPECTED: ana, cleo


# D5. Using enumerate, find the INDEX of the largest number in `numbers`.
# EXPECTED: 3


# =============================================================================
# SECTION E - LOOPING OVER DICTS
# .items() gives you key and value together.
# .keys() and .values() give you one or the other.
# =============================================================================

grades = {"ana": 72, "ben": 51, "cleo": 88}

# E1. Print "ana scored 72" style lines using .items().
# EXPECTED: three lines, same as D3


# E2. Add up all the values in `grades`.
# EXPECTED: 211


# E3. Find the name with the highest score. Track both the best name AND the
# best score as you go.
# EXPECTED: cleo


# E4. Build a list of only the names who scored above 60.
# EXPECTED: ['ana', 'cleo']


# E5. Build a NEW dict where every score is increased by 5.
# EXPECTED: {'ana': 77, 'ben': 56, 'cleo': 93}


# E6. Build a dict from two lists using zip: `names` and `scores`.
# EXPECTED: {'ana': 72, 'ben': 51, 'cleo': 88}


# -----------------------------------------------------------------------------
# THE DICT COUNTER - the most reusable pattern in this file.
# Learn this one properly. It's behind word counts, log summaries, inventories.
#
#   counts[key] = counts.get(key, 0) + 1
#
# .get(key, 0) means "give me the current count, or 0 if this key is new".
# -----------------------------------------------------------------------------

# E7. Count how many times each letter appears in "mississippi".
# EXPECTED: {'m': 1, 'i': 4, 's': 4, 'p': 2}


sentence = "the cat sat on the mat the cat slept"

# E8. Count how many times each WORD appears. (hint: .split() first)
# EXPECTED: {'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1, 'slept': 1}


# E9. Using your E8 result, print only the words that appear more than once.
# EXPECTED: the, cat


animals = ["ant", "bear", "ape", "bat", "cow"]

# E10. Group the words by their first letter into a dict of lists.
# hint: if the letter isn't in the dict yet, create an empty list for it first.
# EXPECTED: {'a': ['ant', 'ape'], 'b': ['bear', 'bat'], 'c': ['cow']}


# =============================================================================
# SECTION F - BREAK, CONTINUE, AND FOR/ELSE
# break   - stop the loop entirely
# continue - skip to the next pass
# =============================================================================

# F1. Loop through `numbers` and print each one, but STOP as soon as you hit
# a number above 50.
# EXPECTED: 12 45


# F2. Loop through [1, 2, 3, 4, 5, 6] and print only the odd ones, using
# `continue` to skip the evens (not an if-block around the print).
# EXPECTED: 1 3 5


# F3. Search `names` for "ben". Print "found" and break when you get there.
# EXPECTED: found


# F4. Search `names` for "zoe". If the loop finishes without breaking, print
# "not found". Use a for/else - the `else` on a for loop runs only if the loop
# was never broken out of.
# EXPECTED: not found


# =============================================================================
# SECTION G - NESTED LOOPS
# A nested loop is just a loop whose body contains another loop.
# The inner loop runs completely, once per pass of the outer loop.
# =============================================================================

# G1. Print a 5x5 grid of # characters.
# hint: build each row as a string in the inner loop, print it in the outer.
# EXPECTED:
# #####
# #####
# #####
# #####
# #####


# G2. Print a left-aligned triangle, 5 rows tall.
# EXPECTED:
# *
# **
# ***
# ****
# *****


# G3. Print the times tables from 1x1 to 5x5, one row per number.
# EXPECTED:
# 1 2 3 4 5
# 2 4 6 8 10
# 3 6 9 12 15
# 4 8 12 16 20
# 5 10 15 20 25


grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

# G4. Add up every number in `grid`.
# EXPECTED: 45


# G5. Print only the numbers in `grid` that are even.
# EXPECTED: 2 4 6 8


# G6. Print every pair of names from `names` where the two are different.
# EXPECTED: 6 lines - ana/ben, ana/cleo, ben/ana, ben/cleo, cleo/ana, cleo/ben


# =============================================================================
# SECTION H - WHILE LOOPS
# `for` runs once per item in a known collection.
# `while` runs until a condition goes false. Use it when you don't know how
# many passes you'll need.
# =============================================================================

# H1. Count down from 5 to 1 using a while loop.
# EXPECTED: 5 4 3 2 1
# (If it prints forever, you forgot to change the variable inside the loop.)


# H2. Start at 1 and keep doubling until the value is over 100. Print each value.
# EXPECTED: 1 2 4 8 16 32 64 128


# H3. Add up 1 + 2 + 3 + ... until the running total goes over 50.
# Print the total and how many numbers it took.
# EXPECTED: total 55, took 10 numbers


# H4. Take the number 9384 and add up its digits using a while loop.
# hint: n % 10 gives the last digit, n // 10 chops it off.
# EXPECTED: 24


# =============================================================================
# SECTION I - PUTTING IT TOGETHER
# These look like the scripts you'd actually write. Each one needs two or three
# of the patterns above combined.
# =============================================================================

log_lines = [
    "ERROR disk full",
    "INFO started",
    "ERROR disk full",
    "WARN low memory",
    "ERROR timeout",
    "INFO stopped",
]

# I1. Count how many lines there are of each level (ERROR, INFO, WARN).
# hint: .split() each line, take the first part, then dict-counter it.
# EXPECTED: {'ERROR': 3, 'INFO': 2, 'WARN': 1}


# I2. Count how many times each full ERROR message appears. Ignore non-errors.
# EXPECTED: {'disk full': 2, 'timeout': 1}


receipt = [
    ("bread", 2, 1.20),
    ("milk", 1, 0.95),
    ("eggs", 3, 2.40),
]

# I3. For each item print "bread x2 = 2.40" style lines, then print the grand total.
# hint: you can unpack a tuple straight into the for statement:
#   for item, qty, price in receipt:
# EXPECTED:
# bread x2 = 2.40
# milk x1 = 0.95
# eggs x3 = 7.20
# TOTAL: 10.55


# I4. Find the duplicates in [3, 1, 4, 1, 5, 9, 2, 6, 5, 3].
# hint: count them first, then loop the counts.
# EXPECTED: [3, 1, 5] (any order)


packages = [
    "firefox 141.0-1 -> 142.0-1",
    "linux 6.15.2-1 -> 6.16.0-1",
    "vim 9.1.1-1 -> 9.1.2-1",
]

# I5. Print a numbered list showing just the package names and their new versions.
# This is your pacman script's output, done properly.
# EXPECTED:
# 1. firefox -> 142.0-1
# 2. linux -> 6.16.0-1
# 3. vim -> 9.1.2-1


# I6. Write a function `count_words(text)` that takes a string and returns a
# dict of word counts. Then call it on `sentence` and print the result.
# This is E8 wrapped in a function - which is how you'd actually reuse it.
# EXPECTED: same as E8


# =============================================================================
# SECTION J - COMPREHENSIONS
# ONLY do this section once everything above feels automatic.
# A comprehension is a compressed version of the build-a-list pattern.
#
#   squares = []                  becomes    squares = [n * n for n in range(1, 11)]
#   for n in range(1, 11):
#       squares.append(n * n)
# =============================================================================

# J1. Redo C1 (capitalised names) as a one-line comprehension.
# EXPECTED: ['Ana', 'Ben', 'Cleo']


# J2. Redo C3 (multiples of 3 up to 50) as a comprehension with an `if` at the end.
# EXPECTED: same as C3


# J3. Redo C5 (word lengths) as a comprehension.
# EXPECTED: [3, 5, 4, 3]


# J4. Redo E5 (scores plus 5) as a DICT comprehension:
#   {key: value for key, value in grades.items()}
# EXPECTED: {'ana': 77, 'ben': 56, 'cleo': 93}


# =============================================================================
# WHEN YOU'RE DONE
# =============================================================================
# Go back to B5, E7 and G1 and redo them from a blank line without looking.
# Those three cover tracking-a-best, the dict counter, and nesting - which is
# most of what loops are for.
#
# Then delete every answer in this file, wait three days, and do it again.
