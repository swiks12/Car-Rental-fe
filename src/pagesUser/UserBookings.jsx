import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBookings = () => {
  const userId = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    const fetchPaidBookings = async () => {
      try {
        const url = `http://localhost:4000/booking/getIndividualPaidBookings/${userId}`;
        const response = await axios.get(url);
        const bookings = response.data;

        setData(bookings);

        // Fetch car and driver details in parallel
        const carPromises = bookings.map((booking) =>
          axios.get(`http://localhost:4000/car/individualCar/${booking.carId}`)
        );
        const driverPromises = bookings.map((booking) =>
          axios.get(`http://localhost:4000/driver/getIndividual/${booking.driverId}`)
        );

        // Resolve all promises and extract data
        const carResults = await Promise.all(carPromises);
        const driverResults = await Promise.all(driverPromises);

        setCarData(carResults.map((res) => res.data));
        setDriverData(driverResults.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching bookings, car or driver details", error);
      }
    };

    fetchPaidBookings();
  }, [userId]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 mt-[55px]">
        User Bookings for Rent with Driver
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.length > 0 ? (
          data.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Booking Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                  Booking Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {new Date(booking.bookingStartDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>End Date:</strong>{" "}
                      {new Date(booking.bookingEndDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Pick-up:</strong> {booking.customerPickUp}
                    </p>
                    <p>
                      <strong>Pick-up Time:</strong> {new Date(booking.pickUpTime).toLocaleTimeString()}
                    </p>
                    <p>
                      <strong>Drop-off:</strong> {booking.customerDropOff}
                    </p>
                    <p>
                      <strong>Drop-off Time:</strong> {new Date(booking.dropOffTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Destination:</strong> {booking.destination}
                    </p>
                    <p>
                      <strong>Distance:</strong> {booking.distance} km
                    </p>
                    <p>
                      <strong>Booking Amount:</strong> {booking.bookedAmount} NPR
                    </p>
                  </div>
                </div>
              </div>

              {/* Car and Driver Info */}
              <div className="grid grid-cols-2 gap-4 bg-gray-100 p-6 h-[30vh]">
                {/* Car Details */}
                <div className="flex items-center gap-4">
                  {carData[index]?.image?.url && (
                    <img
                      src={carData[index].image.url}
                      alt="Car"
                      className="w-20 h-20 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-gray-700 mb-2 font-bold">Car Details</h3>
                    <p>
                      <strong>Brand:</strong> {carData[index]?.brand}
                    </p>
                    <p>
                      <strong>Model:</strong> {carData[index]?.model}
                    </p>
                    <p>
                      <strong>Number Plate:</strong> {carData[index]?.numberPlate}
                    </p>
                  </div>
                </div>

                {/* Driver Details */}
                <div className="flex items-center gap-4">
                  {driverData[index]?.image?.url && (
                    <img
                      src={driverData[index].image.url}
                      alt="Driver"
                      className="w-20 h-20 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-700 mb-2">Driver Details</h3>
                    <p>
                      <strong>Name:</strong> {driverData[index]?.name}
                    </p>
                    <p>
                      <strong>Age:</strong> {driverData[index]?.age}
                    </p>
                    <p>
                      <strong>Contact:</strong> {driverData[index]?.contact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600 col-span-2">
            No bookings available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
