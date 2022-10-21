import * as React from "react";
import Navigation from "../components/Layouts/Navigation";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { bookingDetails, cancellation, ChangeBooking, covid19, specialRequests } from "../assets/data/SupportData";

const SupportPage = () => {
  return (
    <div>
      <div className="flex">
        <Navigation />
        <div className="flex-1 h-screen">
          <Header />

          <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
            <div className="w-screen md:w-auto m-0 p-0">
              <h1 className="font-bold text-3xl mb-3 text-primary">
                Support Center
              </h1>
              <p className="font-bold text-xl mb-3 ml-3 text-primary">
                Booking details
              </p>

              {bookingDetails.map((item, index) => {
                console.log("item", item.title, item.content, index);
                return (
                  <div className="w-11/12 ml-6 mb-6">
                    <button className="bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group w-full">
                      <div className="flex justify-between items-center">
                        <p className="px-4 text-left font-bold">{item.title}</p>
                        <span className="p-2 hover:bg-gray-100">
                          <ArrowDropDownIcon />
                        </span>
                      </div>

                      <div className="hidden group-focus:block top-full min-w-full w-full bg-white shadow-md mt-1 rounded text-left border rounded px-4 py-1 border-b mt-2">
                        {item.content}
                      </div>
                    </button>
                  </div>
                );
              })}

              <p className="font-bold text-xl mb-3 ml-3 text-primary">
                Cancellation
              </p>

              {cancellation.map((item, index) => {
                console.log("item", item.title, item.content, index);
                return (
                  <div className="w-11/12 ml-6 mb-6">
                    <button className="bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group w-full">
                      <div className="flex justify-between items-center">
                        <p className="px-4 text-left font-bold">{item.title}</p>
                        <span className="p-2 hover:bg-gray-100">
                          <ArrowDropDownIcon />
                        </span>
                      </div>

                      <div className="hidden group-focus:block top-full min-w-full w-full bg-white shadow-md mt-1 rounded text-left border rounded px-4 py-1 border-b mt-2">
                        {item.content}
                      </div>
                    </button>
                  </div>
                );
              })}

              <p className="font-bold text-xl mb-3 ml-3 text-primary">
                Change a booking
              </p>

              {ChangeBooking.map((item, index) => {
                console.log("item", item.title, item.content, index);
                return (
                  <div className="w-11/12 ml-6 mb-6">
                    <button className="bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group w-full">
                      <div className="flex justify-between items-center">
                        <p className="px-4 text-left font-bold">{item.title}</p>
                        <span className="p-2 hover:bg-gray-100">
                          <ArrowDropDownIcon />
                        </span>
                      </div>

                      <div className="hidden group-focus:block top-full min-w-full w-full bg-white shadow-md mt-1 rounded text-left border rounded px-4 py-1 border-b mt-2">
                        {item.content}
                      </div>
                    </button>
                  </div>
                );
              })}

              <p className="font-bold text-xl mb-3 ml-3 text-primary">
                Special requests
              </p>

              {specialRequests.map((item, index) => {
                console.log("item", item.title, item.content, index);
                return (
                  <div className="w-11/12 ml-6 mb-6">
                    <button className="bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group w-full">
                      <div className="flex justify-between items-center">
                        <p className="px-4 text-left font-bold">{item.title}</p>
                        <span className="p-2 hover:bg-gray-100">
                          <ArrowDropDownIcon />
                        </span>
                      </div>

                      <div className="hidden group-focus:block top-full min-w-full w-full bg-white shadow-md mt-1 rounded text-left border rounded px-4 py-1 border-b mt-2">
                        {item.content}
                      </div>
                    </button>
                  </div>
                );
              })}

              <p className="font-bold text-xl mb-3 ml-3 text-primary">
                COVID-19
              </p>

              {covid19.map((item, index) => {
                console.log("item", item.title, item.content, index);
                return (
                  <div className="w-11/12 ml-6 mb-6">
                    <button className="bg-white border focus:outline-none shadow text-gray-600 rounded focus:ring ring-gray-200 group w-full">
                      <div className="flex justify-between items-center">
                        <p className="px-4 text-left font-bold">{item.title}</p>
                        <span className="p-2 hover:bg-gray-100">
                          <ArrowDropDownIcon />
                        </span>
                      </div>

                      <div className="hidden group-focus:block top-full min-w-full w-full bg-white shadow-md mt-1 rounded text-left border rounded px-4 py-1 border-b mt-2">
                        {item.content}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
