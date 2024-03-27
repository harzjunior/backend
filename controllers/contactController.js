const { insertContact } = require("../models/contactModel");
const pool = require("../db");

const submitContactForm = (req, res) => {
  const { contactName, contactEmail, contactMessage } = req.body;

  insertContact(contactName, contactEmail, contactMessage, (error, results) => {
    if (error) {
      console.error("Error submitting message to MySQL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Submitted successfully" });
    }
  });
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
