import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CheckSquare, Clock, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import { fetchAnalytics, fetchTasks } from "../state/taskSlice";
import { fetchAllUsers } from "../state/authSlice";
import useTasks from "../hooks/useTasks";
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";
import TaskCard from "../components/tasks/TaskCard";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";
import TaskForm from "../components/tasks/TaskForm";
import { useState } from "react";
import toast from "react-hot-toast";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value ?? "—"}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { tasks, analytics, loading } = useTasks();
  const { user } = useAuth();
  const [editTask, setEditTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useSocket(true);

  useEffect(() => {
    dispatch(fetchAnalytics());
    dispatch(fetchTasks({ limit: 6, sortBy: "createdAt", order: "desc" }));
    dispatch(fetchAllUsers());
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    dispatch({ type: "tasks/delete/pending" });
    const { deleteTask } = await import("../state/taskSlice");
    dispatch(deleteTask(id));
    toast.success("Task deleted");
  };

  const handleEdit = (task) => { setEditTask(task); setModalOpen(true); };

  const total = analytics?.total || 0;
  const done = analytics?.byStatus?.find((s) => s._id === "done")?.count || 0;
  const inProgress = analytics?.byStatus?.find((s) => s._id === "in_progress")?.count || 0;
  const overdue = analytics?.overdue || 0;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Good to see you, {user?.name?.split(" ")[0]}! 👋</h1>
        <p className="text-gray-500 text-sm mt-0.5">Here's an overview of your tasks</p>
      </div>

      {loading && !analytics ? <Loader /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard icon={CheckSquare} label="Total Tasks" value={total} color="bg-indigo-500" />
          <StatCard icon={TrendingUp} label="Completed" value={done} color="bg-green-500" />
          <StatCard icon={Clock} label="In Progress" value={inProgress} color="bg-blue-500" />
          <StatCard icon={AlertTriangle} label="Overdue" value={overdue} color="bg-red-500" />
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Recent Tasks</h2>
        <Link to="/tasks" className="text-sm text-indigo-600 hover:underline flex items-center gap-1">
          View all <ArrowRight size={13} />
        </Link>
      </div>

      {loading ? <Loader /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.slice(0, 6).map((task) => (
            <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
          {tasks.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-400">
              No tasks yet. <Link to="/tasks" className="text-indigo-600 hover:underline">Create one!</Link>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditTask(null); }} title="Edit Task">
        <TaskForm task={editTask} onClose={() => { setModalOpen(false); setEditTask(null); }} />
      </Modal>
    </div>
  );
};

export default DashboardPage;