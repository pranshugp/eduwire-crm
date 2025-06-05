import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice'; // Make sure you have this action

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Enquiry CRM</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>

            {/* Role-based Links */}
            {user.role === 'admin' && (
              <>
                <Link to="/leads">All Leads</Link>
                 <Link to="/admin/counsellors" className="text-blue-600 hover:underline">
    Manage Users
  </Link>
              </>
            )}

            {user.role === 'counsellor' && (
              <>
                <Link to="/leads/mine">My Leads</Link>
                <Link to="/leads/new">Add Lead</Link>
              </>
            )}

            {user.role === 'student' && (
              <>
                <Link to="/student/info">My Info</Link>
                <Link to="/student/request-edit">Request Edit</Link>
              </>
            )}

            {user && (
  <Link to="/profile" className="text-blue-500 underline">My Profile</Link>
)}

            <button
              onClick={handleLogout}
              className="bg-red-800 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
