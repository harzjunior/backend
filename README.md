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

## API Endpoints

- `/api/address`: CRUD operations for addresses.
- `/api/city`: CRUD operations for cities.
- `/api/country`: CRUD operations for countries.
- `/api/contact`: CRUD operations for contacts.

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

--- 