Sure, I'll integrate the database table definitions into the README. Here's the updated version:

---

# Address Book App

This application is an address book that allows users to manage addresses, cities, countries, and contacts. It provides RESTful API endpoints for various operations related to address management.

## Project Structure

```
|-- address_data.json
|-- app.js
|-- app.py
|-- db.js
|-- models
|   |-- addressModel.js
|   |-- cityModel.js
|   |-- commentModel.js
|   |-- contactModel.js
|   |-- countryModel.js
|   |-- loginModel.js
|   |-- registerModel.js
|   |-- userModel.js
|-- controllers
|   |-- addressController.js
|   |-- cityController.js
|   |-- commentController.js
|   |-- contactController.js
|   |-- countryController.js
|   |-- loginController.js
|   |-- registerController.js
|   |-- userController.js
|-- middleware
|   |-- auth.js
|   |-- errorHandling.js
|   |-- logging.js
|   |-- middleware.js
|-- routes
|   |-- addressRoutes.js
|   |-- cityRoutes.js
|   |-- commentRoutes.js
|   |-- contactRoutes.js
|   |-- countryRoutes.js
|   |-- loginRoutes.js
|   |-- registerRoutes.js
|   |-- userRoutes.js
|-- public
|   |-- index.html
|   |-- pages
|   |   |-- about.html
|   |   |-- address.html
|   |   |-- admin.html
|   |   |-- blog.html
|   |   |-- city.html
|   |   |-- contact.html
|   |   |-- country.html
|   |   |-- login.html
|   |   |-- register.html
|   |   |-- script.js
|   |   |-- search.js
|   |   |-- admin.js
|   |   |-- blog.js
|   |   |-- contact.js
|   |   |-- login.js
|   |   |-- register.js
|   |-- styles.css
|-- package.json
|-- package-lock.json
```

## Database Tables

1. **Address Table:**
   - `address_id`: INT AUTO_INCREMENT PRIMARY KEY
   - `street_address`: VARCHAR(255)
   - `city_id`: INT
   - `postal_code`: VARCHAR(20)
   - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   - `updated_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

2. **City Table:**
   - `city_id`: INT AUTO_INCREMENT PRIMARY KEY
   - `city_name`: VARCHAR(100)
   - `country_id`: INT
   - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   - `updated_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

3. **Country Table:**
   - `country_id`: INT AUTO_INCREMENT PRIMARY KEY
   - `country_name`: VARCHAR(100)
   - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   - `updated_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

4. **Users Table:**
   - `user_id`: INT AUTO_INCREMENT PRIMARY KEY
   - `username`: VARCHAR(100)
   - `email`: VARCHAR(100)
   - `password`: VARCHAR(255)
   - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   - `updated_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

5. **Comments Table:**
   - `comment_id`: INT AUTO_INCREMENT PRIMARY KEY
   - `user_id`: INT
   - `guest_name`: VARCHAR(100)
   - `guest_email`: VARCHAR(100)
   - `comment_text`: TEXT
   - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   - `updated_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   - `FOREIGN KEY (user_id)` REFERENCES `users(user_id)`

6. **Contact Table:**
   - `contact_id`: INT AUTO_INCREMENT PRIMARY KEY
   - `name`: VARCHAR(255)
   - `email`: VARCHAR(255)
   - `message`: TEXT
   - `created_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   - `updated_at`: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/address-book.git
   ```
2. Navigate to the project directory:
   ```bash
   cd address-book
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```
2. Access the API endpoints using a REST client like Postman or by making HTTP requests.

## Technologies Used

- Node.js
- Express.js
- MySQL
- bcrypt
- body-parser
- cors
- dotenv
- jsonwebtoken
- mysql2

## Database Setup

1. Create a MySQL database named `address_book`.
2. Import the provided SQL file `address_book.sql` to set up the necessary tables.

## Configuration

1. Create a `.env` file in the project root directory.
2. Define the following environment variables in the `.env` file:
   ```plaintext
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_DATABASE=address_book
   PORT=3000
   ```

## JSON Data Population

The `app.py` script can be used to populate the database with initial data from the `address_data.json` file. Before running the script, ensure that the MySQL database is set up and running.

```bash
python app.py
```

## Contributing

Contributions are welcome! Feel free to submit pull requests.

## License

This project is licensed under the ISC License.
