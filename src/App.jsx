import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pagesAdmin/LandingPage";
import Login from "./pagesAdmin/Login";
import SignUp from "./pagesAdmin/SignUp";
import "react-toastify/ReactToastify.css";
import UserDashboard from "./pagesUser/UserHome";
import AdminDashboard from "./pagesAdmin/AdminDashboard";
import AdminSidebar from "./components/AdminSidebar";
import DriverMangement from "./pagesAdmin/DriverMangement";
import CreateDriverListings from "./pagesAdmin/CreateDriverListings";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UpdateDriver from "./pagesAdmin/UpdateDriver";
import CarManagement from "./pagesAdmin/CarManagement";
import CreateCarListings from "./pagesAdmin/CreateCarListings";
import Package from "./pagesAdmin/Package";
import UpdateCars from "./pagesAdmin/UpdateCars";
import UserNavBar from "./components/UserNavBar";
import UserHome from "./pagesUser/UserHome";
import SelfDrivePage from "./pagesUser/SelfDrivePage";
import GetCars from "./pagesUser/GetCars";
import CarDetails from "./pagesUser/CarDetails";
import RentWithDriver from "./pagesUser/RentWithDriver";
import UserBookings from "./pagesUser/UserBookings";
import GetUsers from "./pagesAdmin/GetUsers";

function App() {
  return (
    <>
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
            {/* driver management ma view ko pani kaam huncha */}
            <Route path="drivermgmt" element={<DriverMangement />} />
            <Route
              path="drivermgmt/create"
              element={<CreateDriverListings />}
            />
            <Route path="drivermgmt/update/:id" element={<UpdateDriver />} />

            <Route path="carmgmt" element={<CarManagement />} />
            <Route path="carmgmt/create" element={<CreateCarListings />} />
            <Route path="carmgmt/update/:id" element={<UpdateCars />} />

            <Route path="package" element={<Package />} />
            <Route path="user" element={<GetUsers />} />
          </Route>

          {/* user routes */}
          <Route path="/user" element={<UserNavBar />}>
            <Route path="home" element={<UserHome />} />
            <Route path="selfDrive" element={<SelfDrivePage />} />
            <Route path="rentWithDriver" element={<RentWithDriver />} />
            <Route
              path="getCars/:id/:bookingStartDate/:bookingEndDate"
              element={<GetCars />}
            />
            <Route
              path="carDetails/:bookingId/:carId"
              element={<CarDetails />}
            />
            <Route path="userBookings" element={<UserBookings/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
