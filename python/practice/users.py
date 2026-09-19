import time

users = {
    "bailey": {
        "age": 28,
        "email": "bailey@email.com",
    },
    "paula": {
        "age": 49,
        "email": "paula@email.com",
    },
    "jason": {
        "age": 43,
        "email": "jason@email.com",
    },
    "colin": {
        "age": 69,
        "email": "colin@email.com",
    },
}

question = input(
        "would you like to see the users? (yes/no)\n"
        "> "
    ) 

if question == "yes" :
    print("\n--- Displaying Users ---")

    for name, details in users.items():
        print(f"Name {name.capitalize()} | Age: {details['age']} ")

elif question == "no":
    print("exiting program")

else:
    while True:
       user_status = input(
               "Enter 'exit' to close\n"
               "> "
               )

       if user_status == "exit":
           print("closing")
           break

       print("Condition not met please select from the options ")
       time.sleep(1)
