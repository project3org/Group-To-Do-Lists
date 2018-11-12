// Require Express Router
const router = require("express").Router();

// Require userController
const userController = require("../../controllers/userController");

// Matches with "/api/account"

// Route for signing up
router.route('/signup')
    .post(userController.createUser);

// Route for signing in
router.route('/signin')
    .post(userController.signin);

// Route for signing out
router.route('/signout')
    .get(userController.signout);

// Route for verifying session
router.route('/verify')
    .get(userController.verifySession);

// Route for deleting session
router.route('/session/delete/:id')
    .delete(userController.deleteSession);

// Route for verifying email
router.route('/confirmation/:token')
    .get(userController.emailVerification);

<<<<<<< HEAD
// Route for creating a new secret email token
router.route('/secret')
    .get(userController.createNewSecretToken);

// Route for getting specific user information
router.route('/user/:id')
    .get(userController.getUser);

// Route for deleting user's association with list
router.route('/user/:userId/:listId')
    .post(userController.deleteLists);

// Route for deleting user
router.route('/delete/:id')
    .delete(userController.deleteUser);

=======
router.route('/user')
    .get(userController.createNewSecretToken);

>>>>>>> master
// Exports Router
module.exports = router;