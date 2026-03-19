import { Search, X } from "lucide-react";

const TaskFilters = ({ filters, onChange, onClear }) => {
  const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value, page: 1 });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="relative lg:col-span-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            name="search" value={filters.search || ""}
            onChange={handle} placeholder="Search tasks..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <select name="status" value={filters.status || ""} onChange={handle}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select name="priority" value={filters.priority || ""} onChange={handle}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select name="sortBy" value={filters.sortBy || ""} onChange={handle}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="">Sort By</option>
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      {(filters.search || filters.status || filters.priority) && (
        <button onClick={onClear} className="mt-2 flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
          <X size={12} /> Clear filters
        </button>
      )}
    </div>
  );
};

export default TaskFilters;