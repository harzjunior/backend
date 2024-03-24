const db = require("../db");

// Get all cities
exports.getAllCities = async () => {
  const [rows] = await db.promise().query("SELECT * FROM city");
  return rows;
};

// Get city by ID
exports.getCityById = async (id) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM city WHERE city_id = ?", [id]);
  return rows[0];
};

// Create a new city
exports.createCity = async (cityData) => {
  const [result] = await db
    .promise()
    .query("INSERT INTO city SET ?", [cityData]);
  return result.insertId;
};

// Update a city by ID
exports.updateCity = async (id, cityData) => {
  const [result] = await db
    .promise()
    .query("UPDATE city SET ? WHERE city_id = ?", [cityData, id]);
  return result.affectedRows;
};

// Delete a city by ID
exports.deleteCity = async (id) => {
  const [result] = await db
    .promise()
    .query("DELETE FROM city WHERE city_id = ?", [id]);
  return result.affectedRows;
};
