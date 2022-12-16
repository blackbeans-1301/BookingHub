import React, { Fragment, useState } from "react"
// import Header from "../Layouts/LayoutComponent/Header";
// import Footer from "./Footer";
import LocalHotelIcon from "@material-ui/icons/LocalHotel"
import PersonOutlineIcon from "@material-ui/icons/PersonOutline"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined"
import SearchIcon from "@material-ui/icons/Search"
import Carousel from "react-elastic-carousel"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import "slick-carousel/slick/slick.css";

// import { Component } from "react";
// import Slider from "react-slick";
// import { favoriteHotels } from "../Layouts/data";
import Slider from "../../Items/Slider"
import dataSlider from "../../Layouts/dataSlider"
import CarouselItem from "../../Items/CarouselItem"
import Item from "../../Items/Item"
import Reason from "../../../components/Layouts/LayoutComponent/Reason"
import NearbyHotel from "./nearbyHotel/NearbyHotel"
import PopularCities from "../../Items/PopularCities"

export default function Main() {
  const [arriveDay, setArriveDay] = useState(new Date())
  const [leaveDay, setLeaveDay] = useState(new Date())
  const [room, setRoom] = useState(1)
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [open, setOpen] = useState(false)

  const { arrive } = arriveDay
  const { leave } = leaveDay

  //   room
  const decreaseRoom = () => {
    if (room > 0) {
      setRoom((prevCount) => prevCount - 1)
    } else {
      setRoom(0)
    }
  }

  const increaseRoom = () => {
    setRoom((prevCount) => prevCount + 1)
  }

  //   adult
  const decreaseAdult = () => {
    if (room > 0) {
      setAdult((prevCount) => prevCount - 1)
    } else {
      setAdult(0)
    }
  }

  const increaseAdult = () => {
    setAdult((prevCount) => prevCount + 1)
  }

  //   children
  const decreaseChild = () => {
    if (room > 0) {
      setChild((prevCount) => prevCount - 1)
    } else {
      setChild(0)
    }
  }

  const increaseChild = () => {
    setChild((prevCount) => prevCount + 1)
  }

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ]

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  }

  return (
    // <Fragment>
    //   <div className="flex-1 h-screen absolute right-0">
    //     <Header />
    <div className="w-full">
      <div className="m-4">
        <div className="font-bold text-xl m-4 mb-4 text-colorText">
          Find the stay
        </div>
        <div className="drop-shadow-sm p-2 flex justify-center">
          <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
            <LocalHotelIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
            <input
              className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
              type="text"
              placeholder="Find the destination..."
            />
          </div>

          <div className="flex items-center ml-2">
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 mr-1">
              <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
              <Flatpickr
                className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
                value={arrive}
                onChange={(arrive) => {
                  setArriveDay({ arrive })
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
                  setLeaveDay({ leave })
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

          <button className="px-2 rounded-full bg-white text-colorText flex items-center ml-2 border-2 border-light-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-gray-200">
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>
      </div>
      <Reason />
      <NearbyHotel />
      <PopularCities />
    </div >
  )
}
