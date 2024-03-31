const pool = require("../db");

const insertComment = (commentName, commentEmail, commentText) => {
  return new Promise((resolve, reject) => {
    const insertQuery =
      "INSERT INTO comments (guest_name, guest_email, comment_text) VALUES (?, ?, ?)";
    pool.query(
      insertQuery,
      [commentName, commentEmail, commentText],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const getComments = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT guest_name, guest_email, comment_text FROM comments";
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { insertComment, getComments };
