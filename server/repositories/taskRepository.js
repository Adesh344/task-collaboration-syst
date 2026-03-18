const { Task, AuditLog } = require("../models/Task");

const createTask = (data) => Task.create(data);

const findTasks = async ({ filter, sort, page, limit }) => {
  const skip = (page - 1) * limit;
  const [tasks, total] = await Promise.all([
    Task.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("assignedUser", "name email")
      .populate("createdBy", "name email"),
    Task.countDocuments(filter),
  ]);
  return { tasks, total };
};

const findById = (id) =>
  Task.findById(id)
    .populate("assignedUser", "name email")
    .populate("createdBy", "name email");

const updateTask = async (id, data, version) => {
  // Optimistic locking: only update if __v matches
  const updated = await Task.findOneAndUpdate(
    { _id: id, __v: version },
    { ...data, $inc: { __v: 1 } },
    { new: true, runValidators: true }
  )
    .populate("assignedUser", "name email")
    .populate("createdBy", "name email");
  return updated;
};

const deleteTask = (id) => Task.findByIdAndDelete(id);

const getAnalytics = async () => {
  const now = new Date();
  const [byStatus, byPriority, overdue, total] = await Promise.all([
    Task.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Task.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }]),
    Task.countDocuments({ dueDate: { $lt: now }, status: { $ne: "done" } }),
    Task.countDocuments(),
  ]);
  const done = byStatus.find((s) => s._id === "done")?.count || 0;
  return { total, byStatus, byPriority, overdue, completionRate: total ? ((done / total) * 100).toFixed(2) : 0 };
};

const createAuditLog = (data) => AuditLog.create(data);

module.exports = { createTask, findTasks, findById, updateTask, deleteTask, getAnalytics, createAuditLog };