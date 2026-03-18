const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
      index: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      index: true,
    },
    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      index: true,
    },
    // For optimistic locking / versioning
    __v: { type: Number, select: true },
  },
  { timestamps: true, optimisticConcurrency: true }
);

// Compound index for analytics performance
taskSchema.index({ status: 1, dueDate: 1 });
taskSchema.index({ createdBy: 1, status: 1 });

// Audit log of updates
const auditSchema = new mongoose.Schema(
  {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    changes: { type: Object },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
const AuditLog = mongoose.model("AuditLog", auditSchema);

module.exports = { Task, AuditLog };