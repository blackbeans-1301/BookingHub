import * as React from "react";
import Navigation from "../../components/Layouts/Navigation";
import Main from "../../components/Layouts/Main";
import Header from "../../components/Layouts/Header";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import SearchIcon from "@material-ui/icons/Search";

const ThingsToDoPage = () => {
  return (
    <div className="flex">
      <Navigation />
      <div className="flex-1 h-screen">
        <Header />

        <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
          <h1 className="font-bold text-2xl mb-3">
            Find the best things to do for your trip
          </h1>

          <div className="flex mt-3">
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
        </div>
      </div>
    </div>
  );
};

export default ThingsToDoPage;
