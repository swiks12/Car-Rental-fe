import React from "react";
import selfDrive from "../assets/selfDriveBg.png";

const SelfDrivePage = () => {
  return (
    <>
      <img
        src={selfDrive}
        alt="selDrive"
        className="h-[100vh] w-[100vw] object-cover z-[-1000] relative"
      />

      <div className="bg-white absolute top-[150px] left-[550px] pl-8 pr-8 pt-12 pb-12 bg-opacity-40 rounded-lg">
        <p className="text-center font-bold text-xl mb-2">Booking Details</p>
        <form>
          <div className="flex gap-12">
            <div className="flex flex-col">
              <p className="font-semibold">Booking Start Date</p>
              <input
                type="text"
                name="bookStartDate"
                className="border w-[150px]"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">Booking End Date</p>
              <input
                type="text"
                name="bookEndDate"
                className="border w-[150px]"
              />
            </div>
          </div>

          <p className="text-center font-bold  text-xl mt-5 mb-2">
            Pick Up Details
          </p>
          {/* pickup details */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-12">
              <div className="flex flex-col">
                <p className="font-semibold">Pick Up Destination</p>
                <input type="text" name="pickUp" className="border w-[150px]" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Destination</p>
                <input
                  type="text"
                  name="destination"
                  className="border w-[150px]"
                />
              </div>
            </div>

            <div className="flex gap-12">
              <div className="flex flex-col">
                <p className="font-semibold">Pick Up Time</p>
                <input
                  type="text"
                  name="pickUpTime"
                  className="border w-[150px]"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Drop Off Time</p>
                <input
                  type="text"
                  name="dropOffTime"
                  className="border w-[150px]"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="pl-3 pr-3 pt-4 pb-5 bg-black text-white rounded-2xl w-[5vw] "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SelfDrivePage;
