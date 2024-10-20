import React from "react";
import selfDrive from "../assets/selfDrive.png";

const LandingTwo = () => {
  return (
    <>
      <div className="m-[52px] h-[100vh]">
        <p className="font-bold text-2xl">
          Easy rentals with self drive and driver options!
        </p>
        {/* parent div for the self drive and rent with car  */}
        <div className="flex justify-center gap-[300px] mt-[90px] border-yellow-300">
          {/* div for self drive */}
          <div className="flex gap-12">
            <div className="bg-yellow-400 rounded-3xl w-fit p-5 pl-9 pr-9 ">
              <img src={selfDrive} alt="self drive" className="h-[10vh]" />
            </div>
            <p className="self-center font-semibold"> Self Drive</p>
          </div>

          {/*  rent with driver */}
          <div className="flex gap-12">
            <div className="bg-yellow-400 rounded-3xl w-fit p-5 pl-9 pr-9 ">
              <img src={selfDrive} alt="self drive" className="h-[10vh]" />
            </div>
            <p className="self-center font-semibold"> Rent with Driver </p>
          </div>
        </div>

        <p className="font-bold text-xl mt-[100px]">
          Simple and Straight-forward Procedures
        </p>
        {/* procedure content */}
        <div className="flex  mt-[100px] gap-5 justify-center">
          {/* 1 */}
          <div className="flex flex-col gap-6 w-fit relative">
            <div className="bg-yellow-400 w-[70px] h-[70px] p-5 rounded-full self-center">
              <p className="text-center font-bold">1</p>
            </div>
            <p className="w-[250px] text-center font-semibold">
              Select between self drive and rental with driver
            </p>
          </div>

          {/* horizontal dashed line */}
          <div className="w-[200px] border-t-[2px] border-dashed border-black absolute left-[390px] mt-8"></div>

          {/* 2 */}
          <div className="flex flex-col gap-6 w-fit">
            <div className="bg-yellow-400 w-[70px] h-[70px] p-5 rounded-full self-center">
              <p className="text-center font-bold">2</p>
            </div>
            <p className="w-[250px] text-center font-semibold">
              Select destination pickup and drop off
            </p>
          </div>

          {/* horizontal dashed line */}
          <div className="w-[200px] border-t-[2px] border-dashed border-black absolute left-[160px] mt-8 ml-[500px]"></div>

          {/* 3 */}
          <div className="flex flex-col gap-6 w-fit">
            <div className="bg-yellow-400 w-[70px] h-[70px] p-5 rounded-full self-center">
              <p className="text-center font-bold">3</p>
            </div>
            <p className="w-[250px] text-center font-semibold">
              Browse cars and make your booking
            </p>
          </div>

          {/* horizontal dashed line */}
          <div className="w-[200px] border-t-[2px] border-dashed border-black absolute left-[160px] mt-8 ml-[770px]"></div>

          {/* 4   */}
          <div className="flex flex-col gap-6 w-fit">
            <div className="bg-yellow-400 w-[70px] h-[70px] p-5 rounded-full self-center">
              <p className="text-center font-bold">4</p>
            </div>
            <p className="w-[250px] text-center font-semibold">
              Sit back and enjoy your car journey through Wheels on Demand
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingTwo;
