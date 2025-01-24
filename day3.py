a = float(input("Enter marks for Maths: "))
b = float(input("Enter marks for Science: "))
c = float(input("Enter marks for Social: "))

average = (a + b + c) /3
print(average)
if average >= 90:
    print("Grade: A")
elif 80 <= average < 90:
    print("Grade: B")
elif 70 <= average < 80:
    print("Grade: C")
else:
    print("Grade: Fail")