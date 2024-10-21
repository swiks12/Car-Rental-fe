import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DriverMangement = () => {
    const navigate=useNavigate();
  return (
    <>
    <div className="mt-auto ml-auto  m-5">
      <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center " onClick={()=>{navigate("/admin/drivermgmt/create")}} >
        <span class="material-symbols-outlined ">add</span>
      </div>
    </div>
    <Outlet/>
    </>
    
  );
};

export default DriverMangement;
