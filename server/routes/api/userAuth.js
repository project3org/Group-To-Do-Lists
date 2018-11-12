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

router.route('/session/delete/:id')
    .delete(userController.deleteSession);

router.route('/confirmation/:token')
    .get(userController.emailVerification);

router.route('/secret')
    .get(userController.createNewSecretToken);

router.route('/user/:id')
    .get(userController.getUser);

router.route('/user/:userId/:listId')
    .post(userController.deleteLists);

router.route('/delete/:id')
    .delete(userController.deleteUser);

// Exports Router
module.exports = router;