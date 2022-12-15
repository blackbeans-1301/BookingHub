import React, { Fragment } from "react";
import { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import ToastMessage from "./ToastMessage";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";

export default function BookingModal({ isVisible, isClose }) {
  const [arriveDay, setArriveDay] = useState(new Date());
  const [leaveDay, setLeaveDay] = useState(new Date());

  const { arrive } = arriveDay;
  const { leave } = leaveDay;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="w-10/12 flex flex-col z-20">
        <ToastMessage />
        <div className="bg-white p-2 rounded flex flex-col m-2">
          <div className="flex justify-between m-2">
            <h2 className="font-bold text-3xl text-colorText">BookingModal</h2>
            <button
              className="text-light-close text-xl place-self-end hover:text-close-color"
              onClick={() => isClose()}
            >
              <CancelIcon />
            </button>
          </div>

          <div className="flex m-4">
            <div className="flex-1">
              <h2>Hotel name</h2>
            </div>

            <div className="flex-1 overflow-scroll modal-width overflow-y-scroll">
              <form action="" className="">
                <div className="form-group">
                  <h2 className="text-center uppercase font-semibold">
                    Booking & contact
                  </h2>
                  <div className="text-left relative">
                    <label for="name" className="m-2">
                      Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      className="w-full border-2 border-sky-200 p-1 rounded focus:border-sky-500"
                      name="name"
                    />
                  </div>
                  <div className="text-left relative">
                    <label for="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      className="w-full border-2 border-sky-200 p-1 rounded focus:border-sky-500"
                      name="email"
                    />
                  </div>
                  <div className="text-left relative">
                    <label for="phone">Phone</label>

                    <input
                      type="tel"
                      id="phone"
                      className="w-full border-2 border-sky-200 p-1 rounded focus:border-sky-500"
                      name="phone"
                    />
                  </div>
                </div>

                <div className="items-center">
                  <label>Details:</label>
                  <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 m-2">
                    <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none text-sky-500" />
                    <Flatpickr
                      className="w-full pr-3 pl-10 py-2 font-semibold placeholder-sky-500 text-sky-500 rounded border-2 border-sky-200"
                      value={arrive}
                      onChange={(arrive) => {
                        setArriveDay({ arrive });
                      }}
                      options={{
                        altFormat: "d/m/Y",
                        altInput: true,
                      }}
                      placeholder="Arrive day"
                    />
                  </div>

                  <div className="relative flex items-center m-2">
                    <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none text-sky-500" />
                    <Flatpickr
                      className="w-full pr-3 pl-10 py-2 font-semibold placeholder-sky-500 text-sky-500 rounded border-2 border-sky-200"
                      value={leave}
                      onChange={(leave) => {
                        setLeaveDay({ leave });
                      }}
                      options={{
                        altFormat: "d/m/Y",
                        altInput: true,
                      }}
                      placeholder="Leave day"
                    />
                  </div>
                </div>

                <div className="">
                  <label>Reservation details:</label>
                  <div className="bg-sky-100 rounded p-2 m-2">
                    <h2 className="text-sky-500 font-bold text-xl">
                      Deluxe Room
                    </h2>
                    <div className="flex justify-between mx-2">
                      <span className="">1 room x 2 night</span>
                      <span className="">$184.00</span>
                    </div>

                    <div className="text-gray-500 text-sm mx-2">
                      $92.00 per night
                    </div>
                  </div>

                  <div className="bg-sky-100 rounded p-2 m-2">
                    <h2 className="text-sky-500 font-bold text-xl m-2">
                      Deluxe Room
                    </h2>
                    <div className="flex justify-between mx-2">
                      <span className="">1 room x 2 night</span>
                      <span className="">$184.00</span>
                    </div>

                    <div className="text-gray-500 text-sm mx-2">
                      $92.00 per night
                    </div>
                  </div>

                  <div className="bg-sky-100 rounded p-2 m-2">
                    <h2 className="text-sky-500 font-bold text-xl">
                      Deluxe Room
                    </h2>
                    <div className="flex justify-between mx-2">
                      <span className="">1 room x 2 night</span>
                      <span className="">$184.00</span>
                    </div>

                    <div className="text-gray-500 text-sm mx-2">
                      $92.00 per night
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="grid">
                    <p className="info-text">
                      Please describe your needs 
                      <span className="text-gray-500 text-sm mx-2">(e.g. Extra beds, children's cots)</span>
                    </p>

                    <textarea
                      name="comments"
                      className="p-2 border-2 border-sky-200 rounded"
                      id="comments"
                    ></textarea>
                  </div>

                  <div className="">
                    <h2 className="text-sky-500 font-bold text-xl">Important information</h2>
                    
                    <div>
                      <ul className="list-disc ml-2">
                        <li>You will not be charged until your stay</li>
                        <li>
                          Pay the property directly in their local currency
                        </li>

                        <li>
                          Cancellations or changes made after 4:00pm (property
                          local time) on Dec 30, 2022 or no-shows are subject to
                          a property fee equal to the first nights rate plus
                          taxes and fees
                        </li>

                        <li>
                          If you are planning to arrive after midnight please
                          contact the property in advance using the information
                          on the booking confirmation. Front desk staff will
                          greet guests on arrival.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    type="submit"
                    value="Submit"
                    className="w-full bg-sky-200 hover:bg-sky-500 rounded hover:text-white p-1 mt-4"
                  >
                    Complete booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
