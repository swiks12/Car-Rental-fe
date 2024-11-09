import React, { useState, useEffect, useRef } from "react";
import selfDrive from "../assets/selfDriveBg.png";
import {
  useJsApiLoader,
  StandaloneSearchBox,
  GoogleMap,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const libraries = ["places", "directions"];
const googleKey=import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// console.log(googleKey)

const SelfDrivePage = () => {
  const [destination, setDestination] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
  const [distance, setDistance] = useState(null);
  const [mapKey, setMapKey] = useState(0);  // This state will force re-render
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);

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

  if (!isLoaded) {
    return <div>{error || "Loading Google Maps..."}</div>;
  }

  const handleRouteClick = (index) => {
    setSelectedRouteIndex(index);
    const selectedRoute = routes[index];
    setDistance(selectedRoute.legs[0].distance.value / 1000);
  };

  const colors = ["red", "green", "purple"];
  const selectedColor = "blue";

  return (
    <>
      <img src={selfDrive} alt="selfDrive" className="h-[100vh] w-[100vw] object-cover z-[-1000] relative" />

      <div className="absolute top-[150px] left-[100px] flex gap-8">
        {/* Map Section */}
        <div style={{ height: "400px", width: "600px" }}>
          <GoogleMap
            key={mapKey}  // Force map to re-render
            center={{ lat: 27.6938, lng: 85.324 }}
            zoom={12}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            ref={mapRef}
          >
            <Marker position={{ lat: 27.6938, lng: 85.324 }} title="Pickup Location" />
            {routes.length > 0 && (
              <Marker position={routes[selectedRouteIndex ?? 0].legs[0].end_location} title="Destination" />
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

        {/* Form Section */}
        <div className="bg-white pl-8 pr-8 pt-12 pb-12 bg-opacity-40 rounded-lg">
          <p className="text-center font-bold text-xl mb-2">Booking Details</p>
          <form>
            <div className="flex gap-12 justify-center">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Booking Start Date</p>
                <input type="text" name="bookStartDate" className="border w-[250px]" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Booking End Date</p>
                <input type="text" name="bookEndDate" className="border w-[250px]" />
              </div>
            </div>

            <p className="text-center font-bold text-xl mt-5 mb-2">Pick Up Details</p>
            <div className="flex flex-col gap-2">
              <div className="flex gap-12 justify-center">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Pick Up Destination</p>
                  <input type="text" name="pickUp" className="border w-[250px]" value="Thapathali, Kathmandu" readOnly />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">Destination</p>
                  {isLoaded && (
                    <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
                      <input
                        type="text"
                        name="search_input"
                        className="border w-[250px]"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Search destination"
                      />
                    </StandaloneSearchBox>
                  )}
                </div>
              </div>
            </div>

            {distance !== null && (
              <p className="text-center mt-4">
                Distance between Pickup and Destination: {distance.toFixed(2)} km
              </p>
            )}

            {routes.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Select Alternate Route</p>
                {routes.map((route, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <button
                      type="button"
                      className={`w-full text-left py-2 px-4 rounded-lg ${
                        selectedRouteIndex === index ? "bg-blue-500 text-white" : "bg-gray-300"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleRouteClick(index);
                      }}
                    >
                      Route {index + 1} - {route.legs[0].distance.text}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SelfDrivePage;