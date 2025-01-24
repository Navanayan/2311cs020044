import pandas as pd

# Load the CSV file into a DataFrame
df = pd.read_csv('Day_7_sales_data (1).csv')

# Task 1: Calculate the total sales for each region
total_sales_per_region = df.groupby('Region')['Sales'].sum()

# Task 2: Find the most sold product (based on quantity)
most_sold_product = df.groupby('Product')['Quantity'].sum().idxmax()

# Task 3: Compute the average profit margin for each product
df['Profit Margin'] = (df['Profit'] / df['Sales']) * 100
average_profit_margin_per_product = df.groupby('Product')['Profit Margin'].mean()

# Display the results
print("Total Sales Per Region:")
print(total_sales_per_region)

print("\nMost Sold Product (based on quantity):")
print(most_sold_product)

print("\nAverage Profit Margin Per Product:")
print(average_profit_margin_per_product)