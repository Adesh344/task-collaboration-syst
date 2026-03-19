import { LogOut, Menu, Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ onMenuClick }) => {
  const { user, handleLogout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 h-14 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100">
          <Menu size={20} />
        </button>
        <span className="font-bold text-indigo-600 text-lg">TaskFlow</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 relative">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold text-xs">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
        </div>
        <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;