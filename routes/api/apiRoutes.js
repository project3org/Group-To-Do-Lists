// Require Express
const router = require("express").Router();

// Require Controller(s)
const thisController = require("../../controllers/thisController");

// Create Routes Here
// Matches with "/api/thisthing" from demo text
router.route("/")
// Put api methods here such as the below examples
//   .get(thisController.findAll)
//   .post(thisController.create);

// Export Router
module.exports = router;
