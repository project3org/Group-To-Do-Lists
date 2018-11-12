// Require Express
const router = require("express").Router();

// Require Routes here.
const userAuthRoute = require("./userAuth");
const taskRoutes = require("./tasks");

// Task routes
router.use("/tasks", taskRoutes);

// userAuth routes
router.use("/account", userAuthRoute);

// Export Router
module.exports = router;
