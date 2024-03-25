import os
import mysql.connector
import json

# Get the current directory path
current_dir = os.path.dirname(__file__)

# Path to the JSON file
json_file_path = os.path.join(current_dir, 'address_data.json')

# Connect to MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="address_book"
)

# Print a message when connected successfully
if db.is_connected():
    print("Connected to the database.")

# Create a cursor object to execute SQL queries
cursor = db.cursor()

# Function to insert countries, cities, and addresses from JSON data
def insert_data_from_json():
    with open(json_file_path, 'r') as file:
        data = json.load(file)
        countries = data['countries']
        for country in countries:
            country_name = country['name']
            largest_city = country['largest_city']
            popular_address = country['popular_address']
            
            # Insert country
            cursor.execute("INSERT INTO country (country_name) VALUES (%s)", (country_name,))
            db.commit()
            
            # Get the inserted country ID
            cursor.execute("SELECT LAST_INSERT_ID()")
            country_id = cursor.fetchone()[0]
            
            # Insert city
            cursor.execute("INSERT INTO city (city_name, country_id) VALUES (%s, %s)", (largest_city, country_id))
            db.commit()

            # Get the inserted city ID
            cursor.execute("SELECT LAST_INSERT_ID()")
            city_id = cursor.fetchone()[0]
            
            # Insert address
            cursor.execute("INSERT INTO address (street_address, city_id) VALUES (%s, %s)", (popular_address, city_id))
            db.commit()

# Insert data from JSON file
insert_data_from_json()

# Close cursor and database connection
cursor.close()
db.close()
