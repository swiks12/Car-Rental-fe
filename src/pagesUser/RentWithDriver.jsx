import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import selfDrive from "../assets/selfDriveBg.png";
import {
  useJsApiLoader,
  StandaloneSearchBox,
  GoogleMap,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const libraries = ["places", "directions"];
const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const RentWithDriver = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [customerPickup, setCustomerPickup] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [budget,setBudget]=useState(null);

  const [data, setData] = useState({
    bookingStartDate: null,
    bookingEndDate: null,
    pickUp: "Thapathali, Kathmandu",
    pickUpTime: null,
    dropOffTime: null,
    userId: localStorage.getItem("id"),
    bookingPeriod: null,
  });
  // console.log(data.id)
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
  const [distance, setDistance] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  const searchBoxRef = useRef(null);
  const dropOffBoxRef = useRef(null);
  const customerPickUpBoxRef = useRef(null);

  const mapRef = useRef(null);

  console.log(dropOff, "drop off location");

  const startDate = new Date(data.bookingStartDate);
  const endDate = new Date(data.bookingEndDate);

  // Normalize the dates (set time to 00:00:00 for both start and end dates)
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  // Calculate the difference in days
  const bookingPeriod =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  console.log(bookingPeriod);

  // normalize date
  const normalizeDate = (date) => {
    // Ensure the date is in YYYY-MM-DD format (ISO format without the time)
    const normalizedDate = new Date(date);
    return normalizedDate.toISOString().split("T")[0]; // Extracts only the date (YYYY-MM-DD)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/booking/create";
    const { data: res } = await axios.post(url, {
      bookingStartDate: data.bookingStartDate,
      bookingEndDate: data.bookingEndDate,
      pickUp: data.pickUp,
      destination: destination,
      distance: distance,
      pickUpTime: data.pickUpTime,
      dropOffTime: data.dropOffTime,
      userId: data.userId,
      bookingPeriod: bookingPeriod,
      customerPickUp:customerPickup,
      customerDropOff:dropOff,
      rentalType:"rentWithDriver",
      budget:budget
    });
    const id = res.id;
    console.log(id);
    // localStorage.setItem("bookingStartDate",bookingStartDate);
    // localStorage.setItem("bookingEndDate",bookingEndDate);
    navigate(
      `/user/getCars/${id}/${data.bookingStartDate}/${data.bookingEndDate}`
    );
  };

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places,directions`;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => {
        setError("Failed to load Google Maps script. Retrying...");
        setTimeout(loadScript, 2000);
      };
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  const onSearchBoxLoad = (ref) => {
    searchBoxRef.current = ref;
  };

  const kathmanduValleyBounds = {
    north: 27.85, // approximate northern latitude of Kathmandu Valley
    south: 27.55, // approximate southern latitude of Kathmandu Valley
    east: 85.55, // approximate eastern longitude of Kathmandu Valley
    west: 85.15, // approximate western longitude of Kathmandu Valley
  };

  const onDropOffBoxLoad = (ref) => {
    dropOffBoxRef.current = ref;
  };

  const onCustomerPickUpBoxLoad = (ref) => {
    customerPickUpBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setDestination(place.formatted_address);
      setRoutes([]);
      setSelectedRouteIndex(null);
      setMapKey((prev) => prev + 1);
      calculateDistance(place.geometry.location);
    } else {
      setRoutes([]);
      setSelectedRouteIndex(null);
      setDistance(null);
      setMapKey((prev) => prev + 1);
    }
  };

  //drop off customer
  const onDropOffChanged = () => {
    const places = dropOffBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setDropOff(place.formatted_address);
    }
  };

  //customer pick up Location
  const onCustomerPickUpChanged = () => {
    const places = customerPickUpBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setCustomerPickup(place.formatted_address);
    }
  };

  useEffect(() => {
    if (destination === "") {
      setRoutes([]);
      setSelectedRouteIndex(null);
      setDistance(null);
      setMapKey((prev) => prev + 1);
    }
  }, [destination]);

  const calculateDistance = (destinationLocation) => {
    setRoutes([]);
    setSelectedRouteIndex(null);
    setMapKey((prev) => prev + 1);

    const directionsService = new window.google.maps.DirectionsService();
    const pickupLocation = new window.google.maps.LatLng(27.6938, 85.324);

    const request = {
      origin: pickupLocation,
      destination: destinationLocation,
      travelMode: window.google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setRoutes(result.routes);
        setSelectedRouteIndex(null);
      } else {
        console.error("Error fetching directions: ", status);
        setDistance(null);
      }
    });
  };

  const handleRouteClick = (index) => {
    setSelectedRouteIndex(index);
    const selectedRoute = routes[index];
    setDistance(selectedRoute.legs[0].distance.value / 1000);
  };

  const colors = ["red", "green", "purple"];
  const selectedColor = "blue";

  if (!isLoaded) {
    return <div>{error || "Loading Google Maps..."}</div>;
  }

  return (
    <>
      {/* <img
        src={selfDrive}
        alt="selfDrive"
        className="h-[100vh] w-[100vw] object-cover z-[-1000] relative"
      /> */}
      <div className="absolute top-[150px] left-[100px] flex gap-[100px]">
        <div style={{ height: "400px", width: "600px" }}>
          <GoogleMap
            key={mapKey}
            center={{ lat: 27.6938, lng: 85.324 }}
            zoom={12}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <Marker
              position={{ lat: 27.6938, lng: 85.324 }}
              title="Pickup Location"
            />
            {routes.length > 0 && (
              <Marker
                position={routes[selectedRouteIndex ?? 0].legs[0].end_location}
                title="Destination"
              />
            )}

            {routes.map((route, index) => (
              <Polyline
                key={index}
                path={route.overview_path}
                options={{
                  strokeColor:
                    selectedRouteIndex === null || selectedRouteIndex === index
                      ? selectedRouteIndex === index
                        ? selectedColor
                        : colors[index % colors.length]
                      : "transparent",
                  strokeWeight: 6,
                  zIndex: selectedRouteIndex === index ? 2 : 1,
                }}
              />
            ))}
          </GoogleMap>
        </div>

        <div className="bg-white pl-8 pr-8 pt-12 pb-12 bg-opacity-40 rounded-lg border-gray-800 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-12 justify-center">
              <div className="flex flex-col gap-2">
                <p className="font-semibold bg-black text-white pl-2 rounded-xl">
                  Booking Start Date
                </p>
                <DatePicker
                  selected={data.bookingStartDate}
                  onChange={(date) =>
                    setData({ ...data, bookingStartDate: date })
                  }
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Select booking start date"
                  className="w-[250px] border"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold bg-black text-white pl-2 rounded-xl">
                  Booking End Date
                </p>
                <DatePicker
                  selected={data.bookingEndDate}
                  onChange={(date) =>
                    setData({ ...data, bookingEndDate: date })
                  }
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Select booking end date"
                  className="w-[250px] border"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-12 justify-center">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold bg-black text-white pl-2 rounded-xl">
                    Organization Location
                  </p>
                  <input
                    type="text"
                    name="pickUp"
                    className="border w-[250px]"
                    value="Thapathali, Kathmandu"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold bg-black text-white pl-2 rounded-xl">
                    Destination
                  </p>
                  {isLoaded && (
                    <StandaloneSearchBox
                      onLoad={onSearchBoxLoad}
                      onPlacesChanged={onPlacesChanged}
                    >
                      <input
                        type="text"
                        className="border w-[250px]"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Search destination"
                      />
                    </StandaloneSearchBox>
                  )}
                </div>
              </div>
              {/* div to make pickyp and drop moff  */}
              <div className="flex gap-12 justify-center">
                {/* Pickup Location */}
                <div className="flex flex-col gap-2">
                  <p className="font-semibold bg-black text-white pl-2 rounded-xl">
                    Pick Up location
                  </p>
                  {isLoaded && (
                    <StandaloneSearchBox
                      onLoad={onCustomerPickUpBoxLoad}
                      onPlacesChanged={onCustomerPickUpChanged}
                      options={{
                        bounds: new window.google.maps.LatLngBounds(
                          new window.google.maps.LatLng(
                            kathmanduValleyBounds.south,
                            kathmanduValleyBounds.west
                          ),
                          new window.google.maps.LatLng(
                            kathmanduValleyBounds.north,
                            kathmanduValleyBounds.east
                          )
                        ),
                        strictBounds: true, // ensures results are restricted within the bounds
                      }}
                    >
                      <input
                        type="text"
                        className="search-input w-[250px] border"
                        value={customerPickup}
                        onChange={(e) => setCustomerPickup(e.target.value)}
                        placeholder="Search pick-Up Location"
                      />
                    </StandaloneSearchBox>
                  )}
                </div>

                {/* Drop off location */}
                <div className="flex flex-col gap-2">
                  <p className="font-semibold bg-black text-white pl-2 rounded-xl">
                    Drop Off Location
                  </p>
                  {isLoaded && (
                    <StandaloneSearchBox
                      onLoad={onDropOffBoxLoad}
                      onPlacesChanged={onDropOffChanged}
                      options={{
                        bounds: new window.google.maps.LatLngBounds(
                          new window.google.maps.LatLng(
                            kathmanduValleyBounds.south,
                            kathmanduValleyBounds.west
                          ),
                          new window.google.maps.LatLng(
                            kathmanduValleyBounds.north,
                            kathmanduValleyBounds.east
                          )
                        ),
                        strictBounds: true, // ensures results are restricted within the bounds
                      }}
                    >
                      <input
                        type="text"
                        className="search-input w-[250px] border"
                        value={dropOff}
                        onChange={(e) => setDropOff(e.target.value)}
                        placeholder="Search drop-off destination"
                      />
                    </StandaloneSearchBox>
                  )}
                </div>
              </div>
            </div>

            {/* Show distance immediately after destination field */}
            {distance !== null && (
              <p className="text-center mt-4">
                Distance between Pickup and Destination: {distance.toFixed(2)}{" "}
                km
              </p>
            )}

            {/* Route Selection with Distance on Buttons */}
            {routes.length > 0 && (
              <div className="flex flex-col items-center mt-8">
                <p className="font-semibold mb-3">Select Route</p>
                <div className="flex gap-3">
                  {routes.map((route, index) => (
                    <button
                      key={index}
                      onClick={() => handleRouteClick(index)}
                      className={`border rounded-lg px-3 py-2 text-xs ${
                        selectedRouteIndex === index
                          ? "bg-yellow-400 text-white"
                          : "bg-white"
                      }`}
                    >
                      Route {index + 1}: {route.legs[0].distance.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* New Pickup and Dropoff Time Pickers */}
            <div className="flex gap-12 justify-center mt-5">
              <div className="flex flex-col gap-2">
                <p className="font-semibold bg-black text-white pl-2 rounded-xl">
                  Pick Up Time
                </p>
                <DatePicker
                  selected={data.pickUpTime}
                  onChange={(time) => setData({ ...data, pickUpTime: time })}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select pick-up time"
                  isClearable
                  className="border"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold bg-black text-white pl-2 rounded-xl">
                  Drop Off Time
                </p>
                <DatePicker
                  selected={data.dropOffTime}
                  onChange={(time) => setData({ ...data, dropOffTime: time })}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select drop-off time"
                  isClearable
                  className="border"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="font-semibold bg-black text-white pl-2 rounded-xl  w-[250px] mt-4">
                Budget for trip
              </p>
              <input type="number" name="budget" className="border w-[250px]" onChange={(e)=>{setBudget(e.target.value)}} value={budget}/>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-full  w-fit pl-6 pr-6 pt-2 pb-2 bg-black text-white hover:bg-gray-400 hover:text-black mt-8 "
                onClick={handleSubmit}
              >
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RentWithDriver;
