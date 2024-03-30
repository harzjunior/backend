const pool = require("../db");

const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    pool.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
};

const insertUser = (userName, userEmail, userMessage, callback) => {
  const insertQuery =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  pool.query(
    insertQuery,
    [userName, userEmail, userMessage],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

module.exports = { checkEmailExists, insertUser };
