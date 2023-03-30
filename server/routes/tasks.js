const router = require("express").Router();
const {
  createTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getCurrentUserTasks,
  updateTask,
} = require("../controllers/task.js");

router.get("/all", getAllTasks);
router.post("/", createTask);
router.put("/:taskId", updateTask);
router.get("/myTasks", getCurrentUserTasks);
router.delete("/deleteAll", deleteAllTasks);
router.delete("/:taskId", deleteTask);

module.exports = router;
