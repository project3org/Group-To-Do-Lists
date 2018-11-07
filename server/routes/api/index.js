// Require Express
const router = require("express").Router();

// Require Routes here.
const userAuthRoute = require("./userAuth");
const taskRoutes = require("./tasks");
const listRoutes = require("./lists");

// List routes
router.use("/lists", listRoutes);

// Task routes
router.use("/tasks", taskRoutes);

// User Account routes
router.use("/account", userAuthRoute);

// Export Router
module.exports = router;
