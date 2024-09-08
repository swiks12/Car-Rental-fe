import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pagesAdmin/LandingPage";
import Login from "./pagesAdmin/Login";
import SignUp from "./pagesAdmin/SignUp";
import 'react-toastify/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      

    </Routes>
    </BrowserRouter>


  );
}

export default App;
