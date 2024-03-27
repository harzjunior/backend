const pool = require("../db");

const { insertContact, checkEmailExists } = require("../models/contactModel");

const submitContactForm = async (req, res) => {
  const { contactName, contactEmail, contactMessage } = req.body;

  try {
    // Check if the email already exists in the database
    const emailExists = await checkEmailExists(contactEmail);
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email already exists in the database" });
    }

    // If the email doesn't exist, insert the contact into the database
    insertContact(
      contactName,
      contactEmail,
      contactMessage,
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

const getContacts = (req, res) => {
  const query = "SELECT name, email, message FROM contact";
  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

module.exports = { submitContactForm, getContacts };
