const pool = require("../db");

const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS count FROM contact WHERE email = ?";
    pool.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
};

const insertContact = (contactName, contactEmail, contactMessage, callback) => {
  const insertQuery =
    "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
  pool.query(
    insertQuery,
    [contactName, contactEmail, contactMessage],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

module.exports = { checkEmailExists, insertContact };
