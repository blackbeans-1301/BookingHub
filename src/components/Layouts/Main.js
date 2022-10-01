import React, { useState } from "react";
import Header from "./Header";
import LocalHotelIcon from "@material-ui/icons/LocalHotel";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import SearchIcon from "@material-ui/icons/Search";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";

import { Component } from "react";
import Slider from "react-slick";

export default function Main() {
  const [arriveDay, setArriveDay] = useState(new Date());
  const [leaveDay, setLeaveDay] = useState(new Date());
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [open, setOpen] = useState(false);

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

  const travels = [
    {
        img: "https://wttc.org/DesktopModules/MVC/NewsArticleList/images/141_20201013185512_Consumer%20Survey%20Finds%2070%20Percent%20of%20Travelers%20Plan%20to%20Holiday%20in%202021.jpg",
        title: "How the least CO2 sorter works",
        time: "Nov 12, 2020 - 4 mins"
    },
    {
        img: "https://www.hospitalitynet.org/picture/153115031.jpg?t=1590753706",
        title: "The most underrated destinations across the USA",
        time: "Nov 12, 2020 - 4 mins"
    },
    {
        img: "https://imageio.forbes.com/specials-images/imageserve/6319db4060eda108bfecf5f7/0x0.jpg?format=jpg&width=1200",
        title: "title3",
        time: "Nov 12, 2020 - 4 mins"
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtnmawF2WrlYPOFHc7qnV_cp6BDnopoeX5H2qYP5BMjLh46ZLDQNW1Na-iLkLBOVT22PY&usqp=CAU",
        title: "title4",
        time: "Nov 12, 2020 - 4 mins"
    },
  ]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className="flex-1 h-screen">
      <Header />
      <div className="m-4">
        <div className="font-bold text-xl m-4 mb-4">Find the stay</div>
        <div className="bg-light-primary p-2 flex">
          <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
            <LocalHotelIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
            <input
              className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
              type="text"
              aria-label="Choose the destination..."
            />
          </div>

          <div className="flex items-center ml-2">
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 mr-1">
              <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
              <Flatpickr
                className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
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

            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
              <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
              <Flatpickr
                className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
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

          <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 ml-2 cursor-pointer">
            <PersonOutlineIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
            <input
              className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
              type="value"
              value={`${room} rooms, ${adult + child} people`}
              onClick={() => setOpen(!open)}
              //   onBlur={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute bg-white w-100 top-12 border-cyan-100 rounded-md p-2 shadow-xl">
                <li className="flex justify-between px-2 mb-2">
                  <p className="mr-20">Rooms</p>
                  <div className="">
                    <span
                      className="px-0.5 border-cyan-200 border-2 cursor-pointer"
                      onClick={decreaseRoom}
                    >
                      -
                    </span>
                    <span className="px-2 text-center w-1">{room}</span>
                    <span
                      className="px-0.5 border-cyan-200 border-2 cursor-pointer"
                      onClick={increaseRoom}
                    >
                      +
                    </span>
                  </div>
                </li>

                <li className="flex justify-between px-2 mb-2">
                  <p className="mr-20">Adults</p>
                  <div className="">
                    <span
                      className="px-0.5 border-cyan-200 border-2 cursor-pointer"
                      onClick={decreaseAdult}
                    >
                      -
                    </span>
                    <span className="px-2 text-center w-1">{adult}</span>
                    <span
                      className="px-0.5 border-cyan-200 border-2 cursor-pointer"
                      onClick={increaseAdult}
                    >
                      +
                    </span>
                  </div>
                </li>

                <li className="flex justify-between px-2 mb-2">
                  <p className="mr-20">Children</p>
                  <div className="">
                    <span
                      className="px-0.5 border-cyan-200 border-2 cursor-pointer"
                      onClick={decreaseChild}
                    >
                      -
                    </span>
                    <span className="px-2 text-center w-1">{child}</span>
                    <span
                      className="px-0.5 border-cyan-200 border-2 cursor-pointer"
                      onClick={increaseChild}
                    >
                      +
                    </span>
                  </div>
                </li>
              </div>
            )}
          </div>

          <button className="px-2 rounded-full bg-white text-colorText flex items-center ml-2 hover:bg-primary hover:text-white">
                <SearchIcon />
                <span>Search</span>
          </button>
        </div>
      </div>

      {/* <div className="bg-light-primary m-4 w-screen">
        <h2>Travel inspiration </h2>
        <Slider {...settings} className="flex justify-around items-center">
          {travels.map((item, index) => {
            return (
                <div key={index}>
                    <img src={item.img} className="w-10 h-16 rounded-xl" />
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="">{item.time}</p>
                </div>
            )
          })}
        </Slider>
      </div> */}
    </div>
  );
}
