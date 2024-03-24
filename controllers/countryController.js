const countryModel = require("../models/countryModel");

// Get all countries
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await countryModel.getAllCountries();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get country by ID
exports.getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await countryModel.getCountryById(id);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json(country);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new country
exports.createCountry = async (req, res) => {
  const countryData = req.body;
  try {
    const newCountryId = await countryModel.createCountry(countryData);
    res
      .status(201)
      .json({ id: newCountryId, message: "Country created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a country by ID
exports.updateCountry = async (req, res) => {
  const { id } = req.params;
  const countryData = req.body;
  try {
    const affectedRows = await countryModel.updateCountry(id, countryData);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json({ message: "Country updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a country by ID
exports.deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await countryModel.deleteCountry(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Country not found" });
    }
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
