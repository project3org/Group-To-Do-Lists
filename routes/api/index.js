// Require Express
const router = require("express").Router();

// Require Route here. Example below is route /thisthing will pass into apiRoutes.js
const thisthingRoutes = require("./apiRoutes");

// API routes
router.use("/thisthing", thisthingRoutes);

// Export Router
module.exports = router;
