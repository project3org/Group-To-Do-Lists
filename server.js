// Require Dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./server/routes");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// Add routes, both API and view
app.use(routes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + './client/build/index.html'));
});

// If deployed, use the deployed database. Otherwise use the local gratify database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gratify";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API server running on PORT ${PORT}!`);
});