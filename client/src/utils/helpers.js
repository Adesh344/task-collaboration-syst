export const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === "done") return false;
  return new Date(dueDate) < new Date();
};

export const statusColor = (status) => {
  const map = { todo: "bg-slate-100 text-slate-700", in_progress: "bg-blue-100 text-blue-700", done: "bg-green-100 text-green-700" };
  return map[status] || "bg-gray-100 text-gray-700";
};

export const priorityColor = (priority) => {
  const map = { low: "bg-emerald-100 text-emerald-700", medium: "bg-yellow-100 text-yellow-700", high: "bg-red-100 text-red-700" };
  return map[priority] || "bg-gray-100 text-gray-700";
};

export const statusLabel = (status) => {
  const map = { todo: "To Do", in_progress: "In Progress", done: "Done" };
  return map[status] || status;
};