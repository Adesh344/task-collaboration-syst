import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, BarChart2, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/analytics", label: "Analytics", icon: BarChart2 },
];

const Sidebar = ({ open, onClose }) => (
  <>
    {open && <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={onClose} />}
    <aside className={`fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-100 z-30 transition-transform duration-200
      ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
      <div className="h-14 flex items-center justify-between px-5 border-b border-gray-100">
        <span className="font-bold text-indigo-600 text-lg">TaskFlow</span>
        <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-gray-100">
          <X size={18} />
        </button>
      </div>
      <nav className="p-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isActive ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`
            }
            onClick={onClose}>
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  </>
);

export default Sidebar;