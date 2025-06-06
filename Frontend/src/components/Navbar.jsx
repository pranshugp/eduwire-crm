import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { LogOut } from "lucide-react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center ">
      <div className='h-[40px] w-[60px] bg-white flex align-middle justify-center rounded-lg'>
        <img
        src="logo-crm.png"
        alt="Logo"
        className=" h-[100%] w-[100%] object-cover"
      />
      </div>

      {/* Only show user info and logout if user is logged in */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="capitalize">{user.name}</span>
          <button onClick={handleLogout} className="bg-blue-800 px-3 py-1 rounded text-sm">
            <LogOut size={20} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
