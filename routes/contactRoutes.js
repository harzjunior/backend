const express = require("express");
const router = express.Router();
const { submitContactForm } = require("../controllers/contactController");
const { getContacts } = require("../controllers/contactController");

// Route to handle contact form submission
router.post("/api/contact", submitContactForm);
router.get("/api/contact", getContacts);

module.exports = router;
