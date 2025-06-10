import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaHome, FaUser, FaClipboardList, FaUserEdit, FaSignInAlt, FaUserPlus,
  FaGlobe, FaFlag, FaPlusCircle, FaChevronDown
} from 'react-icons/fa';
import { useState } from 'react';

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const [openMenu, setOpenMenu] = useState(null);

  const handleMouseEnter = (menu) => setOpenMenu(menu);
  const handleMouseLeave = () => setOpenMenu(null);

  return (
    <aside className="h-screen bg-white text-black fixed top-18 left-0 
                     transition-all duration-300 ease-in-out group 
                     hover:w-64 w-16 overflow-hidden z-20 
                     border-r border-gray-300 shadow-sm">
      <nav className="flex flex-col gap-4 p-4">
        {!user ? (
          <>
            <SidebarItem to="/login" icon={<FaSignInAlt />} label="Login" />
            <SidebarItem to="/register" icon={<FaUserPlus />} label="Register" />
          </>
        ) : (
          <>
            <SidebarItem to="/dashboard" icon={<FaHome />} label="Dashboard" />

            {/* Countries Dropdown */}
            <SidebarDropdown
              icon={<FaGlobe />} label="Countries" open={openMenu === 'countries'}
              onMouseEnter={() => handleMouseEnter('countries')}
              onMouseLeave={handleMouseLeave}
              items={[
                { to: '/countries', label: 'All Countries' },
                { to: '/representing-countries', label: 'Representing Countries' },
                { to: '/representing-countries/add', label: 'Add Country' },
              ]}
            />

            {/* Manage Users Dropdown */}
            {user.role === 'admin' && (
              <SidebarDropdown
                icon={<FaUser />} label="Manage Users" open={openMenu === 'users'}
                onMouseEnter={() => handleMouseEnter('users')}
                onMouseLeave={handleMouseLeave}
                items={[
                  { to: '/admin/counsellors/add', label: 'Add Counsellor' },
                  { to: '/admin/counsellors', label: 'View All Counsellors' },
                ]}
              />
            )}

            {/* Institutions */}
            {user.role === 'admin' || user.role === 'counsellor' ? (
              <SidebarDropdown
                icon={<FaFlag />} label="Institutions" open={openMenu === 'institutions'}
                onMouseEnter={() => handleMouseEnter('institutions')}
                onMouseLeave={handleMouseLeave}
                items={[
                  ...(user.role === 'admin' ? [{ to: '/institutions/add', label: 'Add Institution' }] : []),
                  { to: '/institutions', label: 'View Institutions' },
                ]}
              />
            ) : null}

            {/* Leads */}
            {(user.role === 'admin' || user.role === 'counsellor') && (
              <SidebarDropdown
                icon={<FaClipboardList />} label="Leads" open={openMenu === 'leads'}
                onMouseEnter={() => handleMouseEnter('leads')}
                onMouseLeave={handleMouseLeave}
                items={[
                  { to: user.role === 'admin' ? '/leads' : '/leads/mine', label: user.role === 'admin' ? 'All Leads' : 'My Leads' },
                  { to: '/leads/new', label: 'Add Lead' },
                  ...(user.role === 'admin' ? [{ to: '/leads/assign', label: 'Assign Lead' }] : []),
                ]}
              />
            )}

            {/* Applications */}
            {(user.role === 'admin' || user.role === 'counsellor') && (
              <SidebarDropdown
                icon={<FaUserEdit />} label="Applications" open={openMenu === 'applications'}
                onMouseEnter={() => handleMouseEnter('applications')}
                onMouseLeave={handleMouseLeave}
                items={[
                  { to: '/applications', label: 'All Applications' },
                  { to: '/applications/new', label: 'Add Application' },
                ]}
              />
            )}

            {/* Student-only */}
            {user.role === 'student' && (
              <>
                <SidebarItem to="/student/info" icon={<FaUser />} label="My Info" />
                <SidebarItem to="/student/request-edit" icon={<FaUserEdit />} label="Request Edit" />
              </>
            )}

            <SidebarItem to="/profile" icon={<FaUser />} label="My Profile" />
          </>
        )}
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center space-x-4 p-2 rounded hover:bg-blue-500 hover:text-white transition">
    <span className="text-lg">{icon}</span>
    <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </Link>
);

const SidebarDropdown = ({ icon, label, items, open, onMouseEnter, onMouseLeave }) => (
  <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="flex items-center space-x-4 p-2 rounded hover:bg-blue-500 hover:text-white transition cursor-pointer">
      <span className="text-lg">{icon}</span>
      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1">
        {label}
      </span>
      <FaChevronDown className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
    </div>
    {open && (
      <div className="absolute left-16 top-0 bg-white border shadow-md z-50 rounded-md overflow-hidden w-48">
        {items.map(({ to, label }, idx) => (
          <Link key={idx} to={to} className="block px-4 py-2 hover:bg-blue-100 text-sm">
            {label}
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default Sidebar;
