import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const DriverMangement = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // useState is  a function that takes a function and a dependency value

  useEffect(() => {
    const fetchDrivers = async () => {
      const url = "http://localhost:4000/driver/getDrivers";
      const { data: res } = await axios.get(url, data);
      setData(res);
    };
    fetchDrivers();
  }, []);
  return (
    <>
      <div className="bg-yellow-gray w-[100vw]">
        <p className="text-4xl font-extrabold text-center w-[80vw] mt-9">Driver Management</p>
        <div className="mt-[58px] flex gap-12 m-[100px] ">
          {data.map((item, key) => (
            <div
              key={key}
              className=" border-yellow-200 border-[2px] rounded-xl w-[12vw] flex flex-col justify-center items-center pt-4 pb-4 bg-white"
            >
              <img
                src={item.image.url}
                alt="driverPhoto"
                className="h-[110px] w-[110px] rounded-full"
              />
              <p className=" font-semibold mt-2">{item.name}</p>
              <div className="flex gap-5 mt-2">
                <span class="material-symbols-outlined text-blue-600">edit</span>
                <span class="material-symbols-outlined text-red-500">delete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed right-0 bottom-0 m-6">
        <div
          className="h-[60px] w-[60px] rounded-full bg-black text-white flex items-center justify-center"
          onClick={() => {
            navigate("/admin/drivermgmt/create");
          }}
        >
          <span class="material-symbols-outlined ">add</span>
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
};

export default DriverMangement;
