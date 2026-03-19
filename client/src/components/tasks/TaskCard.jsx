import { Pencil, Trash2, Calendar, User } from "lucide-react";
import { StatusBadge, PriorityBadge } from "./TaskBadge";
import { formatDate, isOverdue } from "../../utils/helpers";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const overdue = isOverdue(task.dueDate, task.status);
  return (
    <div className={`bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow ${overdue ? "border-red-200" : "border-gray-100"}`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{task.title}</h3>
        <div className="flex gap-1.5 shrink-0">
          <button onClick={() => onEdit(task)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600">
            <Pencil size={14} />
          </button>
          <button onClick={() => onDelete(task._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{task.description}</p>
      )}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
        {overdue && <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Overdue</span>}
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-400">
        {task.assignedUser && (
          <span className="flex items-center gap-1">
            <User size={11} /> {task.assignedUser.name}
          </span>
        )}
        {task.dueDate && (
          <span className={`flex items-center gap-1 ${overdue ? "text-red-500" : ""}`}>
            <Calendar size={11} /> {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;