// Requiring dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Require models
const db = require('./models');

// Setting up Port
const PORT = process.env.PORT || 8080;

// Initialize Express
const app = express();

// Require routes
const routes = require('./routes');

// Configure middleware

// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Make public a static folder
app.use(express.static("public"));

// Have every request go through route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Starts the server
app.listen(PORT, ()=>{
    console.log("App running on port " + PORT + "!");
});