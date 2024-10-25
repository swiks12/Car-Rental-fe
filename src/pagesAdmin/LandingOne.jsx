import React from 'react'
import logo from "../assets/logo.png";

import car from "../assets/carLandingPage.jpg";
import { useNavigate } from 'react-router-dom';




const LandingOne = () => {
    const navigate=useNavigate();
  return (
    <>
    <div className="relative">
        <img src={car} alt="car" className="h-[100vh] w-[100vw] object-cover" />
      </div>
      <div className="m-[88px]">
        <div className="absolute top-14 left-[150px] ">
          <img src={logo} alt="logo" className="h-[40vh] ml-[60px]" />
          <div className=" absolute top-[200px] ">
            <p className="font-extrabold text-5xl text-nowrap">Wheels on Demand</p>
            <p className="font-semibold text-2xl text-nowrap ">
              Effortless Rentals,Unforgettable Experiences
            </p>
          </div>
        </div>
        <div className="flex gap-8 absolute top-[400px] left-[160px]">
          <button className="bg-yellow-400 text-black font-bold  pl-5 pr-5 pt-3 pb-3 text-center rounded-[10px] " onClick={()=>{navigate("/login")}}>
            Login
          </button>
          <button className=" text-black font-bold  pl-4 pr-4 pt-2 pb-2 text-center rounded-[10px] border-yellow-300 border-[3px]" onClick={()=>{navigate("/signUp")}}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  )
}

export default LandingOne