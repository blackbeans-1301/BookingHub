import * as React from "react";

import {
  useJsApiLoader,
} from "@react-google-maps/api";

const Explore = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) {
    console.log("something went wrong");
  }

  return (
    <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
      <h1 className="font-bold text-2xl mb-3">Explore</h1>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d953718.736782537!2d105.09079113216902!3d20.974037036735588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135008e13800a29%3A0x2987e416210b90d!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1671537828233!5m2!1sen!2s"
        width="1280"
        height="800"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Explore;
