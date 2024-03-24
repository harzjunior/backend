const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "address_book",
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
