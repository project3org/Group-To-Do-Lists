// Require Dependencies
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

// Route for email confirmation
router.route('/account/confirmation/:token').get(function(req, res) {
  res.sendFile(path.resolve('../../client/public/index.html'));
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

// Exports Router
module.exports = router;