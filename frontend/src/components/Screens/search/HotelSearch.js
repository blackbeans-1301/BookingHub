import * as React from "react"
import { useState, useEffect } from "react"
import Flatpickr from "react-flatpickr"
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined"
import SearchIcon from "@material-ui/icons/Search"
import StarBorderIcon from '@mui/icons-material/StarBorder'
import PersonOutlineIcon from "@material-ui/icons/PersonOutline"
import "flatpickr/dist/themes/material_blue.css"
import { FormatDate } from "../../Common/CommonFunc"
import { AsyncPaginate } from "react-select-async-paginate"
import { searchHotelByKeyword } from "../../../apis/hotelApi"
import { getLSItem, setLSItem, redirect } from "../../../utils"
import { searchHotelByCriteria } from "../../../apis/hotelApi"

import googleMap from "../../../assets/images/GoogleMap.webp"

export default function HotelSearch({ hotels, dateIn, dateOut, setHotels }) {
  const [destination, setDestination] = useState()
  const [arriveDay, setArriveDay] = useState(new Date())
  const [leaveDay, setLeaveDay] = useState(new Date())
  const [room, setRoom] = useState(1)
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [open, setOpen] = useState(false)
  const [hotel, setHotel] = useState("")
  const [listHotels, setListHotels] = useState(() => {
    let values = []
    for (let item of hotels) {
      values.push(item)
    }
    return values
  })
  const [searchValue, setSearchValue] = useState("")
  const [startPrice, setStartPrice] = useState(0)
  const [endPrice, setEndPrice] = useState(100000)
  const [score, setScore] = useState()
  const [searched, setSearched] = useState(false)

  console.log(hotels)

  const { arrive } = arriveDay
  const { leave } = leaveDay

  const hotelScore = [0, 1, 2, 3, 4]

  let numberHotel = hotels.length

  useEffect(() => {
    setListHotels(hotels)
  }, [])

  useEffect(() => {
    console.log("mounted")
  }, [listHotels])

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


  const loadOptions = (searchValues) => {
    return getData(searchValues || "a")
  }

  const getData = async (keyword) => {
    const response = await searchHotelByKeyword(keyword)

    return {
      options: [...response.data],
      hasMore: false,
    }
  }

  const handleSearchChange = (value) => {
    setSearchValue(value)
  }

  const handleChange = (value) => {
    setHotel(value)
    setDestination(value.province)
  }

  function handleSearch() {
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

  const confirmCondition = async () => {
    const data = {
      rating: score,
      province: getLSItem("destination"),
      date_in: getLSItem("date_in"),
      date_out: getLSItem("date_out"),
      number_of_room: getLSItem("room"),
      number_of_guest: getLSItem("guest"),
      price_from: startPrice === 0 ? 0 : startPrice,
      price_to: endPrice,
    }
    const response = await searchHotelByCriteria(data, setListHotels)
    setHotels(response)
  }


  return (
    // listContainer
    <div>

      <div className="drop-shadow-sm p-2 pt-4 flex justify-center">
        <div className="relative w-60 flex items-center text-gray-400 focus-within:text-gray-600">
          {/* <LocalHotelIcon className="w-5 h-5 absolute ml-3 pointer-events-none" /> */}
          <AsyncPaginate
            styles={{
              border: 'none',
              width: '200px',
            }}
            className="w-60"
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

        <button
          className="px-2 rounded-full bg-white text-colorText flex items-center ml-2 border-2 border-light-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-gray-200"
          onClick={() => handleSearch()}
        >
          <SearchIcon />
          <span>Search</span>
        </button>
      </div>

      {/* -----------------------------LIST HOTELS HERE----------------------------- */}
      <div className="flex justify-center min-h-full mt-12">
        {/* listWapper */}

        <div className="w-full max-w-5xl flex">
          {/* listSearch */}
          <div className="flex-1 p-2.5 rounded-xl sticky top-2.5 mx-4 h-max pt-0">

            <div style={{
              backgroundImage: `url(${googleMap})`,
              width: "100%",
              height: "160px",
              backgroundSize: "contain"
            }}
              className="rounded-md cursor-pointer border border-primary flex items-center justify-center"
              onClick={() => {
                redirect(`${process.env.API_URL}/user/ExplorePage`)
              }}
            >
              <div className="text-center p-0 px-4 py-2 bg-primary rounded-md">
                <h1 className="text-white text-xl font-bold">
                  Go to map
                </h1>
              </div>
            </div>

            <div className="border-b border-t border-primary py-2 my-4">
              <h1 className="text-xl font-bold text-primary">Review Score</h1>
              <div className="flex my-2 justify-between">
                {hotelScore.map((item) => {
                  return (item === score ? (<div className="w-8 bg-primary cursor-pointer h-8 rounded-md border border-primary flex justify-center items-center"
                    onClick={() => {
                      setScore(item)
                    }}
                  >
                    <div className="text-md font-bold text-white">{item}+</div>
                  </div>) : (<div className="w-8 cursor-pointer h-8 rounded-md border border-primary flex justify-center items-center"
                    onClick={() => {
                      setScore(item)
                    }}
                  >
                    <div className="text-md font-bold text-primary">{item}+</div>
                  </div>)
                  )

                })}
              </div>
            </div>

            <div className="border-b border-primary py-2 my-4">
              <h1 className="text-xl font-bold text-primary">Price</h1>
              <div className="my-2 justify-between">
                <div className="flex justify-between">
                  <div className="text-primary font-semibold">From </div>
                  <input type="number" onChange={(event) => {
                    setStartPrice(event.target.value)
                    console.log(event.target.value)
                  }}
                    className="focus:outline-0 py-1 px-1 w-32 border border-primary mb-2 rounded-md"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="text-primary font-semibold">To </div>
                  <input type="number" onChange={(event) => {
                    setEndPrice(event.target.value)
                    console.log(event.target.value)
                  }}
                    className="focus:outline-0 py-1 px-1 w-32 border border-primary mb-2 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="py-2 my-4 bg-primary rounded-md cursor-pointer"
              onClick={confirmCondition}
            >
              <div className="my-2 justify-between">
                <div className="flex justify-center items-center">
                  <div className="text-white font-semibold">Confirm</div>
                </div>
              </div>
            </div>
          </div>




          {/* ------------------list hotel----------------- */}
          <div className="flex3 w-full">
            {/* SearchItem */}

            {numberHotel == 0 ? (
              <div>
                <h1 className="flex items-center justify-center text-lg text-sky-600 font-bold">
                  No hotels were founded
                </h1>
              </div>
            ) : (
              hotels.map((item, index) => {
                return (
                  <div
                    className="bg-primary rounded-lg flex justify-between mb-4"
                    key={index}
                  >
                    {/* siImg */}
                    <div className="rounded-l-lg h-64 overflow-hidden w-72">
                      <img
                        src={item.Images[0].imgURL}
                        alt=""
                        className="object-cover w-96 h-96"
                      />
                    </div>


                    {/* siDesc */}
                    <div className="flex flex-col gap-1.5 flex2 p-2.5 pl-4 justify-center">
                      {/* siTitle */}
                      <h1 className="text-2xl text-white font-bold">
                        {item.name}
                      </h1>

                      <span className="text-sm text-green-400 p-1 rounded w-max underline">
                        {item.fromCenter}m from center
                      </span>

                      <span className="mt-1 text-white text-sm">
                        <span className="font-bold">Amenities: </span>
                        {item.criteria}
                      </span>

                      <span className="font-bold text-green-400">
                        Free cancellation
                      </span>
                    </div>

                    {/* siDetails */}
                    <div className="flex flex-col flex-1 justify-center my-4 pl-2.5 pr-2.5 border-l-2">
                      <div className="flex flex-col gap-1 justify-center">
                        <div className="text-white text-2xl font-bold">{item.rating}/5</div>
                        <div className="text-white font-bold">{item.classification} rated</div>
                        <div className="border-b border-white"></div>
                        <div className="text-white">From</div>
                        <span className="text-xl font-semibold text-white">
                          ${item.startPrice}
                        </span>
                        {/* siTaxOp */}
                        <span className="text-sm text-gray-500">
                          Includes taxes and fees
                        </span>
                        {/* siCheckButton */}
                        <button
                          className="bg-green-700 font-bold px-2 py-1 text-white rounded-sm hover:bg-sky-600 cursor-pointer"
                          onClick={() => {
                            console.log("item ", index, item)
                            console.log('hotel id', item.hotel_id)
                            redirect(`${process.env.API_URL}/user/HotelPage?x=${item.hotel_id}/${dateIn}/${dateOut}`)
                          }}
                        >
                          See availability
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div >
  )
}
