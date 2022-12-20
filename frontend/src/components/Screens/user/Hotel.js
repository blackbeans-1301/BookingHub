import * as React from "react"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import NearbyHotel from "./nearbyHotel/NearbyHotel"
import HotelImg from "../../Items/HotelImg"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import { useState, useEffect } from "react"
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined"
import PersonOutlineIcon from "@material-ui/icons/PersonOutline"
import { date } from "yup"
import CancelIcon from "@material-ui/icons/Cancel"
import TagFacesIcon from "@material-ui/icons/TagFaces"
import { parse, isDate } from "date-fns"
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined"
import { getHotelById } from "../../../apis/hotelApi"
import { getAllRoomsByCriteria } from "../../../apis/roomApi"
import { FormatDate, FormatDateToGBShort } from "../../Common/CommonFunc"
import * as yup from "yup"
import { getCommentsOfHotel } from "../../../apis/commentApi"
import * as _ from "lodash"
import FormControl from "@material-ui/core/FormControl"
import { useFormik } from "formik"
import { setLSItem, getLSItem } from "../../../utils"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { toSafeInteger } from "lodash"
import { toast } from "react-toastify"
import ToastMessage from "../../Items/ToastMessage"
import BookingModal from "../../Items/BookingModal"


function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date())

  return parsedDate
}

const today = new Date()

const reservationInfoValidationSchema = yup.object({
  date_in: yup
    .date().transform(parseDateString).max(today).required("Enter  date of birth. Please enter a valid date."),
  date_out: yup
    .date().transform(parseDateString).max(today).required("Enter  date of birth. Please enter a valid date."),
  name: yup
    .string()
    .required("Enter  email"),
  email: yup
    .string()
    .email("Let enter a valid email")
    .required("Enter  email"),
  phone: yup
    .string()
    .required("Enter  email"),
  description: yup
    .string()
    .required("Enter  email"),
  room_id: yup
    .array()
})

