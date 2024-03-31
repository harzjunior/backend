const jwt = require("jsonwebtoken");

// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
  // Get the JWT token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify JWT token
  jwt.verify(token, "sauce", (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = decodedToken; // Set the decoded token to the request object
    next(); // Proceed to the next middleware
  });
};

module.exports = {
  authenticateToken,
};
