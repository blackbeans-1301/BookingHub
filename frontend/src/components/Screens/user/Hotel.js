import * as React from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import NearbyHotel from "./nearbyHotel/NearbyHotel";
import HotelImg from "../../Items/HotelImg";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { useState, useEffect } from "react";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import { getHotelById } from "../../../apis/hotelApi";

export default function Hotel({id}) {
  const [arriveDay, setArriveDay] = useState(new Date());
  const [leaveDay, setLeaveDay] = useState(new Date());
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState();

  const { arrive } = arriveDay;
  const { leave } = leaveDay;

  //   room
  const decreaseRoom = () => {
    if (room > 0) {
      setRoom((prevCount) => prevCount - 1);
    } else {
      setRoom(0);
    }
  };

  const increaseRoom = () => {
    setRoom((prevCount) => prevCount + 1);
  };

  //   adult
  const decreaseAdult = () => {
    if (room > 0) {
      setAdult((prevCount) => prevCount - 1);
    } else {
      setAdult(0);
    }
  };

  const increaseAdult = () => {
    setAdult((prevCount) => prevCount + 1);
  };

  //   children
  const decreaseChild = () => {
    if (room > 0) {
      setChild((prevCount) => prevCount - 1);
    } else {
      setChild(0);
    }
  };

  const increaseChild = () => {
    setChild((prevCount) => prevCount + 1);
  };

  console.log('hotel id', id);

  useEffect(() => {
    getHotelById(id, setHotel);
  }, [])
  console.log('hotel', hotel);

  return (
    // hotelContainer
    <div className="flex justify-center mt-4">
      {/* hotelWrapper */}
      <div className="w-full max-w-5xl flex flex-col gap-2.5 mx-4">
        <HotelImg />

        <div className="w-full">
          {/* hotelTitle */}
          <h1 className="text-2xl font-bold text-sky-600">
            {hotel.name}
          </h1>

          <span className="">{hotel.rating}/10 Very good</span>
          {/* hotelAddress */}
          <div className="flex items-center gap-2.5">
            <LocationOnIcon />
            <span>{hotel.address}</span>
          </div>

          <div className="">
            <h2 className="font-bold text-lg">Popular amenities</h2>
            <div className="flex justify-around">
              <div className="flex flex-col w-5/12">
                <span className="">Pool</span>
                <span className="">Free Wifi</span>
              </div>
              <div className="flex flex-col w-5/12">
                <span className="">Restaurant</span>
                <span className="">Gym</span>
              </div>
            </div>
          </div>
          {/* hotelDistance */}
          <span className="text-sky-500">
            Excellent location - 500m from center
          </span>
          <br />
          {/* hotelPriceHighlight */}
          <span className="text-green-600">
            Book a stay over $114 at this property and get a free airport taxi
          </span>

          {/* hotelDetails */}
          <div className="">
            {/* hotelDetailText */}
            <h1 className="">{hotel.description}</h1>

            {/* hotelDesc */}
            <p className="">Located a 5-minute walk from the...</p>
          </div>
        </div>

        <div className="">
          <h1 className="text-lg font-bold text-sky-600">Choose your room</h1>
          <div className="flex">
            <div className="flex items-center ml-2">
              <div className="relative flex items-center text-sky-300 focus-within:text-sky-600 mr-4">
                <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
                <Flatpickr
                  className="w-full pr-3 pl-10 py-2 font-semibold placeholder-sky-500 text-sky-300 rounded ring-2 ring-sky-300"
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

              <div className="relative flex items-center text-sky-300 focus-within:text-sky-600 mr-4">
                <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
                <Flatpickr
                  className="w-full pr-3 pl-10 py-2 font-semibold placeholder-sky-500 text-sky-300 rounded ring-2 ring-sky-300"
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

            <div className="relative flex items-center text-sky-300 focus-within:text-sky-600 ml-2 cursor-pointer mr-4">
              <PersonOutlineIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
              <input
                className="w-full pr-3 pl-10 py-2 font-semibold placeholder-sky-500 text-sky-300 rounded ring-2 ring-sky-300"
                type="value"
                value={`${room} rooms, ${adult + child} people`}
                onClick={() => setOpen(!open)}
                //   onBlur={() => setOpen(!open)}
              />

              {open && (
                <div className="absolute bg-white w-max top-12 border-cyan-100 rounded-md p-2 shadow-xl">
                  <div className="w-56 flex justify-between px-2 m-2">
                    <p className="w-20">Rooms</p>

                    {/* optionCounter */}
                    <div className="flex items-center gap-2.5">
                      <button
                        className="w-8 h-8 border-2 text-sky-600 bg-white border-sky-600"
                        onClick={decreaseRoom}
                      >
                        -
                      </button>
                      <span className="w-3">{room}</span>
                      <button
                        className="w-8 h-8 border-2 text-sky-600 bg-white border-sky-600"
                        onClick={increaseRoom}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="w-56 flex justify-between px-2 m-2">
                    <p className="w-20">Adults</p>
                    <div className="flex items-center gap-2.5">
                      <button
                        className="w-8 h-8 border-2 text-sky-600 bg-white border-sky-600"
                        onClick={decreaseAdult}
                      >
                        -
                      </button>
                      <span className="w-3">{adult}</span>
                      <button
                        className="w-8 h-8 border-2 text-sky-600 bg-white border-sky-600"
                        onClick={increaseAdult}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="w-56 flex justify-between px-2 m-2">
                    <p className="w-20">Children</p>
                    <div className="flex items-center gap-2.5">
                      <button
                        className="w-8 h-8 border-2 text-sky-600 bg-white border-sky-600"
                        onClick={decreaseChild}
                      >
                        -
                      </button>
                      <span className="w-3">{child}</span>
                      <button
                        className="w-8 h-8 border-2 text-sky-600 bg-white border-sky-600"
                        onClick={increaseChild}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="px-2 py-1 rounded bg-sky-300 hover:bg-sky-600 text-black hover:text-white font-semibold">
              Check availability
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap">
          <div className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2">
            <img
              src="https://cache.marriott.com/content/dam/marriott-renditions/TNASI/tnasi-guestroom-5428-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"
              className="w-full object-cover"
            />
            <h3 className="font-bold text-lg text-sky-600 mt-2">
              Superior Double Room
            </h3>
            <span className="text-sm text-gray-400">
              4.3/5 guest room rating
            </span>

            <div className="flex flex-col">
              <span className="text-sm">City view</span>
              <span className="text-sm">1 King bed</span>
              <span className="text-sm">Free wifi</span>
            </div>

            <span className="text-xs font-semibold text-white bg-green-600 p-1 rounded">
              37% off
            </span>

            <div className="flex justify-between mt-4 items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold">$76</span>
                <span className="text-sm text-gray-400">$173 total</span>
                <span className="text-sm text-gray-400">
                  includes taxes & fees
                </span>
              </div>

              <div className="">
                <button className="text-black bg-sky-300 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2">
            <img
              src="https://cache.marriott.com/content/dam/marriott-renditions/TNASI/tnasi-guestroom-5428-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"
              className="w-full object-cover"
            />
            <h3 className="font-bold text-lg text-sky-600 mt-2">
              Superior Double Room
            </h3>
            <span className="text-sm text-gray-400">
              4.3/5 guest room rating
            </span>

            <div className="flex flex-col">
              <span className="text-sm">City view</span>
              <span className="text-sm">1 King bed</span>
              <span className="text-sm">Free wifi</span>
            </div>

            <span className="text-xs font-semibold text-white bg-green-600 p-1 rounded">
              37% off
            </span>

            <div className="flex justify-between mt-4 items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold">$76</span>
                <span className="text-sm text-gray-400">$173 total</span>
                <span className="text-sm text-gray-400">
                  includes taxes & fees
                </span>
              </div>

              <div className="">
                <button className="text-black bg-sky-300 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2">
            <img
              src="https://cache.marriott.com/content/dam/marriott-renditions/TNASI/tnasi-guestroom-5428-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"
              className="w-full object-cover"
            />
            <h3 className="font-bold text-lg text-sky-600 mt-2">
              Superior Double Room
            </h3>
            <span className="text-sm text-gray-400">
              4.3/5 guest room rating
            </span>

            <div className="flex flex-col">
              <span className="text-sm">City view</span>
              <span className="text-sm">1 King bed</span>
              <span className="text-sm">Free wifi</span>
            </div>

            <span className="text-xs font-semibold text-white bg-green-600 p-1 rounded">
              37% off
            </span>

            <div className="flex justify-between mt-4 items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold">$76</span>
                <span className="text-sm text-gray-400">$173 total</span>
                <span className="text-sm text-gray-400">
                  includes taxes & fees
                </span>
              </div>

              <div className="">
                <button className="text-black bg-sky-300 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2">
            <img
              src="https://cache.marriott.com/content/dam/marriott-renditions/TNASI/tnasi-guestroom-5428-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"
              className="w-full object-cover"
            />
            <h3 className="font-bold text-lg text-sky-600 mt-2">
              Superior Double Room
            </h3>
            <span className="text-sm text-gray-400">
              4.3/5 guest room rating
            </span>

            <div className="flex flex-col">
              <span className="text-sm">City view</span>
              <span className="text-sm">1 King bed</span>
              <span className="text-sm">Free wifi</span>
            </div>

            <span className="text-xs font-semibold text-white bg-green-600 p-1 rounded">
              37% off
            </span>

            <div className="flex justify-between mt-4 items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold">$76</span>
                <span className="text-sm text-gray-400">$173 total</span>
                <span className="text-sm text-gray-400">
                  includes taxes & fees
                </span>
              </div>

              <div className="">
                <button className="text-black bg-sky-300 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2">
            <img
              src="https://cache.marriott.com/content/dam/marriott-renditions/TNASI/tnasi-guestroom-5428-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"
              className="w-full object-cover"
            />
            <h3 className="font-bold text-lg text-sky-600 mt-2">
              Superior Double Room
            </h3>
            <span className="text-sm text-gray-400">
              4.3/5 guest room rating
            </span>

            <div className="flex flex-col">
              <span className="text-sm">City view</span>
              <span className="text-sm">1 King bed</span>
              <span className="text-sm">Free wifi</span>
            </div>

            <span className="text-xs font-semibold text-white bg-green-600 p-1 rounded">
              37% off
            </span>

            <div className="flex justify-between mt-4 items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold">$76</span>
                <span className="text-sm text-gray-400">$173 total</span>
                <span className="text-sm text-gray-400">
                  includes taxes & fees
                </span>
              </div>

              <div className="">
                <button className="text-black bg-sky-300 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2">
            <img
              src="https://cache.marriott.com/content/dam/marriott-renditions/TNASI/tnasi-guestroom-5428-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"
              className="w-full object-cover"
            />
            <h3 className="font-bold text-lg text-sky-600 mt-2">
              Superior Double Room
            </h3>
            <span className="text-sm text-gray-400">
              4.3/5 guest room rating
            </span>

            <div className="flex flex-col">
              <span className="text-sm">City view</span>
              <span className="text-sm">1 King bed</span>
              <span className="text-sm">Free wifi</span>
            </div>

            <span className="text-xs font-semibold text-white bg-green-600 p-1 rounded">
              37% off
            </span>

            <div className="flex justify-between mt-4 items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold">$76</span>
                <span className="text-sm text-gray-400">$173 total</span>
                <span className="text-sm text-gray-400">
                  includes taxes & fees
                </span>
              </div>

              <div className="">
                <button className="text-black bg-sky-300 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2">
            <img
              src="https://cache.marriott.com/content/dam/marriott-renditions/TNASI/tnasi-guestroom-5428-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"
              className="w-full object-cover"
            />
            <h3 className="font-bold text-lg text-sky-600 mt-2">
              Superior Double Room
            </h3>
            <span className="text-sm text-gray-400">
              4.3/5 guest room rating
            </span>

            <div className="flex flex-col">
              <span className="text-sm">City view</span>
              <span className="text-sm">1 King bed</span>
              <span className="text-sm">Free wifi</span>
            </div>

            <span className="text-xs font-semibold text-white bg-green-600 p-1 rounded">
              37% off
            </span>

            <div className="flex justify-between mt-4 items-center">
              <div className="flex flex-col">
                <span className="text-lg font-bold">$76</span>
                <span className="text-sm text-gray-400">$173 total</span>
                <span className="text-sm text-gray-400">
                  includes taxes & fees
                </span>
              </div>

              <div className="">
                <button className="text-black bg-sky-300 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded">
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-sky-600 mb-6">Reviews</h1>
          <div className="flex">
            <div className="flex-1">
              <div className="flex items-center">
                <span className="text-6xl font-bold mr-2">8.2</span>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Very Good</span>
                  <span className="text-sky-600">368 reviews</span>
                </div>
              </div>
            </div>

            <div className="flex3">
              <div className="bg-sky-100 rounded-lg p-2 flex flex-col my-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">8/10 Good</span>
                    <span className="font-bold text-sky-600 text-xl">
                      
                       Adrian
                    </span>
                  </div>
                  <span className="text-gray-400">
                    <AccessTimeOutlinedIcon /> Aug 10, 2022
                  </span>
                </div>

                <span className="text-gray-500">
                  <TagFacesIcon /> Liked
                </span>
                <p className="ml-2">
                  Nice place but place looks old. Need an upgrade. But it’s
                  value for money. Arranged a taxi pick up at the airport but
                  never showed up! Really disappointing
                </p>
                <span className="text-gray-400 text-sm">
                  Stayed 1 night in Aug 2022
                </span>
              </div>

              <div className="bg-sky-100 rounded-lg p-2 flex flex-col my-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">8/10 Good</span>
                    <span className="font-bold text-sky-600 text-xl">
                      
                       Adrian
                    </span>
                  </div>
                  <span className="text-gray-400">
                    <AccessTimeOutlinedIcon /> Aug 10, 2022
                  </span>
                </div>

                <span className="text-gray-500">
                  <TagFacesIcon /> Liked
                </span>
                <p className="ml-2">
                  Nice place but place looks old. Need an upgrade. But it’s
                  value for money. Arranged a taxi pick up at the airport but
                  never showed up! Really disappointing
                </p>
                <span className="text-gray-400 text-sm">
                  Stayed 1 night in Aug 2022
                </span>
              </div>

              <div className="bg-sky-100 rounded-lg p-2 flex flex-col my-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">8/10 Good</span>
                    <span className="font-bold text-sky-600 text-xl">
                      
                       Adrian
                    </span>
                  </div>
                  <span className="text-gray-400">
                    <AccessTimeOutlinedIcon /> Aug 10, 2022
                  </span>
                </div>

                <span className="text-gray-500">
                  <TagFacesIcon /> Liked
                </span>
                <p className="ml-2">
                  Nice place but place looks old. Need an upgrade. But it’s
                  value for money. Arranged a taxi pick up at the airport but
                  never showed up! Really disappointing
                </p>
                <span className="text-gray-400 text-sm">
                  Stayed 1 night in Aug 2022
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
