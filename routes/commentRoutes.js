const express = require("express");
const router = express.Router();
const { submitCommentForm } = require("../controllers/commentController");
const { getComment } = require("../controllers/commentController");

// Route to handle contact form submission
router.post("/api/comment", submitCommentForm);
router.get("/api/comments", getComment);

module.exports = router;
