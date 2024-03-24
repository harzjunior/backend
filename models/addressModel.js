const db = require("../db");

// Get all addresses
exports.getAllAddresses = async () => {
  const [rows] = await db.promise().query("SELECT * FROM address");
  return rows;
};

// Get address by ID
exports.getAddressById = async (id) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM address WHERE address_id = ?", [id]);
  return rows[0];
};

// Create a new address
exports.createAddress = async (addressData) => {
  const [result] = await db
    .promise()
    .query("INSERT INTO address SET ?", [addressData]);
  return result.insertId;
};

// Update an address by ID
exports.updateAddress = async (id, addressData) => {
  const [result] = await db
    .promise()
    .query("UPDATE address SET ? WHERE address_id = ?", [addressData, id]);
  return result.affectedRows;
};

// Delete an address by ID
exports.deleteAddress = async (id) => {
  const [result] = await db.query("DELETE FROM address WHERE address_id = ?", [
    id,
  ]);
  return result.affectedRows;
};
