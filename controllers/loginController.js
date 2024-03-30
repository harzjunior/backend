const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginModel = require("../models/loginModel");

// Controller function to handle user login
const login = (req, res) => {
  const { loginUsername, loginPassword } = req.body;

  loginModel.getUserByUsername(loginUsername, (error, user) => {
    if (error) {
      console.error("Error querying user in MySQL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Check if the user exists
      if (user) {
        const isPasswordValid = bcrypt.compareSync(
          loginPassword,
          user.password
        );

        if (isPasswordValid) {
          // Password is correct, generate and return a JWT token
          const token = jwt.sign({ userId: user.id }, "sauce", {
            expiresIn: "1h", // You can adjust the expiration time
          });
          res.json({ token, username: user.username }); // Send token and username to the client
        } else {
          // Password is incorrect
          res.status(401).json({ error: "Invalid credentials" });
        }
      } else {
        // User not found
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  });
};

module.exports = {
  login,
};
