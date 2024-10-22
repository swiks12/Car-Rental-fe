import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pagesAdmin/LandingPage";
import Login from "./pagesAdmin/Login";
import SignUp from "./pagesAdmin/SignUp";
import "react-toastify/ReactToastify.css";
import UserDashboard from "./pagesUser/UserDashboard";
import AdminDashboard from "./pagesAdmin/AdminDashboard";
import AdminSidebar from "./components/AdminSidebar";
import DriverMangement from "./pagesAdmin/DriverMangement";
import CreateDriverListings from "./pagesAdmin/CreateDriverListings";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminSidebar />}>
          {/* Nested admin dashboard route */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="drivermgmt" element={<DriverMangement />} />
          <Route path="drivermgmt/create" element={<CreateDriverListings />} />
            


        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
