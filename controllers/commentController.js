const { insertComment, getComments } = require("../models/commentModel");

const submitCommentForm = async (req, res) => {
  const { commentName, commentEmail, commentText } = req.body;

  try {
    // Insert the comment into the database
    insertComment(commentName, commentEmail, commentText);

    res.json({ message: "Comment submitted successfully" });
  } catch (error) {
    console.error("Error submitting comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchComments = async (req, res) => {
  try {
    // Fetch comments from the database
    const comments = await getComments();

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { submitCommentForm, fetchComments };
