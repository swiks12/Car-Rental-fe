import React from "react";
import { Outlet } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <div className="flex h-[100vh] bg-yellow-400">
        <div className=" bg-black w-[15vw] rounded-r-[10px] opacity-80 ">
          <div className="h-[100vh] flex flex-col text-white ml-3">
            <div className="flex items-center gap-6 ">
              <img
                src="https://img.freepik.com/free-photo/close-up-excited-person-portrait_23-2151186652.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722470400&semt=ais_hybrid"
                alt="admin"
                className="h-[45px] w-[45px] rounded-full"
              />
              <p>Admin</p>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {/* content div */}
              <div className="border-t w-[14vw] border-b border-white">
                <p className="font-bold text-[15px] p-2 text-white w-[15vw]">
                  Management
                </p>
              </div>

              <div className="flex items-center gap-6  text-white ">
                <span class="material-symbols-outlined ">
                  swap_driving_apps_wheel
                </span>
                <p>Package</p>
              </div>

              <divflex className="flex items-center gap-6  text-white ">
                <span class="material-symbols-outlined">directions_car</span>
                <p>Car</p>
              </divflex>

              <div className="flex items-center gap-6  text-white ">
                <span class="material-symbols-outlined">search_hands_free</span>
                <p>Driver</p>
              </div>

              <div className="flex items-center gap-6  text-white ">
                <span class="material-symbols-outlined">group</span>
                <p>Users</p>
              </div>

              <div className="border-t w-[14vw] border-b border-white">
                <p className="font-bold text-[15px] p-2 text-white w-[15vw]">
                  AdminControls
                </p>
              </div>

              <div className="flex items-center gap-6  text-white ">
                <span class="material-symbols-outlined">new_releases</span>
                <p>Verification Requests</p>
              </div>

              <div className="flex items-center gap-6  text-white ">
                <span class="material-symbols-outlined">laptop_car</span>
                <p>Booking</p>
              </div>

              <div className="flex items-center gap-6  text-white ">
                <span class="material-symbols-outlined">payments</span>
                <p>Payment</p>
              </div>
            </div>

            {/* admin */}

            <div className="flex items-center gap-6 mt-auto  text-white border-t border-white w-[14vw] p-3">
              <span class="material-symbols-outlined ">logout</span>
              <p>Log Out</p>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default AdminSidebar;
