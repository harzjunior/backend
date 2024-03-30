const db = require("../db");

// Model function to create a new user in the database
const createUser = (username, password, email, callback) => {
  // Insert user into the users table
  const insertUserQuery =
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
  db.query(insertUserQuery, [username, password, email], (error, results) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, results);
    }
  });
};

module.exports = {
  createUser,
};
