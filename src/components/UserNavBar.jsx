import React from "react";
import logo from "../assets/logo.png";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserNavBar = () => {
    const navigate=useNavigate();
  return (
    <>
      <div className="flex items-center ml-2 mr-5  fixed w-[100vw] bg-white  bg-opacity-20">
        <img src={logo} alt="logo" className="h-[12vh]" />
        <div className="flex justify-end w-full gap-12 mr-12 text-black">
          <p className="font-bold" onClick={()=>{navigate("/user/home")}}>Home</p>
          <p className="font-bold">Bookings</p>
          <p className="font-bold">About</p>
          <p className="font-bold">Contact Us</p>
          <p className="font-bold">Profile</p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default UserNavBar;
