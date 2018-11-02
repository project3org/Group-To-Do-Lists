// Require Express
const router = require("express").Router();

// Require Route here.
const userAuthRoute = require("./userAuth");

// API routes
router.use("/account", userAuthRoute);

// Export Router
module.exports = router;
