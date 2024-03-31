const express = require("express");
const router = express.Router();
const { submitCommentForm } = require("../controllers/commentController");
const { fetchComments } = require("../controllers/commentController");

// Route to handle contact form submission
router.post("/api/comment", submitCommentForm);

// Route to handle fetching comments
router.get("/api/comment", fetchComments);

module.exports = router;
