import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaidBookings = () => {
  const [paidBookings, setPaidBookings] = useState([]);

  useEffect(() => {
    const fetchPaidBookings = async () => {
      try {
        const url = "http://localhost:4000/booking/allPaidBookings";
        const response = await axios.get(url);
        const bookings = response.data;

        // Fetch additional user and car data for each booking
        const userData = [];
        const carData = [];

        for (const booking of bookings) {
          // Fetch user data
          const userResponse = await axios.get(`http://localhost:4000/user/getIndividual/${booking.userId}`);
          userData.push(userResponse.data);

          // Fetch car data
          const carResponse = await axios.get(`http://localhost:4000/car/individualCar/${booking.carId}`);
          carData.push(carResponse.data);
        }

        setPaidBookings(bookings.map((booking, index) => ({
          ...booking,
          user: userData[index],
          car: carData[index],
        })));
      } catch (error) {
        console.error("Error fetching paid bookings:", error);
      }
    };

    fetchPaidBookings();
  }, []);

  // Calculate total amount
  const totalAmount = paidBookings.reduce((total, booking) => total + parseFloat(booking.bookedAmount), 0).toFixed(2);

  return (
    <div className="p-8 min-h-screen w-full">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Paid Bookings
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-8">
        <table className="min-w-full table-auto bg-white border-collapse border border-gray-200">
          <thead>
            <tr className="bg-yellow-300">
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Car Number Plate</th>
              <th className="py-3 px-6 text-left">Booking Period</th>
              <th className="py-3 px-6 text-left">Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {paidBookings.length > 0 ? (
              paidBookings.map((booking, index) => {
                // Format the booking period (start date and end date)
                const startDate = new Date(booking.bookingStartDate);
                const endDate = new Date(booking.bookingEndDate);
                const bookingPeriod = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;

                return (
                  <tr key={booking._id} className="border-b border-gray-200">
                    <td className="py-3 px-6">
                      <div>
                        <p>{booking.user?.name}</p>
                        <p className="text-sm text-gray-500">{booking.user?.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-6">{booking.car?.numberPlate}</td>
                    <td className="py-3 px-6">{bookingPeriod}</td>
                    <td className="py-3 px-6">{booking.bookedAmount} NPR</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center text-gray-600">
                  No paid bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Display total amount at the bottom right corner */}
        <div className="mt-4 text-right">
          <span className="font-semibold text-lg">Total: </span>
          <span className="font-bold text-xl">{totalAmount} NPR</span>
        </div>
      </div>
    </div>
  );
};

export default PaidBookings;
