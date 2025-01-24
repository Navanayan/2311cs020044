import pandas as pd

data = {
    'Name': ['John', 'Alice', 'Bob', 'Diana'],
    'Age': [28, 34, 23, 29],
    'Department': ['HR', 'IT', 'Marketing', 'Finance'],
    'Salary': [45000, 60000, 35000, 50000]
}

df = pd.DataFrame(data)

print(df.head(2))
print()

df['Bonus'] = df['Salary'] * 0.10
print(df)
print()

average_salary = df['Salary'].mean()
print(f"Average salary of employees: {average_salary}")
print()

older_than_25 = df[df['Age'] > 25]
print(older_than_25)