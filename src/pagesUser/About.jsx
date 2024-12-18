import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center py-20">
        <img
          src={logo} // Replace with your actual logo path
          alt="Wheels On Demand Logo"
          className="mx-auto  h-[40vh]  mb-8"
        />
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 ">
            About Us
          </h1>
          <p className="text-lg text-gray-600 ">
            At Wheels On Demand, we provide flexible car rental options for
            every occasion, ensuring your journey is smooth, comfortable, and
            affordable.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Self-Drive Rentals
          </h2>
          <p className="text-gray-600 mb-4">
            Our self-drive rental service offers the freedom and flexibility to
            explore Kathmandu and beyond. With transparent, distance-based
            pricing, you only pay trip based on distance, ensuring a fair and
            affordable experience.
          </p>
          <p className="text-gray-600">
            Whether you're going for a short trip or planning an adventure, our
            fleet of well-maintained vehicles is ready to meet your needs.
          </p>
        </div>

        <div className="bg-black p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Rent with Driver
          </h2>
          <p className="text-white mb-4">
            Enjoy a hassle-free ride with our Rent with Driver service. Our
            skilled and experienced drivers will ensure you reach your
            destination safely and comfortably.
          </p>
          <p className="text-white">
            Rent with Driver is available exclusively for round trips, with
            pick-up and drop-off locations in Kathmandu Valley. With our package
            system, pricing is distance-based, allowing for more affordable
            rentals. This service is ideal for those who prefer to sit back and
            relax while we handle the driving.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Wheels On Demand?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We believe in offering the best service at the best price. Here's
            why you should choose us:
          </p>
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Affordable Pricing
              </h3>
              <p className="text-gray-600">
                Our distance-based pricing ensures that you only pay for what
                you use.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Flexible Options
              </h3>
              <p className="text-gray-600">
                Whether you prefer to drive yourself or have a driver, we’ve got
                you covered.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Reliable Service
              </h3>
              <p className="text-gray-600">
                Our fleet and drivers are well-maintained and trained to ensure
                your safety and comfort.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Ready to Hit the Road?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Whether you’re planning a solo trip or a family outing, Wheels On
          Demand has the perfect car for you. Let us take care of the details
          while you enjoy the journey.
        </p>
        <Link
          to="/user/home"
          className="bg-black text-white px-6 py-3 rounded-lg text-xl"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default About;
