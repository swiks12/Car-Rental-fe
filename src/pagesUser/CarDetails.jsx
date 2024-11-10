import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { bookingId, carId } = useParams();
  const [car, setCar] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [amount, setAmount] = useState(null);

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const url = `http://localhost:4000/car/individualCar/${carId}`;
        const { data } = await axios.get(url);
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCarDetails();
  }, [carId]);

  // Fetch package data
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const url = "http://localhost:4000/package/get";
        const { data } = await axios.get(url);
        setPackageData(data);
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };
    fetchPackageData();
  }, []);

  // Fetch booking info
  useEffect(() => {
    const fetchBookingInfo = async () => {
      try {
        const url = `http://localhost:4000/booking/getIndividual/${bookingId}`;
        const { data } = await axios.get(url);
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking info:", error);
      }
    };
    fetchBookingInfo();
  }, [bookingId]);

  // Calculate amount based on conditions
  useEffect(() => {
    if (car && packageData && bookingData) {
      let calculatedAmount = 0;
      if (bookingData.distance <= packageData.shortDistancePackage) {
        calculatedAmount =
          car.shortDistanceBasePrice * bookingData.bookingPeriod;
      } else if (
        bookingData.distance > packageData.shortDistancePackage &&
        bookingData.distance <= packageData.longDistancePackage
      ) {
        calculatedAmount =
          car.longDistanceBasePrice * bookingData.bookingPeriod;
      } else {
        calculatedAmount = null; // For cases outside package limits
      }
      setAmount(calculatedAmount);
    }
  }, [car, packageData, bookingData]);

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:4000/booking/updateBookingInfo/${bookingId}`;
      const { data: res } = await axios.patch(url, {
        carId: carId,
        bookedAmount: amount,
        bookingStatus: "booked",
      });
      console.log(res.message)
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      {car && (
        <div className="bg-white w-[85vw] p-8 border flex gap-[100px] shadow-xl rounded-lg absolute top-[120px] h-[72vh] items-center">
          <img
            src={car.image.url}
            className="h-[50vh] w-[60vw] object-cover self-center rounded-md"
            alt="Car"
          />
          <div className="flex gap-[200px] mt-[20px] w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="font-semibold text-black bg-yellow-400 pl-1 pr-2 rounded-md w-fit">
                  Brand
                </p>
                <p>{car.brand}</p>
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-black bg-yellow-400 pl-1 pr-2 rounded-md w-fit">
                  Year
                </p>
                <p>{car.year}</p>
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-black bg-yellow-400 pl-1 pr-2 rounded-md w-fit">
                  Transmission Type
                </p>
                <p>{car.transmissionType}</p>
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-black bg-yellow-400 pl-1 pr-2 rounded-md w-fit">
                  Mileage
                </p>
                <p>{car.mileage}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="font-semibold text-black bg-yellow-400 pl-1 pr-2 rounded-md w-fit">
                  Model
                </p>
                <p>{car.model}</p>
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-black bg-yellow-400 pl-1 pr-2 rounded-md w-fit">
                  Fuel
                </p>
                <p>{car.fuelType}</p>
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-black bg-yellow-400 pl-1 pr-2 rounded-md w-fit">
                  Seating Capacity
                </p>
                <p>{car.seatingCapacity}</p>
              </div>

              <div className="flex flex-col">
                <p className="font-semibold text-black bg-yellow-400 pl-1 pr-2 rounded-md w-fit">
                  Number Plate
                </p>
                <p>{car.numberPlate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking amount or condition message */}
      <div className="bg-black text-white pl-2 pr-2 pt-3 pb-3 rounded-xl w-[10vw] top-[530px] left-[920px] absolute">
        {amount !== null ? (
          <button onClick={handleSubmit} type="submit">
            Book for <span className="font-bold">Rs.{amount}</span>
          </button>
        ) : (
          <p>Cannot book car outside of the package limits</p>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
