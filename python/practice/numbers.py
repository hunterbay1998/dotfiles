try:
    first = input(
            "select a number"
            "\n> "
            )
    second = input(
            "select another number"
            "\n> "
            )

    product = int(first) * int(second)

    print(f"your answer is {product} ")

except ValueError:
    print("please select a valid number")




