const bcrypt = require("bcrypt");
const registerModel = require("../models/registerModel");

// Controller function to handle user registration
const register = (req, res) => {
  const { registerUsername, registerPassword, registerEmail } = req.body;

  const hashedPassword = bcrypt.hashSync(registerPassword, 10); // Hash the password

  registerModel.createUser(
    registerUsername,
    hashedPassword,
    registerEmail,
    (error, result) => {
      if (error) {
        console.error("Error registering user in MySQL:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "User registered successfully" });
      }
    }
  );
};

module.exports = {
  register,
};
