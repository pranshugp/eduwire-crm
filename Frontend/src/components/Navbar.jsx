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
  <img src="https://sdmntprwestus.oaiusercontent.com/files/00000000-85cc-6230-b823-6a10010ee90d/raw?se=2025-06-05T12%3A24%3A06Z&sp=r&sv=2024-08-04&sr=b&scid=693f6a98-516f-587d-88cf-10d02b2e7f6a&skoid=789f404f-91a9-4b2f-932c-c44965c11d82&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-04T17%3A27%3A56Z&ske=2025-06-05T17%3A27%3A56Z&sks=b&skv=2024-08-04&sig=rRjk%2BcrQDu%2B7sVr6cLKBOx62xWBU/uR3slIe0miMg/o%3D" alt="Logo" className="h-10" />
  <div className="flex items-center gap-4">
    {user && <span className='capitalize'>{user.name}</span>}
    <button onClick={handleLogout} className="bg-blue-800 px-3 py-1 rounded text-sm">
       <LogOut size={20} />
    
    </button>
  </div>
</nav>
  );
};

export default Navbar;
