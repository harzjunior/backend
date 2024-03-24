const db = require("../db");

// Get all countries
exports.getAllCountries = async () => {
  const [rows] = await db.promise().query("SELECT * FROM country");
  return rows;
};

// Get country by ID
exports.getCountryById = async (id) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM country WHERE country_id = ?", [id]);
  return rows[0];
};

// Create a new country
exports.createCountry = async (countryData) => {
  const [result] = await db
    .promise()
    .query("INSERT INTO country SET ?", [countryData]);
  return result.insertId;
};

// Update a country by ID
exports.updateCountry = async (id, countryData) => {
  const [result] = await db
    .promise()
    .query("UPDATE country SET ? WHERE country_id = ?", [countryData, id]);
  return result.affectedRows;
};

// Delete a country by ID
exports.deleteCountry = async (id) => {
  const [result] = await db.query("DELETE FROM country WHERE country_id = ?", [
    id,
  ]);
  return result.affectedRows;
};
