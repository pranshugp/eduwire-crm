import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p>Your role: {user?.role}</p>
      {/* Render role-specific lead data here */}
    </div>
  );
};

export default Dashboard;