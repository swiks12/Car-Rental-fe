import { useCallback, useState } from "react";

import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox
} from "@react-google-maps/api";

const mapContainerStyle = {
  height: "80vh",
  width: "100vw"
};

const center = {
  lat: 40.75378,
  lng: -73.55658
};

const zoom = 10;

export default function PlaceComponent() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc",
    libraries: ["places"]
  });

  const onSearchBoxLoad = (ref) => (this.searchBox = ref);
  const onPlacesChanged = () => {
    const location = this.searchBox.getPlaces()[0].geometry.location;
    const bounds = new window.google.maps.LatLngBounds(location.toJSON());
    const tempMap = map;
    setMap(map.fitBounds(bounds));
    console.log(bounds);
  };

  const [map, setMap] = useState(null);

  const onMapLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
    console.log(map);
  }, []);

  const onClick = (e) => {
    console.log("onClick args: ", e, { map });
    console.log(e.latLng.lat() + ", " + e.latLng.lng());
  };

  return (
    <div className="App">
      <h1>React Google Maps Standalone Searchbox</h1>
      <h2>Example below</h2>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={center}
          onLoad={onMapLoad}
          onClick={onClick}
        >
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Enter your location"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      )}
    </div>
  );
}
