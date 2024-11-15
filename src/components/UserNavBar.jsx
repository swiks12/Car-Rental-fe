import React from "react";
import logo from "../assets/logo-white.png";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserNavBar = () => {
  const navigate = useNavigate();
  const logOut=()=>{
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login")

  }
  return (
    <>
      <div className="flex items-center  mr-5  fixed w-[100vw] bg-black  bg-opacity-60 ">
        <img src={logo} alt="logo" className="h-[12vh]" />
        <div className="flex justify-end w-full gap-12 mr-12 text-black">
          <p
            className="font-bold text-white"
            onClick={() => {
              navigate("/user/home");
            }}
          >
            Home
          </p>
          <p className="font-bold text-white">Bookings</p>
          <p className="font-bold text-white">About</p>
          <p className="font-bold text-white">Contact Us</p>
          <p className="font-bold text-white">Profile</p>
          <p className="font-bold text-white " onClick={logOut}>Log Out</p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default UserNavBar;
