

x = ["Bailey", "John", "Jane"]


greater = input("what is your name? ")

for name in x:
    if greater == name:
        print("Hello, " + name + "!")
    
    elif greater != name:
        print("I don't know you,")
