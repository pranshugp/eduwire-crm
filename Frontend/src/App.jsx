import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import LeadsPage from './pages/Leadpage';
import NewEnquiryPage from './pages/NewEnquiryPage';
import NotFoundPage from './pages/NotPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
    <Route path="/leads" element={<PrivateRoute element={<LeadsPage />} allowedRoles={['admin', 'counsellor']} />} />
<Route path="/leads/new" element={<PrivateRoute element={<NewEnquiryPage />} allowedRoles={['admin', 'counsellor']} />} />
<Route path="/leads/edit/:id" element={<PrivateRoute element={<NewEnquiryPage />} allowedRoles={['admin']} />} />
<Route path="/leads/mine" element={<PrivateRoute element={<LeadsPage/>} allowedRoles={['counsellor']} />} />


{/* Student only routes */}
<Route path="/student/info" element={<PrivateRoute element={<h1>hi student</h1>} allowedRoles={['student']} />} />
<Route path="/student/request-edit" element={<PrivateRoute element={<h1>Request edit</h1>} allowedRoles={['student']} />} />

{/* Catch-all */}
<Route path="*" element={<NotFoundPage />} />
<Route path="/login"element={<Login />} />
<Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;