import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { bookingId, carId } = useParams();
  const [car, setCar] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [amount, setAmount] = useState(null);
  const [bookedDriverIds, setBookedDriverIds] = useState(null);
  const [availableDriver, setAvailableDriver] = useState(null);
  const navigate=useNavigate();

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

  // fetching ids of booked drivers
  useEffect(() => {
    const fetchBookedDriverIds = async () => {
      if (!bookingData) return; // Ensure bookingData is available
      try {
        const { data } = await axios.get(
          `http://localhost:4000/booking/getBookedDriverIds/${bookingData.bookingStartDate}/${bookingData.bookingEndDate}`
        );
        setBookedDriverIds(data.bookedDriverIds || []);
        console.log(bookedDriverIds,"booked driver ids")
      } catch (e) {
        console.error(e);
      }
    };

    fetchBookedDriverIds();
  }, [bookingData]); // Depend only on bookingData

  // fetch all available drivers
  useEffect(() => {
    const fetchAvailableDrivers = async () => {
      try {
        const { data: allDrivers } = await axios.get(
          "http://localhost:4000/driver/get"
        );
        const availableDrivers = allDrivers.filter(
          (driver) => !bookedDriverIds.includes(driver._id)
        );
        setAvailableDriver(availableDrivers);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAvailableDrivers();
  }, [bookedDriverIds]);

  // Calculate amount based on conditions
  useEffect(() => {
    if (car && packageData && bookingData) {
      let calculatedAmount = 0;
      if (bookingData.rentalType == "selfDrive") {
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
      } else {
        if (bookingData.distance <= packageData.shortDistancePackage) {
          calculatedAmount =
            car.shortDistanceBasePrice * bookingData.bookingPeriod +
            packageData.driverShortDistance * bookingData.bookingPeriod;
        } else if (
          bookingData.distance > packageData.shortDistancePackage &&
          bookingData.distance <= packageData.longDistancePackage
        ) {
          calculatedAmount =
            car.longDistanceBasePrice * bookingData.bookingPeriod +
            packageData.driverLongDistance * bookingData.bookingPeriod;
        } else {
          calculatedAmount = null; // For cases outside package limits
        }
        setAmount(calculatedAmount);
      }
    }
  }, [car, packageData, bookingData]);

  const handleSubmit = async () => {
    try {
      if (bookingData.rentalType == "selfDrive") {
        const url = `http://localhost:4000/booking/updateBookingInfo/${bookingId}`;
        const { data: res } = await axios.patch(url, {
          carId: carId,
          bookedAmount: amount,
          bookingStatus: "booked",
          userEmail:localStorage.getItem("email"),
          bookingStartDate:new Date(bookingData.bookingStartDate).toLocaleDateString()
        });
        navigate("/user/selfDriveBookings");
      } else {
        const randomIndex = Math.floor(Math.random() * availableDriver.length);
        const selectedDriverId = availableDriver[randomIndex]._id;
        console.log(selectedDriverId)
        const url = `http://localhost:4000/booking/updateBookingInfo/${bookingId}`;
        const { data: res } = await axios.patch(url, {
          carId: carId,
          bookedAmount: amount,
          bookingStatus: "booked",
          driverId: selectedDriverId,
        });
        try {
          const url = "http://localhost:4000/stripe/create-checkout-session";
          const { data: res } = await axios.post(url, {
            bookingId: bookingId,
            price: amount,
            name: "rentedCar",
          });
          window.location.href = res.url;
        } catch (error) {
          console.log("Error creating checkout session", error);
        }
      }

      toast.success("Booking Successfull!");
    } catch (error) {
      console.log(e);
      toast.error(error);
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
