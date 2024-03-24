const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

// GET all countries
router.get("/", countryController.getAllCountries);

// GET country by ID
router.get("/:id", countryController.getCountryById);

// POST a new country
router.post("/", countryController.createCountry);

// PUT update country by ID
router.put("/:id", countryController.updateCountry);

// DELETE country by ID
router.delete("/:id", countryController.deleteCountry);

module.exports = router;
