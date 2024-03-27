const { insertContact } = require("../models/contactModel");

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

module.exports = { submitContactForm };
