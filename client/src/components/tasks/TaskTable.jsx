import { Pencil, Trash2 } from "lucide-react";
import { StatusBadge, PriorityBadge } from "./TaskBadge";
import { formatDate, isOverdue } from "../../utils/helpers";

const TaskTable = ({ tasks, onEdit, onDelete }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-100">
          {["Title", "Status", "Priority", "Assigned To", "Due Date", "Actions"].map((h) => (
            <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr><td colSpan={6} className="text-center py-12 text-gray-400">No tasks found</td></tr>
        ) : tasks.map((task) => {
          const overdue = isOverdue(task.dueDate, task.status);
          return (
            <tr key={task._id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${overdue ? "bg-red-50/30" : ""}`}>
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800 max-w-xs truncate">{task.title}</div>
                {task.description && <div className="text-xs text-gray-400 truncate max-w-xs">{task.description}</div>}
              </td>
              <td className="px-4 py-3"><StatusBadge status={task.status} /></td>
              <td className="px-4 py-3"><PriorityBadge priority={task.priority} /></td>
              <td className="px-4 py-3 text-gray-600">{task.assignedUser?.name || "—"}</td>
              <td className={`px-4 py-3 ${overdue ? "text-red-500 font-medium" : "text-gray-600"}`}>{formatDate(task.dueDate)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-1.5">
                  <button onClick={() => onEdit(task)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => onDelete(task._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default TaskTable;