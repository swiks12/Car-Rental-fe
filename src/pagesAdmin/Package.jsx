import React, { useEffect, useState } from "react";
import packageImg from "../assets/packageCar.png";
import axios from "axios";
import { toast } from "react-toastify";


const Package = () => {
  const [data, setData] = useState({
    shortDistancePackage: "",
    longDistancePackage: "",
    driverShortDistance: "",
    driverLongDistance: "",
  });

  // input.name ma aru fata change nagara khali aru jj change hunhca tyo change gardai basne
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    const getPackageData = async () => {
      try {
        const url = " http://localhost:4000/package/get";
        const { data: res } = await axios.get(url);
        setData(res);
        console.log(res)
      } catch (error) {
        console.error("Error fetching driver info:", error);
      }
    };
    getPackageData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = " http://localhost:4000/package/update";
      const { data: res } = await axios.put(url, data);
      toast.success(res.message);
    } catch (error) {
      toast.error("Cannot update data!");
    }
  };

  return (
    <div className="flex gap-[120px]">
      <img
        src={packageImg}
        alt="package image"
        className="w-[45vw] h-[100vh] object-cover"
      />
      <div className="flex flex-col gap-6 justify-center items-center">
        <p className="font-bold text-3xl">Package Management</p>
        <div>
          <p className="bg-black text-white pt-1 pb-1 pl-2 pr-2 rounded-xl w-[28vw]">
            Distance Upper Limits
          </p>
        </div>

        {/* short distance and long question */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <p>Short distance</p>
            <input
              type="number"
              name="shortDistancePackage"
              className="border border-black pt-1 pb-1 pl-2 pr-2 rounded-xl"
              onChange={handleChange}
              value={data.shortDistancePackage}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Long distance</p>
            <input
              type="number"
              name="longDistancePackage"
              className=" border border-black pt-1 pb-1 pl-2 pr-2 rounded-xl"
              onChange={handleChange}
              value={data.longDistancePackage}
            />
          </div>
        </div>

        {/* Driver prices */}
        <div className="mt-8">
          <p className="bg-black text-white pt-1 pb-1 pl-2 pr-2 rounded-xl w-[28vw]">
            Driver Price Upper Limits
          </p>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <p>Short distance</p>
            <input
              type="number"
              name="driverShortDistance"
              className="border border-black pt-1 pb-1 pl-2 pr-2 rounded-xl"
              onChange={handleChange}
              value={data.driverShortDistance}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Long distance</p>
            <input
              type="number"
              name="driverLongDistance"
              className="border border-black pt-1 pb-1 pl-2 pr-2 rounded-xl"
              onChange={handleChange}
              value={data.driverLongDistance}
            />
          </div>
        </div>

        <button
          type="submit"
          c
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Package;
