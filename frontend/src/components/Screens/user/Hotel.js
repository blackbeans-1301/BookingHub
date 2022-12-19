import * as React from "react"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import NearbyHotel from "./nearbyHotel/NearbyHotel"
import HotelImg from "../../Items/HotelImg"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import { useState, useEffect } from "react"
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined"
import PersonOutlineIcon from "@material-ui/icons/PersonOutline"
import TagFacesIcon from "@material-ui/icons/TagFaces"
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined"
import { getHotelById } from "../../../apis/hotelApi"
import { getAllRoomsByCriteria } from "../../../apis/roomApi"
import { FormatDate, FormatDateToGBShort } from "../../Common/CommonFunc"
import { getCommentsOfHotel } from "../../../apis/commentApi"

export default function Hotel({ id, dateIn, dateOut }) {
  const [arriveDay, setArriveDay] = useState(new Date())
  const [leaveDay, setLeaveDay] = useState(new Date())
  const [room, setRoom] = useState(1)
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [open, setOpen] = useState(false)
  const [hotel, setHotel] = useState()
  const [listRoom, setListRoom] = useState()
  const [listComment, setListComment] = useState()

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

  console.log("hotel id", id)

  useEffect(() => {
    getHotelById(id, setHotel)
  }, [])

  // const callApi = async () => {
  //   const response = await getHotelById(id);
  //   console.log('res', response);
  //   setHotel(response);

  //   if (response.status === 200) {
  //   } else if (response.status === 400) {
  //     console.log(response.status, response);
  //     // toast.error(response.message);
  //   }
  // };
  // callApi();

  console.log("hotel", hotel)

  const data = {
    hotel_id: id,
    date_in: FormatDate(dateIn),
    date_out: FormatDate(dateOut),
  }

  console.log("post data", data)
  useEffect(() => {
    getAllRoomsByCriteria(data, setListRoom)
  }, [])
  console.log("all room", listRoom)

  useEffect(() => {
    getCommentsOfHotel(id, setListComment)
  }, [])
  console.log("comments", listComment)

  const handleAddRoom = (roomId) => {
    console.log(roomId)
  }

  return (
    // hotelContainer
    <div className="flex justify-center mt-4">
      {/* hotelWrapper */}
      <div className="w-full max-w-5xl flex flex-col gap-2.5 mx-4">
        <HotelImg />

        <div className="w-full">
          {/* hotelTitle */}
          <h1 className="text-2xl font-bold text-sky-600">
            {hotel !== undefined && hotel.name}
          </h1>

          <span className="">
            {hotel !== undefined && hotel.rating}/10 Very good
          </span>
          {/* hotelAddress */}
          <div className="flex items-center gap-2.5">
            <LocationOnIcon />
            <span>{hotel !== undefined && hotel.address}</span>
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
            <h1 className="">{hotel !== undefined && hotel.description}</h1>

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
                    setArriveDay({ arrive })
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
          {listRoom === undefined || listRoom.length === 0 ? (
            <div>There is no rooms</div>
          ) : (
            listRoom.map((item, index) => {
              return (
                <div
                  className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2"
                  key={index}
                >
                  <img
                    src="https://cache.marriott.com/content/dam/marriott-renditions/TNASI/tnasi-guestroom-5428-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*"
                    className="w-full object-cover"
                  />
                  <h3 className="font-bold text-lg text-sky-600 mt-2">
                    {item.room_name}
                  </h3>

                  <div className="flex flex-col">
                    <span className="text-sm">{item.criteria}</span>
                    <span className="text-sm">
                      Number of beds: {item.number_of_bed}
                    </span>
                    <span className="text-sm">Capacity: {item.capacity}</span>
                    <span className="text-sm">{item.description}</span>
                  </div>

                  <span className="text-xs font-semibold text-white bg-green-600 p-1 rounded">
                    37% off
                  </span>

                  <div className="flex justify-between mt-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold">${item.price}</span>
                      <span className="text-sm text-gray-400">
                        ${item.price} total
                      </span>
                      <span className="text-sm text-gray-400">
                        includes taxes & fees
                      </span>
                    </div>

                    <div className="">
                      <button className="text-black bg-sky-300 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded" onClick={() => {
                        handleAddRoom()
                      }}>
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}

        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-sky-600 mb-6">Reviews</h1>
          {listComment === undefined ? (
            <div>There is no comments for this hotel.</div>
          ) : (
            <div className="flex">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-6xl font-bold mr-2">{hotel.rating.toFixed(1)}</span>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">Very Good</span>
                    <span className="text-sky-600">{listComment.length} reviews</span>
                  </div>
                </div>
              </div>

              <div className="flex3">
                {listComment.map((item, index) => {
                  return (
                    <div className="bg-sky-100 rounded-lg p-2 flex flex-col my-2" key={index}>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">{item.rating}/5 Good</span>
                          <span className="font-bold text-sky-600 text-xl">
                            {item.Reservation.User.firstName} {item.Reservation.User.lastName}
                          </span>
                        </div>
                        <span className="text-gray-400">
                          <AccessTimeOutlinedIcon /> {item.createdAt}
                        </span>
                      </div>

                      <span className="text-gray-500">
                        <TagFacesIcon /> Liked
                      </span>
                      <p className="ml-2">
                        {item.content}
                      </p>
                      <span className="text-gray-400 text-sm">
                        Stayed in {FormatDateToGBShort(item.Reservation.check_in)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
