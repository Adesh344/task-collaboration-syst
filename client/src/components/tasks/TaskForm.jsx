import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useTasks from "../../hooks/useTasks";

const defaultForm = { title: "", description: "", status: "todo", priority: "medium", assignedUser: "", dueDate: "" };

const TaskForm = ({ task, onClose }) => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const { createTask, updateTask } = useTasks();
  const users = useSelector((s) => s.auth.users);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        assignedUser: task.assignedUser?._id || task.assignedUser || "",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
      });
    }
  }, [task]);

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.assignedUser) delete payload.assignedUser;
      if (!payload.dueDate) delete payload.dueDate;

      if (task) {
        await updateTask(task._id, { ...payload, version: task.__v });
        toast.success("Task updated!");
      } else {
        await createTask(payload);
        toast.success("Task created!");
      }
      onClose();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300";
  const labelCls = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelCls}>Title *</label>
        <input name="title" value={form.title} onChange={handle} placeholder="Task title" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Description</label>
        <textarea name="description" value={form.description} onChange={handle} placeholder="Task description..." rows={3} className={`${inputCls} resize-none`} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Status</label>
          <select name="status" value={form.status} onChange={handle} className={inputCls}>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Priority</label>
          <select name="priority" value={form.priority} onChange={handle} className={inputCls}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Assign To</label>
          <select name="assignedUser" value={form.assignedUser} onChange={handle} className={inputCls}>
            <option value="">Unassigned</option>
            {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Due Date</label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handle} className={inputCls} />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" disabled={loading}
          className="flex-1 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium">
          {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;