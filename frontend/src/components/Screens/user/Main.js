import React, { Fragment, useEffect, useState } from "react"
import LocalHotelIcon from "@material-ui/icons/LocalHotel"
import PersonOutlineIcon from "@material-ui/icons/PersonOutline"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined"
import SearchIcon from "@material-ui/icons/Search"
import Carousel from "react-elastic-carousel"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FormatDate } from "../../Common/CommonFunc"
import NearbyHotel from "./nearbyHotel/NearbyHotel"
import PopularCities from "../../Items/PopularCities"
import Reason from "../../Layouts/user/Reason"
import { redirect, setLSItem } from "../../../utils"
import { Autocomplete, TextField } from "@mui/material"

import { useDebounce } from "use-debounce"
import { searchHotelByKeyword } from "../../../apis/hotelApi"

import { AsyncPaginate } from "react-select-async-paginate"
import { mapValues } from "lodash"
import { NonceProvider } from "react-select"

export default function Main() {
  const [destination, setDestination] = useState()
  const [arriveDay, setArriveDay] = useState(new Date())
  const [leaveDay, setLeaveDay] = useState(new Date())
  const [room, setRoom] = useState(1)
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [open, setOpen] = useState(false)
  const [hotel, setHotel] = useState("")

  const [advanceList, setAdvanceList] = useState([])
  const [searchValue, setSearchValue] = useState("")
  // const [keywords] = useDebounce(searchValue, 1500) //delay set value keywords sau 1.5s

  const { arrive } = arriveDay
  const { leave } = leaveDay

  const defaultProps = {
    options: advanceList,
    getOptionLabel: (options) => {
      if (options.length > 0) {
        return options.name
      } else {
        return ""
      }
    },
  }

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

  function handleSearch() {
    console.log("destination: ", destination)
    console.log("arrive day", arriveDay)
    console.log("format arrive day", FormatDate(arriveDay.arrive))
    console.log("leave day", leaveDay)
    console.log("adults", adult)
    console.log("child", child)
    console.log("room", room)

    let date_in = FormatDate(arriveDay.arrive)
    let date_out = FormatDate(leaveDay.leave)
    let guest = adult + child

    let data = {
      date_in: FormatDate(arriveDay.arrive),
      date_out: FormatDate(leaveDay.leave),
      province: destination,
      number_of_room: parseFloat(room),
      number_of_guest: parseFloat(adult + child),
    }

    // useEffect(() => {
    //   searchHotelByCriteria(data, setHotel);
    // }, [])

    // let searchResult = searchHotelByCriteria(data, setHotel)
    // console.log("search result: ", searchResult, "hotels", hotel)

    setLSItem("destination", destination)
    setLSItem("date_in", date_in)
    setLSItem("date_out", date_out)
    setLSItem("room", room)
    setLSItem("guest", guest)

    redirect(`${process.env.API_URL}/user/SearchHotelPage?x=${destination}/${date_in}/${date_out}/room${room}/guest${guest}`)
  }

  const getAdvanceList = async (keyword) => {
    await searchHotelByKeyword(keyword).then((response) => {
      setAdvanceList(response.data)
    })
  }

  const handleSearchChange = (value) => {
    setSearchValue(value)
  }

  const handleChange = (value) => {
    setHotel(value)
    setDestination(value.province)
  }
  const getData = async (keyword) => {
    const response = await searchHotelByKeyword(keyword)

    return {
      options: [...response.data],
      hasMore: false,
    }
  }

  const loadOptions = (searchValues) => {
    return getData(searchValues || "a")
  }

  return (
    <div className="w-full">
      <div className="m-4">
        <div className="font-bold text-xl m-4 mb-4 text-colorText">
          Find the stay
        </div>
        <div className="drop-shadow-sm p-2 flex justify-center">
          <div className="relative w-60 flex items-center text-gray-400 focus-within:text-gray-600">
            <AsyncPaginate
              styles={{
                border: 'none',
                width: '200px',
              }}
              className="w-60 z-10"
              value={hotel}
              debounceTimeout={1000}
              loadOptions={loadOptions}
              getOptionLabel={(e) => e.province}
              getOptionValue={(e) => e.province}
              onInputChange={handleSearchChange}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center ml-2">
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 mr-1">
              <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
              <Flatpickr
                className="w-full mr-2 pl-10 py-2 font-semibold placeholder-gray-500 border-none text-colorText rounded-md ring-2 ring-gray-300 focus:ring-primary-500 focus:ring-2"
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
                className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-md border-none ring-2 ring-gray-300 focus:ring-primary-500 focus:ring-2"
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
              className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-md border-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
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

          <button
            className="px-2 rounded-full bg-white ml-4 h-24 w-24 text-colorText flex items-center ml-2 border-2 border-light-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-gray-200"
            onClick={() => handleSearch()}
          >
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>
      </div>
      <Reason />
      <NearbyHotel />
      <PopularCities />
    </div>
  )
}
