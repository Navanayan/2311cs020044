def calculate_square(n):
    return n * n
try:
    number = int(input("Enter a positive integer: "))
    if number <= 0:
        print("Please enter a positive integer.")
    else:
        result = calculate_square(number)
        print(f"The square of {number} is: {result}")

except ValueError:
    print("Invalid input. Please enter a valid positive integer.")