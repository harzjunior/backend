const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

// GET all cities
router.get("/", cityController.getAllCities);

// GET city by ID
router.get("/:id", cityController.getCityById);

// POST a new city
router.post("/", cityController.createCity);

// PUT update city by ID
router.put("/:id", cityController.updateCity);

// DELETE city by ID
router.delete("/:id", cityController.deleteCity);

module.exports = router;
