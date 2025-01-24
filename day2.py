 # List Example

colors = ["red", "blue", "green", "yellow", "purple"]

print(colors[1])  
print(colors[3])  


colors[2] = "cyan" 
print(colors)  

print(colors[2:])

#Dictionary Example

# Creating a dictionary

person = {
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "profession": "Engineer",
    "hobby": "Photography"
}

print(person["name"])  
print(person["hobby"])  
print(person.get("age"))  
for key, value in person.items():
    print(f"{key}: {value}")

# Tuple Example
animals = ("lion", "tiger", "elephant", "giraffe", "zebra")


print(animals[0])  
print(animals[-1])  
print(animals[1:4])