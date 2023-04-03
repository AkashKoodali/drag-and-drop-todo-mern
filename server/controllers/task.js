const Task = require("../models/Task.js");
const createError = require("../utils/createError.js");


// Create a todo 
exports.createTask = async (req, res, next) => {
  const newTask = new Task({
    title: req.body.title,
    user: req.user.id,
    completed: req.body.completed,
  });
  try {
    const savedTask = await newTask.save();
    return res.status(200).json(savedTask);
  } catch (err) {
    return next(err);
  }
};

// update the todo
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task) return next(createError({ status: 404, message: "Task not found" }));
    if (task.user.toString() !== req.user.id) return next(createError({ status: 401, message: "It's not your todo." }));

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
        completed: req.body.completed,
      },
      { new: true }
    );
    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(err);
  }
};

// get the current signin user tasks
exports.getCurrentUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
};

// get the one task 
exports.getOneTask = async (req, res, next) => {
  const {_id} = req.params
  try {
    const task = await Task.findById({_id});
    return res.json({task});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (task.user === req.user.id) {
      return next(createError({ status: 401, message: "It's not your todo." }));
    }
    await Task.findByIdAndDelete(req.params.taskId);
    return res.json("Task Deleted Successfully");
  } catch (err) {
    return next(err);
  }
};

