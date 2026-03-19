import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAnalytics } from "../state/taskSlice";
import useTasks from "../hooks/useTasks";
import Loader from "../components/common/Loader";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const COLORS = { todo: "#6366f1", in_progress: "#3b82f6", done: "#22c55e" };
const P_COLORS = { low: "#10b981", medium: "#f59e0b", high: "#ef4444" };

const StatBox = ({ label, value, sub, color }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</p>
    <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { analytics, loading } = useTasks();

  useEffect(() => { dispatch(fetchAnalytics()); }, []);

  if (loading || !analytics) return <Loader fullScreen />;

  const statusData = analytics.byStatus.map((s) => ({
    name: s._id === "in_progress" ? "In Progress" : s._id.charAt(0).toUpperCase() + s._id.slice(1),
    value: s.count,
    fill: COLORS[s._id] || "#6366f1",
  }));

  const priorityData = analytics.byPriority.map((p) => ({
    name: p._id.charAt(0).toUpperCase() + p._id.slice(1),
    count: p.count,
    fill: P_COLORS[p._id] || "#6366f1",
  }));

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm">Overview of all task metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatBox label="Total Tasks" value={analytics.total} color="text-indigo-600" />
        <StatBox label="Completion Rate" value={`${analytics.completionRate}%`} color="text-green-600" sub="Tasks marked as done" />
        <StatBox label="Overdue Tasks" value={analytics.overdue} color="text-red-500" sub="Past due date, not done" />
        <StatBox label="Done" value={analytics.byStatus.find((s) => s._id === "done")?.count || 0} color="text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Tasks by Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {statusData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Tasks by Priority</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData} barSize={40}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {priorityData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;