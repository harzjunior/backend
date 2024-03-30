const pool = require("../db");

const { insertUser, checkEmailExists } = require("../models/userModel");

const submitUserForm = async (req, res) => {
  const { userName, userEmail, userMessage } = req.body;

  try {
    // Check if the email already exists in the database
    const emailExists = await checkEmailExists(userEmail);
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email already exists in the database" });
    }

    // If the email doesn't exist, insert the contact into the database
    insertUser(userName, userEmail, userMessage, (error, results) => {
      if (error) {
        console.error("Error submitting message to MySQL:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Submitted successfully" });
      }
    });
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = (req, res) => {
  const query = "SELECT username, email, password, created_at FROM users";
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

module.exports = { submitUserForm, getUser };
