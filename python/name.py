name = ["bailey", "joe"]

greeter = input("Enter your name: ")

if greeter == name[0]:
    print(f"hello {name[0].capitalize()}, you are a king!")

elif greeter == name[1]:
    print(f"hello {name[1].capitalize()}, you are a pleb")

else:
    print("you are not in the list")

