def sum_of_even_numbers(n):
    if n < 1:
        return 0
    total = 0
    for num in range(2, n + 1, 2):
        total += num
    
    return total
try:
    n = int(input("Enter a positive integer: "))
    if n < 1:
        print("Please enter a positive integer greater than 0.")
    else:
        result = sum_of_even_numbers(n)
        print(f"The sum of all even numbers between 1 and {n} is: {result}")
except ValueError:
    print("Invalid input! Please enter a positive integer.")