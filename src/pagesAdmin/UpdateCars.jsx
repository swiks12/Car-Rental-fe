import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCars = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    brand: "",
    model: "",
    year: "",
    fuelType: "",
    transmissionType: "",
    seatingCapacity: "",
    mileage: "",
    numberPlate: "",
    shortDistanceBasePrice: "",
    longDistanceBasePrice: "",
    image: "",
    availability: "",
  });

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const individualCarInfo = async () => {
      try {
        const url = `http://localhost:4000/car/individualCar/${id}`;
        const { data: res } = await axios.get(url);
        setData(res);
      } catch (error) {
        console.error("Error fetching car info:", error);
      }
    };
    individualCarInfo();
  }, [id]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Cloudinary image upload logic
  const handleImage = (e) => {
    if (!e.target.value) {
      return;
    }
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setData({ ...data, image: reader.result });
    };
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const url = `http://localhost:4000/car/update/${id}`;
    await axios.put(url, data);
    navigate("/admin/carmgmt");
  };

  return (
    <div className="bg-gray-100 w-[100vw] flex justify-center items-center">
      {data && (
        <div className="bg-white w-[85vw] p-12 flex gap-12 shadow-xl rounded-lg h-[100vh]">
          <img
            src={data.image.url || data.image}
            className="h-[40vh] w-[30vw] object-cover self-center rounded-md"
            alt="Car"
          />
          <form className="flex flex-col gap-6 mt-[50px]" onSubmit={handleUpdate}>

            {/* Row 1: Brand and Model */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <p className="font-semibold">Brand</p>
                <input
                  type="text"
                  name="brand"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <p className="font-semibold">Model</p>
                <input
                  type="text"
                  name="model"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.model}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 2: Year, Fuel Type, Transmission Type */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <p className="font-semibold">Year</p>
                <input
                  type="number"
                  name="year"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.year}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <p className="font-semibold">Fuel Type</p>
                <select
                  name="fuelType"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.fuelType}
                  onChange={handleChange}
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                </select>
              </div>

              <div className="flex flex-col">
                <p className="font-semibold">Transmission Type</p>
                <select
                  name="transmissionType"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.transmissionType}
                  onChange={handleChange}
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
            </div>

            {/* Row 3: Seating Capacity, Mileage, Number Plate */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <p className="font-semibold">Seating Capacity</p>
                <input
                  type="number"
                  name="seatingCapacity"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.seatingCapacity}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <p className="font-semibold">Mileage</p>
                <input
                  type="number"
                  name="mileage"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.mileage}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <p className="font-semibold">Number Plate</p>
                <input
                  type="text"
                  name="numberPlate"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.numberPlate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 4: Short Distance Base Price, Long Distance Base Price */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <p className="font-semibold">Short Distance Base Price</p>
                <input
                  type="number"
                  name="shortDistanceBasePrice"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.shortDistanceBasePrice}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <p className="font-semibold">Long Distance Base Price</p>
                <input
                  type="number"
                  name="longDistanceBasePrice"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.longDistanceBasePrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="flex gap-6">
              <div className="flex flex-col">
                <p className="font-semibold">Availability</p>
                <select
                  name="availability"
                  className="border-black border pt-2 w-full rounded-md p-1"
                  value={data.availability}
                  onChange={handleChange}
                >
                  <option value="Unbooked">Unbooked</option>
                  <option value="Booked">Booked</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <p className="font-semibold">Select to choose new image file</p>
              <input type="file" name="image" onChange={handleImage} />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex gap-5 justify-center">
              <button
                type="submit"
                className="bg-yellow-400 pl-4 pr-4 pt-2 pb-2 rounded-[10px] hover:bg-black hover:text-white"
              >
                Update
              </button>
              <button
                className="bg-red-500 pl-4 pr-4 pt-2 pb-2 rounded-[10px]"
                onClick={() => {
                  navigate("/admin/carmgmt");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateCars;
