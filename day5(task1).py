n = int(input("Enter a positive integer: "))
if n <= 0:
    print("Please enter a positive integer.")
else:
    print("Numbers from 1 to", n, ":")
    for i in range(1, n + 1):
        print(i)
    total_sum = 0
    counter = 1
    while counter <= n:
        total_sum += counter
        counter += 1
    print("The sum of all numbers from 1 to", n, "is:", total_sum)