// Require Express
const router = require("express").Router();

// Require Route here.
const signinRoute = require("./signin");

// API routes
router.use("/account", signinRoute);

// Export Router
module.exports = router;
