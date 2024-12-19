import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [userData, setUserData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const bookingUrl = "http://localhost:4000/booking/allBookings";
        const bookingResponse = await axios.get(bookingUrl);
        const allBookings = bookingResponse.data;
        setBookings(allBookings);

        const users = [];
        const cars = [];
        const drivers = [];

        for (const booking of allBookings) {
          // Fetch user data
          const userResponse = await axios.get(
            `http://localhost:4000/user/getIndividual/${booking.userId}`
          );
          users.push(userResponse.data);

          // Fetch car data
          const carResponse = await axios.get(
            `http://localhost:4000/car/individualCar/${booking.carId}`
          );
          cars.push(carResponse.data);

          // Fetch driver data (if applicable)
          if (booking.rentalType !== "selfDrive" && booking.driverId) {
            const driverResponse = await axios.get(
              `http://localhost:4000/driver/getIndividual/${booking.driverId}`
            );
            drivers.push(driverResponse.data);
          } else {
            drivers.push(null); // Handle selfDrive rentals
          }
        }

        setUserData(users);
        setCarData(cars);
        setDriverData(drivers);
      } catch (error) {
        console.error("Error fetching bookings or related details:", error);
      }
    };

    fetchAllBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      const url = `http://localhost:4000/booking/delete/${bookingId}`;
      const { data: res } = await axios.delete(url);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      toast.success(res.message);
    } catch (error) {
      toast.error("Error deleting booking");
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        All Bookings
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
            >
              <span
                class="material-symbols-outlined pt-4 pr-4 text-red-500 ml-[550px] h-fit w-fit cursor-pointer"
                onClick={() => {
                  handleDelete(booking._id);
                }}
              >
                delete
              </span>
              {/* Booking Info */}
              <div className="p-6 h-[31vh]">
                <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                  Booking Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Booking Details */}
                  <div>
                    {booking.bookingStartDate && (
                      <p>
                        <strong>Start Date:</strong>{" "}
                        {new Date(
                          booking.bookingStartDate
                        ).toLocaleDateString()}
                      </p>
                    )}
                    {booking.bookingEndDate && (
                      <p>
                        <strong>End Date:</strong>{" "}
                        {new Date(booking.bookingEndDate).toLocaleDateString()}
                      </p>
                    )}
                    {booking.customerPickUp && (
                      <p>
                        <strong>Pick-up:</strong> {booking.customerPickUp}
                      </p>
                    )}
                    {booking.pickUpTime && (
                      <p>
                        <strong>Pick-up Time:</strong>{" "}
                        {new Date(booking.pickUpTime).toLocaleTimeString()}
                      </p>
                    )}
                    {booking.customerDropOff && (
                      <p>
                        <strong>Drop-off:</strong> {booking.customerDropOff}
                      </p>
                    )}
                    {booking.dropOffTime && (
                      <p>
                        <strong>Drop-off Time:</strong>{" "}
                        {new Date(booking.dropOffTime).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  <div>
                    {booking.destination && (
                      <p>
                        <strong>Destination:</strong> {booking.destination}
                      </p>
                    )}
                    {booking.distance && (
                      <p>
                        <strong>Distance:</strong> {booking.distance} km
                      </p>
                    )}
                    {booking.bookedAmount && (
                      <p>
                        <strong>Booking Amount:</strong> {booking.bookedAmount}{" "}
                        NPR
                      </p>
                    )}
                    {booking.rentalType && (
                      <p>
                        <strong>Rental Type:</strong> {booking.rentalType}
                      </p>
                    )}
                    {booking.paymentStatus && (
                      <p>
                        <strong>Payment Status:</strong> {booking.paymentStatus}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="p-6 bg-gray-100 mt-2">
                <h3 className="font-bold text-gray-700 mb-2">User Details</h3>
                {userData[index] && (
                  <div>
                    {userData[index].name && (
                      <p>
                        <strong>Name:</strong> {userData[index].name}
                      </p>
                    )}
                    {userData[index].email && (
                      <p>
                        <strong>Email:</strong> {userData[index].email}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Car and Driver Info */}
              <div className="grid grid-cols-2 gap-4 bg-gray-100 p-6">
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
                    <h3 className="text-gray-700 mb-2 font-bold">
                      Car Details
                    </h3>
                    {carData[index]?.brand && (
                      <p>
                        <strong>Brand:</strong> {carData[index].brand}
                      </p>
                    )}
                    {carData[index]?.model && (
                      <p>
                        <strong>Model:</strong> {carData[index].model}
                      </p>
                    )}
                    {carData[index]?.numberPlate && (
                      <p>
                        <strong>Number Plate:</strong>{" "}
                        {carData[index]?.numberPlate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Driver Details */}
                {booking.rentalType !== "selfDrive" && driverData[index] && (
                  <div className="flex items-center gap-4">
                    {driverData[index]?.image?.url && (
                      <img
                        src={driverData[index].image.url}
                        alt="Driver"
                        className="w-20 h-20 rounded-full"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-gray-700 mb-2">
                        Driver Details
                      </h3>
                      {driverData[index]?.name && (
                        <p>
                          <strong>Name:</strong> {driverData[index].name}
                        </p>
                      )}
                      {driverData[index]?.age && (
                        <p>
                          <strong>Age:</strong> {driverData[index].age}
                        </p>
                      )}
                      {driverData[index]?.contact && (
                        <p>
                          <strong>Contact:</strong> {driverData[index]?.contact}
                        </p>
                      )}
                    </div>
                  </div>
                )}
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

export default AdminViewBookings;
