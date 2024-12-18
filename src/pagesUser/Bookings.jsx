import React from "react";
import { Link } from "react-router-dom";
import selfDrive from "../assets/selfDrive.png"
import rentwithDriver from "../assets/rentWithDriver.png"

const Bookings = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 ">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mt-[60px]">
        Your Bookings
      </h1>
      <div className="container mx-auto px-4 mt-12 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Self-Drive Bookings */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 w-[40vw]">
            <Link to="/user/selfDriveBookings" className="block p-8 text-center">
              <img
                src={selfDrive}// Replace with an actual image
                alt="Self Drive"
                className="w-20 h-30 mx-auto mb-6   object-cover"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Self-Drive Bookings
              </h3>
              <p className="text-lg text-gray-600">
                Explore your self-drive bookings with flexible distance-based
                pricing and affordable options.
              </p>
            </Link>
          </div>

          {/* Rent with Driver Bookings */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 w-[40vw]">
            <Link
              to="/user/userBookings"
              className="block p-8 text-center "
            >
              <img
                src={rentwithDriver} // Replace with an actual image
                alt="Rent with Driver"
                className="w-32 h-32 mx-auto mb-6 "
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Rent with Driver Bookings
              </h3>
              <p className="text-lg text-gray-600">
                Check your bookings for rent with a driver. Available for round
                trips within Kathmandu Valley only.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
