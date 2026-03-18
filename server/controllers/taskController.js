const taskService = require("../services/taskService");

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user._id);
    // Emit real-time event
    req.io.emit("task:created", task);
    res.status(201).json({ success: true, data: task });
  } catch (err) { next(err); }
};

const getTasks = async (req, res, next) => {
  try {
    const { tasks, total } = await taskService.getTasks(req.query);
    res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        total,
        page: parseInt(req.query.page) || 1,
        limit: Math.min(parseInt(req.query.limit) || 20, 100),
        totalPages: Math.ceil(total / (Math.min(parseInt(req.query.limit) || 20, 100))),
      },
    });
  } catch (err) { next(err); }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (err) { next(err); }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.user._id);
    req.io.emit("task:updated", task);
    res.status(200).json({ success: true, data: task });
  } catch (err) { next(err); }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    req.io.emit("task:deleted", { id: req.params.id });
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (err) { next(err); }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };