// middleware.js
const loggingMiddleware = (req, res, next) => {
  // Your logging logic here
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = {
  loggingMiddleware,
};
