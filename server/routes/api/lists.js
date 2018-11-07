const router = require("express").Router();
const listController = require("../../controllers/listController");

// Matches with "/api/lists/user/:id"
router.route("/user/:id")
    // Route for getting all Lists
    .get(listController.openLists)

// Matches with "/api/lists/:id"
router.route("/:id")
    // Route for saving List
    .post(listController.saveList)

    // Route for passing List ID to DB for List body
    .get(listController.getList)

    // Route for deleting List
    .delete(listController.deleteList);

module.exports = router;