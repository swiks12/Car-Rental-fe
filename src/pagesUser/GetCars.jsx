import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const GetCars = () => {
  const params = useParams();
  const bookingId = params.id || "";
  const bookingStartDate = params.bookingStartDate;
  const bookingEndDate = params.bookingEndDate;
  const [bookedCarIds, setBookedCarIds] = useState([]);
  const [carData, setCarData] = useState([]);
  const [packageData, setPackageData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch package data
    const fetchPackageData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/package/get");
        setPackageData(data);
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };
    fetchPackageData();
  }, []);

  useEffect(() => {
    // Fetch booked car IDs
    const fetchBookedCarIds = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/booking/getBookedCarIds/${bookingStartDate}/${bookingEndDate}`
        );
        setBookedCarIds(data.bookedCarIds || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchBookedCarIds();
  }, [bookingStartDate, bookingEndDate]);

  useEffect(() => {
    // Fetch available cars
    const fetchAvailableCars = async () => {
      try {
        const { data: allCars } = await axios.get(
          "http://localhost:4000/car/get"
        );
        const availableCars = allCars.filter(
          (car) => !bookedCarIds.includes(car._id)
        );
        setCarData(availableCars);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAvailableCars();
  }, [bookedCarIds]);

  useEffect(() => {
    // Fetch booking info to get the user budget
    const fetchBookingInfo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/booking/getIndividual/${bookingId}`
        );
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking info:", error);
      }
    };
    fetchBookingInfo();
  }, [bookingId]);

  useEffect(() => {
    if (carData.length > 0 && bookingData) {
      // Compute proximity scores
      const budget = bookingData.budget; // Assuming bookingData contains the user's budget
      const recommended = carData.map((car) => {
        const distance = bookingData.distance; // Replace with actual booking data
        const bookingPeriod = bookingData.bookingPeriod;
        const price = calculatePrice(car, distance, bookingPeriod);

        const proximityScore = price
          ? 1 - Math.abs(price - budget) / budget
          : 0;

        return { ...car, price, proximityScore };
      });

      // Sort by proximity score and take the top 3 cars
      const sortedCars = recommended
        .filter((car) => car.price !== null)
        .sort((a, b) => b.proximityScore - a.proximityScore)
        .slice(0, 3); // Take only the top 3

      setRecommendedCars(sortedCars);
    }
  }, [carData, bookingData]);

  const calculatePrice = (car, distance, bookingPeriod) => {
    if (!packageData) return null;
    let calculatedAmount = 0;

    if (distance <= packageData.shortDistancePackage) {
      calculatedAmount = car.shortDistanceBasePrice * bookingPeriod;
    } else if (
      distance > packageData.shortDistancePackage &&
      distance <= packageData.longDistancePackage
    ) {
      calculatedAmount = car.longDistanceBasePrice * bookingPeriod;
    } else {
      calculatedAmount = null;
    }
    return calculatedAmount;
  };

  return (
    <div className="absolute top-[70px] m-8">
      <h1 className="text-2xl font-bold mb-4">Available Cars</h1>
      <div className="flex gap-12">
        {carData.map((car) => {
          const distance = bookingData?.distance;
          const bookingPeriod = bookingData?.bookingPeriod;
          const amount = calculatePrice(car, distance, bookingPeriod);

          return (
            <div
              key={car._id}
              className="border-[2px] rounded-xl w-[20vw] flex flex-col justify-center items-center pt-4 pb-4 bg-white pl-3 pr-3"
            >
              <img
                src={car.image.url}
                alt="CarPhoto"
                className="h-[110px] w-[15vw] object-cover rounded-xl"
              />

              <div className="flex gap-2 items-center mt-2">
                <p className="font-semibold">{car.brand}</p>
                <p className="text-gray-600">-{car.model}</p>
              </div>
              <div className="flex items-center gap-8">
                {amount !== null ? (
                  <p className="font-bold mt-3 text-yellow-400 bg-black pl-1 pt-1 pr-1 pb-1 rounded-lg">
                    Rs.{amount}
                  </p>
                ) : (
                  <p className="text-red-500 mt-3">
                    Cannot book car outside of the package limits
                  </p>
                )}
                <button
                  className="pl-1 pr-1 bg-yellow-400 rounded-lg self-end "
                  onClick={() => navigate(`/user/carDetails/${bookingId}/${car._id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <h1 className="text-2xl font-bold mt-8 mb-4">Recommended cars suiting your budget!</h1>
      <div className="flex gap-12">
        {recommendedCars.map((car) => (
          <div
            key={car._id}
            className="border-[2px] rounded-xl w-[20vw] flex flex-col justify-center items-center pt-4 pb-4 bg-white pl-3 pr-3"
          >
            <img
              src={car.image.url}
              alt="CarPhoto"
              className="h-[110px] w-[15vw] object-cover rounded-xl"
            />
            <div className="flex gap-2 items-center mt-2">
              <p className="font-semibold ">{car.brand}</p>
              <p className="text-gray-600">-{car.model}</p>
            </div>
            <div className="flex gap-8 items-center">
              <p className="font-bold mt-3 text-yellow-400 bg-black pl-1 pt-1 pr-1 pb-1 rounded-lg">
                Rs.{car.price}
              </p>
              <button
                className="pl-1 pr-1 bg-yellow-400 rounded-lg self-end"
                onClick={() =>
                  navigate(`/user/carDetails/${bookingId}/${car._id}`)
                }
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
