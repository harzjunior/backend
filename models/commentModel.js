const pool = require("../db");

const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS count FROM comments WHERE email = ?";
    pool.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count > 0);
      }
    });
  });
};

const insertComment = (
  commentName,
  commentEmail,
  commentMessage,
  createAt,
  callback
) => {
  const insertQuery =
    "INSERT INTO comments (guest_name, guest_email, comment_text) VALUES (?, ?, ?)";
  pool.query(
    insertQuery,
    [commentName, commentEmail, commentMessage, createAt],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

module.exports = { checkEmailExists, insertComment };
