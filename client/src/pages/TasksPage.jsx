import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Plus, LayoutGrid, List } from "lucide-react";
import { fetchTasks, deleteTask } from "../state/taskSlice";
import { fetchAllUsers } from "../state/authSlice";
import useTasks from "../hooks/useTasks";
import useSocket from "../hooks/useSocket";
import TaskCard from "../components/tasks/TaskCard";
import TaskTable from "../components/tasks/TaskTable";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import Modal from "../components/common/Modal";
import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import toast from "react-hot-toast";

const defaultFilters = { search: "", status: "", priority: "", sortBy: "createdAt", order: "desc", page: 1, limit: 12 };

const TasksPage = () => {
  const dispatch = useDispatch();
  const { tasks, pagination, loading } = useTasks();
  const [filters, setFilters] = useState(defaultFilters);
  const [view, setView] = useState("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useSocket(true);

  const loadTasks = useCallback((f) => {
    const params = {};
    Object.entries(f).forEach(([k, v]) => { if (v) params[k] = v; });
    dispatch(fetchTasks(params));
  }, [dispatch]);

  useEffect(() => { dispatch(fetchAllUsers()); }, []);
  useEffect(() => { loadTasks(filters); }, [filters]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    dispatch(deleteTask(id));
    toast.success("Task deleted");
  };

  const handleEdit = (task) => { setEditTask(task); setModalOpen(true); };
  const handleCreate = () => { setEditTask(null); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setEditTask(null); };
  const handlePageChange = (page) => setFilters((f) => ({ ...f, page }));
  const clearFilters = () => setFilters(defaultFilters);

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 text-sm">{pagination.total} tasks total</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setView("grid")} className={`p-2 ${view === "grid" ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:bg-gray-50"}`}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setView("list")} className={`p-2 ${view === "list" ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:bg-gray-50"}`}>
              <List size={16} />
            </button>
          </div>
          <button onClick={handleCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      <TaskFilters filters={filters} onChange={setFilters} onClear={clearFilters} />

      {loading ? <Loader /> : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
          {tasks.length === 0 && (
            <div className="col-span-4 text-center py-16 text-gray-400">No tasks found</div>
          )}
        </div>
      ) : (
        <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />

      <Modal isOpen={modalOpen} onClose={handleClose} title={editTask ? "Edit Task" : "Create Task"}>
        <TaskForm task={editTask} onClose={handleClose} />
      </Modal>
    </div>
  );
};

export default TasksPage;