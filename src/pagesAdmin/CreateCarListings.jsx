import React from "react";

const CreateCarListings = () => {
  return (
    <>
      <div className=" bg-yellow-gray w-[100vw] h-[100vh] flex justify-center items-center flex-col gap-4 opacity-95">
        <p className="text-4xl font-bold">Create Driver Listings</p>
        <div className="bg-white bg-opacity-75 w-[55vw] pt-9 pb-9  rounded-2xl shadow-xl border ">
          <form className="flex flex-col gap-10 justify-center items-center ">
            {/* brand and model */}
            <div className="flex gap-[140px]">
              <div className="flex flex-col gap-1">
                <p>Brand</p>
                <input
                  type="text"
                  name="brand"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1 w-[250px]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Model</p>
                <input
                  type="text"
                  name="model"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1 w-[250px]"
                />
              </div>
            </div>

            {/* year fuel type transmission */}
            <div className="flex gap-[80px]">
              <div className="flex flex-col gap-1">
                <p>Year</p>
                <input
                  type="text"
                  name="year"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Fuel Type</p>
                <select
                  name="fuelType"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1 w-[10vw]"
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <p>Transmission Type</p>
                <select
                  name="transmissionType"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
            </div>

            {/* seating capacity mileage number plate */}
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <p>Seating Capacity</p>
                <input
                  type="text"
                  name="seatingCapacity"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Mileage</p>
                <input
                  type="text"
                  name="mileage"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Number Plate</p>
                <input
                  type="text"
                  name="numberPlate"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                />
              </div>
            </div>

            {/* short distance base price and long distance */}
            <div className="flex gap-6 self-start ml-[100px] ">
              <div className="flex flex-col gap-1">
                <p>Short distance base price</p>
                <input
                  type="text"
                  name="shortDistanceBasePrice"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Long distance base price</p>
                <input
                  type="text"
                  name="longDistanceBasePrice"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                />
              </div>
            </div>

            <input type="file" name="image"className="self-start ml-[100px]"/>
            <button
              type="submit"
              className="on hover:bg-yellow-400 pl-4 pr-4 pt-2 pb-2 rounded-[10px] bg-black text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCarListings;
