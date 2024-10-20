import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pagesAdmin/LandingPage";
import Login from "./pagesAdmin/Login";
import SignUp from "./pagesAdmin/SignUp";
import "react-toastify/ReactToastify.css";
import UserDashboard from "./pagesUser/UserDashboard";
import AdminDashboard from "./pagesAdmin/AdminDashboard";
import AdminSidebar from "./components/AdminSidebar";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
