import pandas as pd

# Load the CSV file using Pandas
sales_data = pd.read_csv("Day_7_sales_data (1).csv")

# Display the first 5 rows of the dataset
print("First 5 rows of the dataset:")
print(sales_data.head())

# Display basic statistics of numerical columns using describe()
print("\nBasic statistics of numerical columns:")
print(sales_data.describe())

# Mean, Median, Min, and Max statistics
print("\nMean of numerical columns:")
print(sales_data.mean(numeric_only=True))

print("\nMedian of numerical columns:")
print(sales_data.median(numeric_only=True))

print("\nMinimum values of numerical columns:")
print(sales_data.min(numeric_only=True))

print("\nMaximum values of numerical columns:")
print(sales_data.max(numeric_only=True))