export default function Hotel({ id, dateIn, dateOut }) {
  const [arriveDay, setArriveDay] = useState(new Date())
  const [leaveDay, setLeaveDay] = useState(new Date())
  const [room, setRoom] = useState(1)
  const [active, setActive] = useState("")
  const [adult, setAdult] = useState(1)
  const [child, setChild] = useState(0)
  const [open, setOpen] = useState(false)
  const [hotel, setHotel] = useState()
  const [listRoom, setListRoom] = useState()
  const [listRoomId, setListRoomId] = useState()
  const [listComment, setListComment] = useState()
  const [listRoomToReserve, setListRoomToReserve] = useState([])
  const [roomStatus, setRoomStatus] = useState([])
  const [error, setError] = useState("")

  const { arrive } = arriveDay
  const { leave } = leaveDay

  const reservationInfoFormik = useFormik({
    initialValues: {
      date_in: "",
      date_out: "",
      name: "",
      email: "",
      phone: "",
      description: "",
      room_id: listRoomToReserve,
    },
    validationSchema: reservationInfoValidationSchema,
    onSubmit: (values) => {
      requestCreateReservation(values)
    },
    enableReinitialze: true,
  })

  const requestCreateReservation = async (values) => {

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

  useEffect(() => {
    getHotelById(id, setHotel)
  }, [])

  const token = getLSItem("token")

  const data = {
    hotel_id: id,
    date_in: FormatDate(dateIn),
    date_out: FormatDate(dateOut),
  }

  useEffect(() => {
    getAllRoomsByCriteria(data, setListRoom)
  }, [])
  useEffect(() => {
    getCommentsOfHotel(id, setListComment)
  }, [])

  useEffect(() => {
    let roomStatusTemp = []
    let roomIdTemp = []

    for (var room in listRoom) {
      roomStatusTemp.push("reserve")
      roomIdTemp.push(listRoom[room].room_id)
    }

    setListRoomId(roomIdTemp)
    setRoomStatus(roomStatusTemp)
  }, [listRoom])

  const handleButtonReserveClicked = (roomId) => {
    if (listRoomToReserve.includes(roomId)) {
      let listRoomTemp = listRoomToReserve
      listRoomTemp.splice(listRoomTemp.indexOf(roomId))

      let roomStatusTemp = roomStatus
      roomStatusTemp[listRoomId.indexOf(roomId)] = "reserve"

      setRoomStatus(['reserve', 'reserve', 'reserve'])
      setListRoomToReserve(listRoomTemp)
      setLSItem("roomsToReserve", listRoomTemp)
    } else {
      let listRoomTemp = listRoomToReserve
      listRoomTemp.push(roomId)
      listRoomTemp = _.uniq(listRoomTemp)

      let roomStatusTemp = roomStatus
      roomStatusTemp[listRoomId.indexOf(roomId)] = "unreserved"

      setRoomStatus(roomStatusTemp)
      setListRoomToReserve(listRoomTemp)
      setLSItem("roomsToReserve", listRoomTemp)
    }
  }

  if (!hotel) {
    return null
  }

  console.log(listRoom)

  return (
    // hotelContainer
    <div className="flex justify-center mt-4">
      <ToastMessage />
      {/* hotelWrapper */}
      <div className="w-full max-w-5xl flex flex-col gap-2.5 mx-4">
        <HotelImg images={hotel.Images} />

        <div className="w-full">
          {/* hotelTitle */}

          <div className="flex justify-between mt-8">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-primary">
                {hotel.name}
              </h1>

              <span className="">
                {hotel.rating}/5  {hotel.classification} rated
              </span>
            </div>

            <div className="text-red-500 mr-10">
              {/* {isFavorite === false ? (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setIsFavorite(true);
                  }}
                >
                  <FavoriteBorderIcon />
                </span>
              ) : (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setIsFavorite(false);
                  }}
                >
                  <FavoriteIcon />
                </span>
              )} */}
            </div>
          </div>

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

        <div className="mt-6 flex flex-wrap">
          {listRoom === undefined || listRoom.length === 0 ? (
            <div>There is no rooms</div>
          ) : (
            listRoom.map((item, index) => {
              var status = roomStatus[index]
              return (
                <div
                  className="w-1/4 border-2 border-sky-300 rounded-lg p-2 m-2"
                  key={index}
                >
                  <img
                    src={item.Images[0].imgURL}
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
                      <button className={"text-black bg-sky-500 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded"} onClick={
                        () => handleButtonReserveClicked(item.room_id)
                      }>
                        {status}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
        <div className="ml-4 mb-12">
          <h1 className="px-4 w-44 py-2 bg-primary text-white font-bold text-md rounded-md cursor-pointer" onClick={() => {
            if (!getLSItem("token")) {
              toast.error("You must login first!")
              return
            }

            if (listRoomToReserve.length === 0) {
              toast.error("Pick a room first")
            } else {
              setActive("confirm")
            }
          }}>Create Reservation</h1>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-sky-600 mb-6">Reviews</h1>
          {listComment === undefined ? (
            <div>There is no comments for this hotel.</div>
          ) : (
            <div className="flex">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-6xl font-bold mr-2">
                    {hotel.rating.toFixed(1)}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{hotel.classification} rated</span>
                    <span className="text-sky-600">
                      {listComment.length} reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex3">
                {listComment.map((item, index) => {
                  return (
                    <div
                      className="bg-sky-100 rounded-lg p-2 flex flex-col my-2"
                      key={index}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold">
                            {item.rating}/5 Good
                          </span>
                          <span className="font-bold text-sky-600 text-xl">
                            {item.Reservation.User.firstName}{" "}
                            {item.Reservation.User.lastName}
                          </span>
                        </div>
                        <span className="text-gray-400">
                          <AccessTimeOutlinedIcon /> {item.createdAt}
                        </span>
                      </div>

                      <span className="text-gray-500">
                        <TagFacesIcon /> Liked
                      </span>
                      <p className="ml-2">{item.content}</p>
                      <span className="text-gray-400 text-sm">
                        Stayed in{" "}
                        {FormatDateToGBShort(item.Reservation.check_in)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {active == "confirm" && (
        <BookingModal isVisible={active == "confirm"} isClose={() => {
          setActive("")
        }} roomList={listRoomToReserve} availableRooms={listRoom} hotel={hotel} />
      )}
    </div>
  )
}
