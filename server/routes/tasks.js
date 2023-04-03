const router = require("express").Router();
const {
  createTask,
  deleteTask,
  getCurrentUserTasks,
  updateTask,
  getOneTask,
} = require("../controllers/task.js");

router.post("/", createTask);
router.put("/:taskId", updateTask);
router.get("/myTasks", getCurrentUserTasks);
router.get("/:_id", getOneTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
