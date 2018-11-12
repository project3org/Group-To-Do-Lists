const router = require("express").Router();
const listController = require("../../controllers/listController");

// :id param needs to be the User ObjectId

// Matches with "/api/lists/all/:id"
router.route("/all/:id")
    // Route for getting all Lists
    .get(listController.openLists)

// Matches with "/api/lists/:id"
router.route("/:id")
    // Route for saving List
    .post(listController.saveList)

    // Route for passing List ID to DB for List body
    .get(listController.getList)

    // Route for updating list information
    .put(listController.updateList)

    // Route for deleting List
    .delete(listController.deleteList);

// Matches with "/api/lists/:listId/:taskId"
router.route("/:listId/:taskId")
    // Route for deleting task association with list
    .post(listController.deleteTasks)

module.exports = router;