import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import LeadsPage from './pages/Leadpage';
import NewEnquiryPage from './pages/NewEnquiryPage';
import NotFoundPage from './pages/NotPage';
import Profile from './pages/Profile';
import AdminCounsellorList from './pages/AdminCounsellorList';
import AdminCounsellorDetails from './pages/AdminCourseDetails';
import RequestEdit from './pages/RequestEdit';
import Sidebar from './components/Sidebar';
import ViewCountries from './pages/ViewCountries';
import ViewRepresentingCountries from './pages/ViewRepresentingCountries';
import AddRepresentingCountry from './pages/AddRepresentingCountry';
import ManageStatuses from './pages/ManageStatuses';
import AddInstitution from './pages/AddInstitution';
import ViewInstitutions from './pages/ViewInstitution';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';

import VerifyOtp from './components/VerifyOtp';
import AddCounsellor from './components/AddCounsellor';
import ViewApplications from './components/ViewApplications';
import ApplicationForm from './components/ApplicationForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar/>
      <Routes>
         <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} allowedRoles={['admin', 'counsellor','student']} />} />
    <Route path="/leads" element={<PrivateRoute element={<LeadsPage />} allowedRoles={['admin', 'counsellor']} />} />
<Route path="/leads/new" element={<PrivateRoute element={<NewEnquiryPage />} allowedRoles={['admin', 'counsellor']} />} />
<Route path="/leads/edit/:id" element={<PrivateRoute element={<NewEnquiryPage />} allowedRoles={['admin']} />} />
<Route path="/leads/mine" element={<PrivateRoute element={<LeadsPage/>} allowedRoles={['counsellor']} />} />
<Route path="/countries" element={<ViewCountries />} />
<Route path="/representing-countries" element={<ViewRepresentingCountries />} />
<Route path="/representing-countries/add" element={<PrivateRoute element={<AddRepresentingCountry />} allowedRoles={['admin']} />} />
<Route path="/verify-email" element={<VerifyEmail />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/admin/counsellors/add" element={
  <PrivateRoute allowedRoles={['admin']} element={<AddCounsellor />} />
} />
         <Route path="/applications" element={<PrivateRoute allowedRoles={['admin','counsellor']} element={<ViewApplications/>} />}/>
        <Route path="/applications/new" element={<PrivateRoute allowedRoles={['admin','counsellor']} element={<ApplicationForm/>} />}  />
        <Route path="/applications/edit/:id" element={<PrivateRoute allowedRoles={['admin','counsellor']} element={<ApplicationForm/>} />} />
<Route path="/institutions/add" element={<PrivateRoute allowedRoles={['admin']} element={<AddInstitution />} />} />
<Route path="/institutions" element={<PrivateRoute allowedRoles={['admin', 'counsellor']} element={<ViewInstitutions/>} />} />


{/* Student only routes */}
<Route path="/student/info" element={<PrivateRoute element={<Profile/>} allowedRoles={['student']} />} />
<Route path="/student/request-edit" element={<PrivateRoute element={<RequestEdit/>} allowedRoles={['student']} />} />

{/* Catch-all */}
<Route path="*" element={<NotFoundPage />} />
<Route path="/login"element={<Login />} />
<Route path="/register" element={<Register />} />

<Route path="/profile" element={<PrivateRoute element={<Profile />} allowedRoles={['admin', 'student', 'counsellor']} />} />
<Route
  path="/admin/counsellors"
  element={
    <PrivateRoute allowedRoles={['admin']} element={<AdminCounsellorList />} />
  }
/>
<Route
  path="/admin/counsellors/:id"
  element={
    <PrivateRoute allowedRoles={['admin']} element={<AdminCounsellorDetails/>} />
  }
/>



      </Routes>
    </Router>
  );
}

export default App;