import React from "react";
import bckground from "../assets/userDashImg.jpg";
import selfDrive from "../assets/selfDrive.png";
import withDriver from "../assets/rentWithDriver.png";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate=useNavigate();
  return (
    <>
      <div>
        <img
          src={bckground}
          alt="bg"
          className="h-[100vh] w-[100vw] object-cover relative z-[-1000]"
        />
        <p className="absolute top-[180px] text-white text-3xl left-[180px]">Looking for a <span className="text-yellow-400 font-bold">Car?</span> Rent a Car in just Few Easy Steps</p>
        <div className="flex justify-center items-center ">
          <div className="absolute top-[250px] bg-white p-10 rounded-lg">
            <div className="flex gap-[100px] w-fit p-4 border-gray-300 ">
              <div className="flex flex-col  gap-2 items-center pt-1 pb-1 pl-8 pr-8 border rounded-lg h-fit" onClick={()=>{navigate("/user/selfDrive")}}>
                <img src={selfDrive} alt="self" className="h-[80px] w-[40px]" />
                <p className="font-semibold">Self Drive</p>
              </div>
              <div className="flex flex-col gap-2 items-center   pt-1 pb-1 pl-2 pr-2 border rounded-lg h-fit" onClick={()=>{navigate("/user/rentwithDriver")}}>
                <img 
                  src={withDriver}
                  alt="withDriver"
                  className="h-[80px] w-[80px]"
                />
                <p className="font-semibold">Rent With Driver</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
