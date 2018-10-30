// Require Express Router
const router = require("express").Router();

// Require userController
const userController = require("../../controllers/userController");

// Matches with "/api/account"
router.route('/signup')
    .post(userController.createUser);

// Exports Router
module.exports = router;