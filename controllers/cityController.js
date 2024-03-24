const cityModel = require("../models/cityModel");

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await cityModel.getAllCities();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get city by ID
exports.getCityById = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await cityModel.getCityById(id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    res.json(city);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new city
exports.createCity = async (req, res) => {
  const cityData = req.body;
  try {
    const newCityId = await cityModel.createCity(cityData);
    res
      .status(201)
      .json({ id: newCityId, message: "City created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a city by ID
exports.updateCity = async (req, res) => {
  const { id } = req.params;
  const cityData = req.body;
  try {
    const affectedRows = await cityModel.updateCity(id, cityData);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "City not found" });
    }
    res.json({ message: "City updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const affectedRows = await cityModel.deleteCity(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "City not found" });
    }
    res.json({ message: "City deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
