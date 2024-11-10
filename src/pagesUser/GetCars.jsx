import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const GetCars = () => {
  const params = useParams();
  const bookingId = params.id || "";  // Ensure id has a fallback if it's not available
  const bookingStartDate = params.bookingStartDate;
  const bookingEndDate = params.bookingEndDate;
  const [bookedCarIds, setBookedCarIds] = useState([]);
  const [carData, setCarData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedCarIds = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/booking/getBookedCarIds/${bookingStartDate}/${bookingEndDate}`
        );
        // Make sure data.bookedCarIds is the correct array
        setBookedCarIds(data.bookedCarIds || []);  // Assuming `data.bookedCarIds` is the array from the response
        console.log(data); // Log the entire response to verify
      } catch (e) {
        console.log(e);
      }
    };
    fetchBookedCarIds();
  }, [bookingStartDate, bookingEndDate]);
  

  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        const { data: allCars } = await axios.get("http://localhost:4000/car/get");
        const availableCars = allCars.filter(
          (car) => !bookedCarIds.includes(car._id)  // This will work now that bookedCarIds is an array
        );
        setCarData(availableCars);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAvailableCars();
  }, [bookedCarIds]);
  

  return (
    <div className="absolute top-[70px] m-8">
      <div className="flex gap-12">
        {carData.map((car) => (
          <div
            key={car._id}
            className="border-[2px] rounded-xl w-[20vw] flex flex-col justify-center items-center pt-4 pb-4 bg-white pl-3 pr-3"
          >
            <img
              src={car.image.url}
              alt="CarPhoto"
              className="h-[110px] w-[15vw] object-cover rounded-xl"
            />
            <p className="font-semibold mt-2">{car.brand}</p>
            <p className="text-gray-600">{car.model}</p>
            <div className="flex items-center gap-3">
              <p className="text-gray-500">{car.numberPlate}</p>
              <button
                className="pl-1 pr-1 bg-yellow-400 rounded-lg"
                onClick={() => navigate(`/user/carDetails/${bookingId}/${car._id}`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetCars;
