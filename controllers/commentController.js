const pool = require("../db");

const { insertComment, checkEmailExists } = require("../models/commentModel");

const submitCommentForm = async (req, res) => {
  const { commentName, commentEmail, commentMessage } = req.body;

  try {
    // Check if the email already exists in the database
    const emailExists = await checkEmailExists(commentEmail);
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email already exists in the database" });
    }

    // If the email doesn't exist, insert the contact into the database
    insertComment(
      commentName,
      commentEmail,
      commentMessage,
      (error, results) => {
        if (error) {
          console.error("Error submitting message to MySQL:", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json({ message: "Submitted successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getComment = (req, res) => {
  const query = "SELECT guest_name, guest_email, comment_text FROM comments";
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

module.exports = { submitCommentForm, getComment };
