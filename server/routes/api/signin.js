// Require Express Router
const router = require("express").Router();

// Require userController
const userController = require("../../controllers/userController");

// Matches with "/api/account"
router.route('/signup')
    .post(userController.createUser);

router.route('/signin')
    .post(userController.signin);

router.route('/verify')
    .get(userController.verify);

router.route('/signout')
    .get(userController.signout);

// Exports Router
module.exports = router;