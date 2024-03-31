const express = require("express");
const path = require("path"); // Import the path module
const bodyParser = require("body-parser");
const cors = require("cors");
const addressRoutes = require("./routes/addressRoutes");
const cityRoutes = require("./routes/cityRoutes");
const countryRoutes = require("./routes/countryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const errorHandler = require("./middleware/errorHandling");
const loggingMiddleware = require("./middleware/logging");
const pool = require("./db");
const { authenticateToken } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggingMiddleware); // Logging middleware

// Routes
app.use("/api/address", addressRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/country", countryRoutes);
app.use(contactRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use(registerRoutes);
app.use(loginRoutes);

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling middleware (must be defined last)
app.use(errorHandler);

// Database Connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");

  // Release the connection when done
  connection.release();

  // Start the server after successful database connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

//===============================================contact=================================================
// this route to handle the contact submit
// app.post("/api/contact", (req, res) => {
//   const { contactName, contactEmail, contactMessage } = req.body;

//   // Insert user into the users table
//   const insertUserQuery =
//     "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
//   pool.query(
//     insertUserQuery,
//     [contactName, contactEmail, contactMessage],
//     (error, results) => {
//       if (error) {
//         console.error("Error submitting message to MySQL:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//       } else {
//         res.json({ message: "Submitted successfully" });
//       }
//     }
//   );
// });
