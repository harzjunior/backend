// models/contactModel.js

const pool = require("../db");

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

module.exports = { insertContact };
