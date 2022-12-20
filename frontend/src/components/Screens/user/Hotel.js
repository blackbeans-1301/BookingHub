import * as React from "react"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import NearbyHotel from "./nearbyHotel/NearbyHotel"
import HotelImg from "../../Items/HotelImg"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import { useState, useEffect } from "react"
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined"
import StarIcon from '@mui/icons-material/Star'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
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
import { checkUserLikedHotel, addFavoriteHotel, removeHotelFavorite } from "../../../apis/userApi"


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
  const [hotel, setHotel] = useState()
  const [listRoom, setListRoom] = useState()
  const [listRoomId, setListRoomId] = useState()
  const [listComment, setListComment] = useState()
  const [listRoomToReserve, setListRoomToReserve] = useState([])
  const [roomStatus, setRoomStatus] = useState([])
  const [error, setError] = useState("")
  const [liked, setLiked] = useState(false)
  let starArray = []

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
    const checkUserLikeHotel = async () => {
      const response = await checkUserLikedHotel(getLSItem("token"), id)
      console.log("response", response)
      setLiked(response.code != 0)
    }

    checkUserLikeHotel()
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

      setRoomStatus(['reserve', 'reserve', 'reserve', 'reserve', 'reserve', 'reserve', 'reserve'])
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

  for (var i = 0; i < hotel.rating; i++) {
    starArray.push(0)
  }
  console.log(hotel)

  const checkAvailable = async () => {
    const data = {
      hotel_id: hotel.hotel_id,
      date_in: FormatDate(arrive),
      date_out: FormatDate(leave)
    }

    const response = await getAllRoomsByCriteria(data, setListRoom)

    console.log(response)
  }

  const heartClicked = async (type) => {
    if (type === "like") {
      const response = await addFavoriteHotel(getLSItem("token"), { hotel_id: id })
      if (response) {
        toast.success("Success")
        setLiked(true)
      }

      else
        toast.error("Error")
    } else {
      const response = await removeHotelFavorite(getLSItem("token"), { hotel_id: id })
      if (response) {
        toast.success("Success")
        setLiked(false)
      }
      else
        toast.error("Error")
    }
  }

  console.log(listRoom)

  return (
    // hotel Container
    <div className="flex justify-center mt-4">
      <ToastMessage />
      {/* hotelWrapper */}

      <div className="w-full max-w-5xl flex flex-col gap-2.5 mx-4 mt-8">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center">
              <div className="px-2 py-1 text-sm bg-gray-400 rounded-md">Hotel</div>
              {starArray.map(item => {
                return <StarIcon className="text-yellow-500" />
              })}
            </div>
            <div className="text-2xl text-primary font-bold">{hotel.name}</div>
            <div>
              <LocationOnIcon className="text-primary text-xl" />
              <span>{hotel.address}</span>
            </div>
          </div>
          <div className="">
            <div className="flex justify-end">
              {liked ? <FavoriteIcon className="cursor-pointer" onClick={() => {
                heartClicked("dislike")
              }} /> : <FavoriteBorderIcon className="cursor-pointer" onClick={() => {
                heartClicked("like")
              }} />}
            </div>
            <div className="mt-2 px-4 py-2 rounded-md border border-primary hover:bg-primary hover:text-white cursor-pointer"
              onClick={() => {
                const isBrowser = typeof window !== "undefined"
                if (isBrowser)
                  window.scrollBy(0, 1300)
              }}
            >
              <div>Reserve</div>
            </div>
          </div>
        </div>
        <div className="text-sky-700">
          Excellent location - {hotel.fromCenter}m from center
        </div>

        <HotelImg images={hotel.Images.length != 0 ? hotel.Images : [
          { imgURL: "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg" },
          { imgURL: "https://media-cdn.tripadvisor.com/media/photo-s/25/04/93/1e/blossom-hotel-houston.jpg" }
        ]} />

        <div className="w-full">
          <div className="">
            <h1 className="">{hotel.description}</h1>
          </div>
        </div>

        <div className="">
          <h2 className="font-bold text-lg text-primary">Most popular facilities</h2>
          <div className="mt-2">
            <div>{hotel.criteria}</div>
          </div>
        </div>
        <div className="border-b my-2"></div>
        <div className="text-2xl font-bold text-primary">Availability</div>

        <div className="bg-sky-100 p-4">
          <div className="mb-1">
            When would you like to stay at {hotel.name}?
          </div>
          <div className="mb-4 text-sm">
            There may be Genius rates available. See them by entering your dates.
          </div>

          <div className="flex">
            <div className="mr-8">
              <div className="text-md font-bold text-primary mb-2">Date in</div>
              <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-2 mt-2 pointer-events-none" />
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
            <div className="mr-12">
              <div className="text-md font-bold text-primary mb-2">Date out</div>
              <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-2 mt-2 pointer-events-none" />
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

            <div className="flex items-end">
              <div className="px-4 py-2 border border-primary hover:bg-primary rounded-md hover:text-white cursor-pointer"
                onClick={checkAvailable}
              >Check availability</div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap justify-center">
          {listRoom === undefined || listRoom.length === 0 ? (
            <div>There is no rooms</div>
          ) : (<div className="flex flex-wrap ml-12">
            {listRoom.map((item, index) => {
              var status = roomStatus[index]
              return (
                <div
                  className="w-72 bg-primary rounded-md p-2 m-2 relative"
                  key={index}
                >
                  <div style={{ width: "100%", height: "180px", overflow: "hidden", borderRadius: "10px" }}>
                    <img
                      src={item.Images.length != 0 ? item.Images[0].imgURL : "https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg"}
                      className="w-full object-cover rounded-md"
                    />
                  </div>

                  <h3 className="font-bold text-lg text-white mt-2 ">
                    {item.room_name}
                  </h3>

                  <div className="flex flex-col text-gray-200">
                    <span className="text-sm">{item.criteria}</span>
                    <span className="text-sm">
                      Number of beds: {item.number_of_bed}
                    </span>
                    <span className="text-sm">Capacity: {item.capacity}</span>
                    <span className="text-sm">{item.description}</span>
                  </div>


                  <div className="flex justify-between mt-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-white hover:text-yellow-400">${item.price}</span>
                      <span className="text-sm text-gray-400">
                        ${item.price} total
                      </span>
                      <span className="text-sm text-gray-400">
                        includes taxes & fees
                      </span>
                    </div>


                    <div className="absolute bottom-4 right-3">
                      <button className={"text-black bg-sky-200 hover:text-white hover:bg-sky-600 font-bold px-2 py-1 rounded"} onClick={
                        () => handleButtonReserveClicked(item.room_id)
                      }>
                        {status}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>)}
        </div>
        <div className="ml-4 mb-12 mt-4">
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
