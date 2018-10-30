// Require Express
const router = require("express").Router();

// Require Route here.
const signin = require("./signin");

// API routes
router.use("/signin", signin);

// Export Router
module.exports = router;
