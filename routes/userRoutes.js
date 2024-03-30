const express = require("express");
const router = express.Router();
const { submitUserForm } = require("../controllers/userController");
const { getUser } = require("../controllers/userController");

// Route to handle contact form submission
router.post("/api/user", submitUserForm);
router.get("/api/user", getUser);

module.exports = router;
