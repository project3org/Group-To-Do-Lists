const router = require("express").Router();
const tasksController = require("../../controllers/tasksController");

// :id param needs to be the List ObjectId

// Matches with "/api/tasks/all/:id"
router.route("/all/:id")
  .get(tasksController.findAll)

// Matches with "/api/tasks/:id"
router.route("/:id")
  .get(tasksController.findById)
  .put(tasksController.update)
  .post(tasksController.create)
  .delete(tasksController.remove);

module.exports = router;