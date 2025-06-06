import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaHome, FaUser, FaClipboardList, FaUserEdit, FaSignInAlt, FaUserPlus,
  FaGlobe, FaFlag, FaPlusCircle
} from 'react-icons/fa';

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <aside
      className="h-screen bg-white text-black fixed top-18 left-0 
                 transition-all duration-300 ease-in-out group 
                 hover:w-64 w-16 overflow-hidden z-20 
                 border-r border-gray-300 shadow-sm"
    >
      <nav className="flex flex-col gap-4 p-4">
        {!user ? (
          <>
            <SidebarItem to="/login" icon={<FaSignInAlt className="text-blue-600" />} label="Login" />
            <SidebarItem to="/register" icon={<FaUserPlus className="text-blue-600" />} label="Register" />
          </>
        ) : (
          <>
            <SidebarItem to="/dashboard" icon={<FaHome className="text-blue-600" />} label="Dashboard" />

            <SidebarItem to="/countries" icon={<FaGlobe className="text-blue-600" />} label="All Countries" />
            <SidebarItem to="/representing-countries" icon={<FaFlag className="text-blue-600" />} label="Representing Countries" />

            {user.role === 'admin' && (
              <>
                <SidebarItem to="/representing-countries/add" icon={<FaPlusCircle className="text-blue-600" />} label="Add Representing" />
                <SidebarItem to="/leads" icon={<FaClipboardList className="text-blue-600" />} label="All Leads" />
                <SidebarItem to="/admin/counsellors" icon={<FaUser className="text-blue-600" />} label="Manage Users" />
              </>
            )}

            {user.role === 'counsellor' && (
              <>
                <SidebarItem to="/leads/mine" icon={<FaClipboardList className="text-blue-600" />} label="My Leads" />
                <SidebarItem to="/leads/new" icon={<FaUserEdit className="text-blue-600" />} label="Add Lead" />
              </>
            )}

            {user.role === 'student' && (
              <>
                <SidebarItem to="/student/info" icon={<FaUser className="text-blue-600" />} label="My Info" />
                <SidebarItem to="/student/request-edit" icon={<FaUserEdit className="text-blue-600" />} label="Request Edit" />
              </>
            )}

            <SidebarItem to="/profile" icon={<FaUser className="text-blue-600" />} label="My Profile" />
          </>
        )}
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center space-x-4 p-2 rounded hover:bg-blue-500 hover:text-white transition"
  >
    <span className="text-lg">{icon}</span>
    <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </Link>
);

export default Sidebar;
