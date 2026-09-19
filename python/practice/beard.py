#starting the script or exit
while True:
    greeter = input("Hello Bailey, would you like to update? (yes/no) ").strip().lower()

    if greeter == "yes":
        print("Let's update")
        break
    elif greeter == "no":
        print("Okay, no update.")
        break
    else:
        print("Please enter one of the options: yes or no")


while True:
    try:
        days = int(input("how many days has it been since you last shaved your beard? "))
    except ValueError:
        print("please enter a full number e.g 1 or 2")
    else:
        break

with open("beard_log.txt", "+a") as f:
    f.write(f"{days}\n")

print(f"saved {days} days without saving")
