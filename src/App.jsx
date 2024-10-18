import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pagesAdmin/LandingPage";
import Login from "./pagesAdmin/Login";
import SignUp from "./pagesAdmin/SignUp";
import 'react-toastify/ReactToastify.css';
import UserDashboard from "./pagesUser/UserDashboard";
import AdminDashboard from "./pagesAdmin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/userDashboard" element={<UserDashboard/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>}/>


    </Routes>
    </BrowserRouter>


  );
}

export default App;
