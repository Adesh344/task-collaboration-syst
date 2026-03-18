const taskRepo = require("../repositories/taskRepository");
const ApiError = require("../utils/ApiError");

const buildFilter = (query) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;
  if (query.assignedUser) filter.assignedUser = query.assignedUser;
  if (query.search) filter.title = { $regex: query.search, $options: "i" };
  if (query.startDate || query.endDate) {
    filter.dueDate = {};
    if (query.startDate) filter.dueDate.$gte = new Date(query.startDate);
    if (query.endDate) filter.dueDate.$lte = new Date(query.endDate);
  }
  return filter;
};

const createTask = (data, userId) =>
  taskRepo.createTask({ ...data, createdBy: userId });

const getTasks = (query) => {
  const filter = buildFilter(query);
  const sort = query.sortBy ? { [query.sortBy]: query.order === "desc" ? -1 : 1 } : { createdAt: -1 };
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 20, 100);
  return taskRepo.findTasks({ filter, sort, page, limit });
};

const getTaskById = async (id) => {
  const task = await taskRepo.findById(id);
  if (!task) throw new ApiError(404, "Task not found");
  return task;
};

const updateTask = async (id, data, userId) => {
  const task = await taskRepo.findById(id);
  if (!task) throw new ApiError(404, "Task not found");

  const version = data.version;
  if (version === undefined || version === null) throw new ApiError(400, "Version is required for update (optimistic locking)");

  const updated = await taskRepo.updateTask(id, data, version);
  if (!updated) throw new ApiError(409, "Task was modified by another user. Please refresh and try again.");

  // Audit log
  await taskRepo.createAuditLog({ taskId: id, updatedBy: userId, changes: data });

  return updated;
};

const deleteTask = async (id) => {
  const task = await taskRepo.findById(id);
  if (!task) throw new ApiError(404, "Task not found");
  await taskRepo.deleteTask(id);
};

const getAnalytics = () => taskRepo.getAnalytics();

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask, getAnalytics };