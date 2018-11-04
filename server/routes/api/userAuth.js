// Require Express Router
const router = require("express").Router();

// Require userController
const userController = require("../../controllers/userController");

// Matches with "/api/account"
router.route('/signup')
    .post(userController.createUser);

router.route('/signin')
    .post(userController.signin);

router.route('/signout')
    .get(userController.signout);

router.route('/verify')
    .get(userController.verifySession);

router.route('/confirmation/:token')
    .get(userController.emailVerification);

// Exports Router
module.exports = router;