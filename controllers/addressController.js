const addressModel = require("../models/addressModel");

// Get all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await addressModel.getAllAddresses();
    res.json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get address by ID
exports.getAddressById = async (req, res) => {
  const { id } = req.params;
  try {
    const address = await addressModel.getAddressById(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new address
exports.createAddress = async (req, res) => {
  const addressData = req.body;
  try {
    const newAddressId = await addressModel.createAddress(addressData);
    res
      .status(201)
      .json({ id: newAddressId, message: "Address created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an address by ID
exports.updateAddress = async (req, res) => {
  const { id } = req.params;
  const addressData = req.body;
  try {
    const affectedRows = await addressModel.updateAddress(id, addressData);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an address by ID
exports.deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await addressModel.deleteAddress(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
