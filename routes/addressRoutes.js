const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

// GET all addresses
router.get("/", addressController.getAllAddresses);

// GET address by ID
router.get("/:id", addressController.getAddressById);

// POST a new address
router.post("/", addressController.createAddress);

// PUT update address by ID
router.put("/:id", addressController.updateAddress);

// DELETE address by ID
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
