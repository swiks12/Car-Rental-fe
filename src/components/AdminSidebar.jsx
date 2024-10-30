import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <div className="flex h-[100vh]">
        <div
          className={`bg-black ${
            expanded ? "w-[15vw]" : "w-[4vw]"
          } rounded-r-[10px] opacity-80  transition-all duration-300`}
        >
          <div className="h-[100vh] flex flex-col text-white ml-3">
            <div className="flex items-center gap-6 ">
              <img
                src="https://img.freepik.com/free-photo/close-up-excited-person-portrait_23-2151186652.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722470400&semt=ais_hybrid"
                alt="admin"
                className="h-[45px] w-[45px] rounded-full"
              />
              {expanded && <p>Admin</p>} {/* Show text only when expanded */}
              {expanded ? (
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="p-2"
                >
                  {expanded ? (
                    <span class="material-symbols-outlined ">
                      chevron_backward
                    </span>
                  ) : (
                    <span class="material-symbols-outlined">
                      chevron_forward
                    </span>
                  )}
                </button>
              ) : (
                ""
              )}
            </div>

            {!expanded ? (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-2"
              >
                {expanded ? (
                  <span class="material-symbols-outlined ">
                    chevron_backward
                  </span>
                ) : (
                  <span class="material-symbols-outlined">chevron_forward</span>
                )}
              </button>
            ) : (
              ""
            )}

            <div className="flex flex-col gap-4 mt-6">
              {/* Content div for Management */}
              {expanded && (
                <div className="border-t w-[14vw] border-b border-white">
                  <p className="font-bold text-[15px] p-2 text-white w-[15vw]">
                    Management
                  </p>
                </div>
              )}

              <div className="flex items-center gap-6 text-white " onClick={()=>{navigate("/admin/package")}}>
                <span className="material-symbols-outlined">
                  swap_driving_apps_wheel
                </span>
                {expanded && <p>Package</p>}{" "}
                {/* Show text only when expanded */}
              </div>

              <div className="flex items-center gap-6 text-white">
                <span className="material-symbols-outlined">
                  directions_car
                </span>
                {expanded && <p>Car</p>} {/* Show text only when expanded */}
              </div>

              <div
                className="flex items-center gap-6 text-white"
                onClick={() => {
                  navigate("/admin/drivermgmt");
                }}
              >
                <span className="material-symbols-outlined">
                  search_hands_free
                </span>
                {expanded && <p>Driver</p>} {/* Show text only when expanded */}
              </div>

              <div className="flex items-center gap-6 text-white">
                <span className="material-symbols-outlined">group</span>
                {expanded && <p>Users</p>} {/* Show text only when expanded */}
              </div>

              {/* Content div for Admin Controls */}
              {expanded && (
                <div className="border-t w-[14vw] border-b border-white">
                  <p className="font-bold text-[15px] p-2 text-white w-[15vw]">
                    Admin Controls
                  </p>
                </div>
              )}

              <div className="flex items-center gap-6 text-white">
                <span className="material-symbols-outlined">new_releases</span>
                {expanded && <p>Verification Requests</p>}{" "}
                {/* Show text only when expanded */}
              </div>

              <div className="flex items-center gap-6 text-white">
                <span className="material-symbols-outlined">laptop_car</span>
                {expanded && <p>Booking</p>}{" "}
                {/* Show text only when expanded */}
              </div>

              <div className="flex items-center gap-6 text-white">
                <span className="material-symbols-outlined">payments</span>
                {expanded && <p>Payment</p>}{" "}
                {/* Show text only when expanded */}
              </div>
            </div>

            {/* Admin section */}
            <div
              className={`flex items-center gap-6 mt-auto text-white ${
                expanded ? "border-t border-white" : ""
              }  w-[14vw] p-3`}
            >
              <span className="material-symbols-outlined">logout</span>
              {expanded && <p>Log Out</p>} {/* Show text only when expanded */}
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default AdminSidebar;
