import React, { useEffect, useState } from "react";
import axios from "axios";

const SelfDriveBookings = () => {
  const [data, setData] = useState([]); // Booking data
  const [carData, setCarData] = useState([]); // Car information
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchSelfDriveBookings = async () => {
      try {
        const url = `http://localhost:4000/booking/selfDriveBookings/${userId}`;
        const response = await axios.get(url);
        const bookings = response.data;

        setData(bookings);

        // Fetch car details for each booking
        const fetchCarDetails = async () => {
          const carDetailsPromises = bookings.map((booking) =>
            axios.get(`http://localhost:4000/car/individualCar/${booking.carId}`)
          );

          const carDetailsResponses = await Promise.all(carDetailsPromises);
          const carDetails = carDetailsResponses.map((res) => res.data);
          setCarData(carDetails);
        };

        fetchCarDetails();
      } catch (error) {
        console.error("Error fetching self-drive bookings or car details", error);
      }
    };

    fetchSelfDriveBookings();
  }, [userId]);

  return (
    <div className="absolute top-20 w-full px-8 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-12 ">
        Self-Drive Bookings 
      </h1>
      {data.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6"
            >
              {/* Car Image */}
              {carData[index]?.image?.url && (
                <div className="mb-6">
                  <img
                    src={carData[index].image.url}
                    alt="Car"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
              )}

              {/* Booking Details */}
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {carData[index]?.brand} {carData[index]?.model}
                </h2>
                <p>
                  <strong>Booking Dates:</strong>{" "}
                  {new Date(booking.bookingStartDate).toLocaleDateString()} -{" "}
                  {new Date(booking.bookingEndDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Pick-up Time:</strong>{" "}
                  {new Date(booking.pickUpTime).toLocaleTimeString()}
                </p>
                <p>
                  <strong>Drop-off Time:</strong>{" "}
                  {new Date(booking.dropOffTime).toLocaleTimeString()}
                </p>
                <p>
                  <strong>Destination:</strong> {booking.destination}
                </p>
                <p>
                  <strong>Distance:</strong> {booking.distance} km
                </p>
                <p>
                  <strong>Booking Amount:</strong>{" "}
                  <span className="font-bold text-green-600">
                    {booking.bookedAmount} NPR
                  </span>
                </p>
                <p>
                  <strong>Car Number Plate:</strong>{" "}
                  <span className="font-medium">{carData[index]?.numberPlate}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No self-drive bookings available.
        </p>
      )}
    </div>
  );
};

export default SelfDriveBookings;
