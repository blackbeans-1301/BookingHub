import * as React from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import NearMeIcon from "@material-ui/icons/NearMe";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import { useRef } from "react";

const center = {
  lat: 48.8584,
  lng: 2.2945,
};

const Explore = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    console.log("something went wrong");
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }
  return (
    <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
      <h1 className="font-bold text-2xl mb-3">this is explore page</h1>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d953718.736782537!2d105.09079113216902!3d20.974037036735588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135008e13800a29%3A0x2987e416210b90d!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1671537828233!5m2!1sen!2s"
        width="1280"
        height="800"
        // style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      {/* <div className="flex mt-3">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 w-5/6">
          <CameraAltIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
          <input
            className="md:w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
            type="text"
            aria-label="Choose the destination..."
          />
        </div>

        <div className="w-1/6">
          <button className="w-3/4 h-full px-2 rounded-full bg-white text-colorText flex items-center justify-center ml-2 border-2 border-light-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-gray-200">
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="flex mt-10">
        <div className="w-20">this is search center</div>
        <div className="relative flex flex-col items-center h-screen w-full">
          <div className="absolute left-0 top-0 h-full w-full">
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              {directionResponse && (
                <DirectionsRenderer directions={directionResponse} />
              )}
            </GoogleMap>
          </div>

          <div className="p-4 rounded-lg m-4 bg-white drop-shadow-md w-8/12 z-5">
            <div className="flex justify-between">
              <Autocomplete>
                <input
                  type="text"
                  className="flex-1 m-1 p-2"
                  placeholder="Origin"
                  ref={originRef}
                />
              </Autocomplete>

              <Autocomplete>
                <input
                  type="text"
                  className="flex-1 m-1 p-2"
                  placeholder="Destination"
                  ref={destinationRef}
                />
              </Autocomplete>

              <button
                type="submit"
                className="bg-light-primary m-2 p-2 rounded-lg hover:bg-primary"
                onClick={calculateRoute}
              >
                Calculate Route
              </button>
              <button
                className="border-0 m-2 text-rose-300 hover:text-rose-500"
                onClick={clearRoute}
              >
                <CancelIcon />
              </button>
            </div>

            <div className="flex">
              <span className="text-colorText flex-1 m-1 p-2">
                Distance: <span>{distance}</span>
              </span>
              <span className="text-colorText flex-1 m-1 p-2">
                Duration: <span>{duration}</span>
              </span>
              <button
                className="m-2 text-slate-400 bg-slate-100 border-solid border-slate-100 hover:border-blue-200 border-2 hover:text-slate-600 p-1 rounded-full hover:bg-white"
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                  console.log("click near me");
                }}
              >
                <NearMeIcon />
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Explore;
