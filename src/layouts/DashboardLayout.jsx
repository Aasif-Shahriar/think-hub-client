import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaPlus,
  FaClipboardList,
  FaUserShield,
  FaBullhorn,
  FaComments,
  FaUsers,
} from "react-icons/fa";

const DashboardLayout = ({ isAdmin }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const userLinks = [
    { to: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
    { to: "/dashboard/add-post", label: "Add Post", icon: <FaPlus /> },
    { to: "/dashboard/my-posts", label: "My Posts", icon: <FaClipboardList /> },
  ];

  const adminLinks = [
    {
      to: "/dashboard/admin-profile",
      label: "Admin Profile",
      icon: <FaUserShield />,
    },
    { to: "/dashboard/manage-users", label: "Manage Users", icon: <FaUsers /> },
    {
      to: "/dashboard/reports",
      label: "Reported Comments",
      icon: <FaComments />,
    },
    {
      to: "/dashboard/announcement",
      label: "Make Announcement",
      icon: <FaBullhorn />,
    },
  ];

  const navLinks = isAdmin ? adminLinks : userLinks;

  return (
    <div className="flex min-h-screen bg-slate-900 text-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-slate-800 w-64 space-y-4 px-4 py-6 fixed md:static z-50 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <Link to="/" className="text-xl font-bold text-blue-400">
            DevTalk 🧠
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-gray-300">
            <FaTimes />
          </button>
        </div>

        <nav className="space-y-2">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition hover:bg-blue-600 hover:text-white ${
                  isActive ? "bg-blue-700 text-white" : "text-gray-300"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 text-sm text-gray-400">
          <button className="hover:text-red-400">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 w-full">
        {/* Topbar on mobile */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <button onClick={toggleSidebar} className="text-gray-300">
            <FaBars />
          </button>
        </div>

        {/* Page Content */}
        <div className="bg-slate-800 rounded-2xl p-6 min-h-[80vh] shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
