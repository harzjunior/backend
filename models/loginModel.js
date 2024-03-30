const db = require("../db");

// Model function to get user by username from the database
const getUserByUsername = (username, callback) => {
  // Retrieve user from the users table based on the provided username
  const selectUserQuery = "SELECT * FROM users WHERE username = ? LIMIT 1";
  db.query(selectUserQuery, [username], (error, results) => {
    if (error) {
      return callback(error, null);
    } else {
      if (results.length === 1) {
        const user = results[0];
        return callback(null, user);
      } else {
        return callback(null, null);
      }
    }
  });
};

module.exports = {
  getUserByUsername,
};
