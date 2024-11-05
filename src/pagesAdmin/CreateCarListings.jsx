import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateCarListings = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    brand: "",
    model: "",
    year: "",
    fuelType: "petrol",
    transmissionType: "automatic",
    seatingCapacity: "",
    mileage: "",
    numberPlate: "",
    shortDistanceBasePrice: "",
    longDistanceBasePrice: "",
    image: "",
  });

  // handleChaneg for each input
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // cloudinary upload logic
  const handleImage = (e) => {
    if (!e.target.value) {
      return;
    }
    const file = e.target.files[0];
    previewFile(file);
    console.log(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();

    // This method reads the contents of the file as a "data URL." A data URL is basically a base64-encoded version of the file, which you can use to display the image directly in the browser.
    reader.readAsDataURL(file);
    // file read huna saksei aba k garne part yaha huncha
    reader.onload = () => {
      setData({ ...data, image: reader.result });
    };
  };

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4000/car/create";
      const { data: res } = await axios.post(url, data);
      console.log(data);
      toast.success(res.message);
      navigate("/admin/carmgmt");
    } catch (error) {
      toast.error(res.error);
    }
  };

  return (
    <>
      <div className=" bg-yellow-gray w-[100vw] h-[100vh] flex justify-center items-center flex-col gap-4 opacity-95">
        <p className="text-4xl font-bold">Create Driver Listings</p>
        <div className="bg-white bg-opacity-75 w-[55vw] pt-9 pb-9  rounded-2xl shadow-xl border ">
          <form className="flex flex-col gap-10 justify-center items-center " onSubmit={handleSubmit}>
            {/* brand and model */}
            <div className="flex gap-[140px]">
              <div className="flex flex-col gap-1">
                <p>Brand</p>
                <input
                  type="text"
                  name="brand"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1 w-[250px]"
                  onChange={handleChange}
                  value={data.brand}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Model</p>
                <input
                  type="text"
                  name="model"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1 w-[250px]"
                  onChange={handleChange}
                  value={data.model}
                  required
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
                  onChange={handleChange}
                  value={data.year}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Fuel Type</p>
                <select
                  name="fuelType"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1 w-[10vw]"
                  onChange={handleChange}
                  value={data.fuelType}
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
                  onChange={handleChange}
                  value={data.transmissionType}
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
                  onChange={handleChange}
                  value={data.seatingCapacity}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Mileage</p>
                <input
                  type="text"
                  name="mileage"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                  onChange={handleChange}
                  value={data.mileage}
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Number Plate</p>
                <input
                  type="text"
                  name="numberPlate"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                  onChange={handleChange}
                  value={data.numberPlate}
                  required
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
                  onChange={handleChange}
                  value={data.shortDistanceBasePrice}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Long distance base price</p>
                <input
                  type="text"
                  name="longDistanceBasePrice"
                  className="rounded-md border pl-2 pr-2 pt-1 pb-1"
                  onChange={handleChange}
                  value={data.longDistanceBasePrice}
                  required
                />
              </div>
            </div>

            <input
              type="file"
              name="image"
              className="self-start ml-[100px]"
              onChange={handleImage}
            />
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
