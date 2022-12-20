import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { toast } from "react-toastify";
import ToastMessage from "./ToastMessage";
import { redirect, getLSItem, setLSItem } from "../../utils";
import { FormatDateToGBShort } from "../Common/CommonFunc";
import CallIcon from "@material-ui/icons/Call";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { addFavoriteHotel, checkFavoriteHotel } from "../../apis/userApi";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import Rate from "./Rate";
import { createComment } from "../../apis/commentApi";

export default function UserReservationModal({
  isVisible,
  isClose,
  detail,
  type,
}) {
  const [favorite, setFavorite] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const token = getLSItem("token")
  const hotelID = detail && detail.Hotel.hotel_id

  useEffect(() => {
    checkFavoriteHotel(token, hotelID, setFavorite)
  }, [])

  const data = {
    hotel_id: hotelID,
  }

  console.log('detail', detail)

  const handleChangeReview = (event) => {
    setReview(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    console.log("rating", rating)
    console.log("review", review)
    let data = {
      reservation_id: detail.reservation_id,
      content: review,
      rating: rating.toString(),
    }
    const get = async () => {
      const response = await createComment(token, data)
      const type = typeof response

      if (type === "object") {
        toast.success("Give a review successfully")
      } else {
        toast.error("Something went wrong")
      }
      console.log("response", response)
      console.log("type", typeof response)
    }
    get()
  }

  if (!isVisible || !detail) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
      <div className="w-11/12 flex flex-col z-20 h-5/6 rounded-2xl">
        <div className="bg-white p-2 rounded flex flex-col m-2 overflow-y-scroll">
          <ToastMessage />

          <div className="flex justify-between ">
            <h2 className="font-bold text-2xl text-colorText ml-4 mt-2">
              Reservation Details
            </h2>

            <button
              className="text-light-close text-lg place-self-end hover:text-close-color"
              onClick={() => isClose()}
            >
              <CancelIcon />
            </button>
          </div>
          <ToastMessage />

          <div className="flex flex-col relative w-screen md:w-auto w-full break-all border-2 m-4">
            <div className="border-2 border-sky-300 flex flex-col">
              <div className="flex">
                <div className="flex-1 flex flex-col">
                  <div className="flex">
                    <div className="flex flex-col m-2 w-40">
                      <span className="text-sm">Check in: </span>
                      <span className="text-lg font-bold text-sky-600">
                        {detail.check_in != null
                          ? FormatDateToGBShort(detail.check_in)
                          : "___"}
                      </span>
                    </div>

                    <div className="flex flex-col m-2 w-40">
                      <span className="text-sm">Check out: </span>
                      <span className="text-lg font-bold text-sky-600">
                        {detail.check_out != null
                          ? FormatDateToGBShort(detail.check_out)
                          : "___"}
                      </span>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col m-2 w-40">
                      <span className="text-sm">Date in (expected): </span>
                      <span className="text-lg font-bold text-sky-600">
                        {FormatDateToGBShort(detail.date_in)}
                      </span>
                    </div>

                    <div className="flex flex-col m-2 w-40">
                      <span className="text-sm">Date out (expected): </span>
                      <span className="text-lg font-bold text-sky-600">
                        {FormatDateToGBShort(detail.date_out)}
                      </span>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col m-2 w-40">
                      <span className="text-sm">Total rooms: </span>
                      <span className="text-lg font-bold text-sky-600">
                        {detail.number_of_rooms}
                      </span>
                    </div>

                    <div className="flex flex-col m-2 w-40">
                      <span className="text-sm">Status: </span>
                      <span className="text-lg font-bold text-sky-600">
                        <span
                          className={
                            detail.status === "waiting"
                              ? "text-sky-600 font-bold"
                              : detail.status === "canceled"
                                ? "text-red-600 font-bold"
                                : detail.status === "completed"
                                  ? "text-green-600 font-bold"
                                  : "text-amber-600 font-bold"
                          }
                        >
                          {detail.status.toUpperCase()}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col m-2 justify-end">
                    <span className="text-lg font-semibold text-green-600">
                      Total price:{" "}
                    </span>
                    <span className="text-xl font-bold">{detail.Bill.total_price}$</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col m-2">
                    <span className="text-sm">Guest's name: </span>
                    <span className="text-lg font-bold text-sky-600">
                      {detail.name}
                    </span>
                  </div>
                  <div className="flex flex-col m-2">
                    <span className="text-sm">Guest's email: </span>
                    <span className="text-lg font-bold text-sky-600">
                      {detail.email}
                    </span>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col mr-8">
                      <div className="flex flex-col m-2">
                        <span className="text-sm">Booking number: </span>
                        <span className="text-lg font-bold text-sky-600">
                          {detail.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex2 bg-sky-200 rounded-3xl p-2 m-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col m-2">
                      <span className="text-sm text-gray-400">
                        <EditIcon />
                        <span className="text-black">Hotel's name: </span>
                      </span>

                      <span className="text-lg font-bold text-sky-600 ml-5">
                        {detail.Hotel.name}
                      </span>
                    </div>

                    <div className="flex flex-col bg-white h-max p-2 items-center rounded-xl">
                      <span className="text-sm">Add to favorites</span>
                      <button
                        className="text-red-400 cursor-pointer text-lg m-auto"
                        onClick={() => {
                          if (favorite === 0) {
                            setFavorite(1)
                            addFavoriteHotel(token, data)
                            toast.success(
                              "Add hotel to favorites successfully."
                            )
                          } else {
                            setFavorite(0)
                            toast.success(
                              "Remove hotel from favorites successfully."
                            )
                          }
                        }}
                      >
                        {favorite === 0 ? (
                          <FavoriteBorderIcon />
                        ) : (
                          <FavoriteIcon />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col m-2">
                    <span className="text-sm text-red-400">
                      <LocationOnIcon />
                      <span className="text-black">Hotel's address: </span>
                    </span>
                    <span className="text-lg font-bold text-sky-600 ml-5">
                      {detail.Hotel.address}
                    </span>
                  </div>

                  <div className="flex flex-col m-2">
                    <span className="text-sm">
                      <CallIcon />
                      <span className="text-black">Telephone: </span>
                    </span>

                    <span className="text-lg font-bold text-sky-600 ml-5">
                      {detail.Hotel.phone}
                    </span>
                  </div>

                  <div className="flex flex-col m-2">
                    <span className="text-sm text-amber-300">
                      <StarIcon />
                      <span className="text-black">Rating: </span>
                    </span>
                    <span className="text-lg font-bold text-sky-600 ml-5">
                      {detail.Hotel.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              <div className="">
                {type === "reservation" ? (
                  <div></div>
                ) : (
                  <div className="">
                    <h1 className="font-bold text-xl text-sky-600 ml-4">
                      Reviews
                    </h1>

                    {detail.Comment === null ? (
                      <div>
                        <h1 className="text-lg ml-4">
                          You haven't given any reviews for this hotel. Please
                          give a review.
                        </h1>

                        <div className="flex flex-col items-center justify-center">
                          <div className="flex flex-col">
                            <div className="flex justify-center items-center">
                              <div className="m-auto">
                                <h2 className="text-center m-auto">Rate me</h2>
                                <Rate
                                  rating={rating}
                                  onRating={(rate) => setRating(rate)}
                                />
                                <p className="text-center">Rating - {rating}</p>
                              </div>
                            </div>

                            <textarea
                              className="border-2 border-sky-200 ml-6 rounded focus:border-sky-400 p-2 m-auto"
                              rows="4"
                              cols="80"
                              placeholder="Write something here..."
                              name={review}
                              onChange={handleChangeReview}
                            ></textarea>

                            <button
                              type="submit"
                              className="flex flex-1 justify-center item-center text-center m-auto my-2 border-2 border-sky-500 bg-white hover:bg-sky-500 hover:text-white rounded-xl p-1 font-bold w-52"
                              onClick={handleSubmit}
                            >
                              Send review
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-sky-100 rounded-lg p-2 flex flex-col m-2">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-lg font-bold">
                              {detail.Comment.rating}/5 Good
                            </span>
                            <span className="font-bold text-sky-600 text-xl">
                              {detail.name}
                            </span>
                          </div>
                          <span className="text-gray-400">
                            <AccessTimeOutlinedIcon />{" "}
                            {detail.Comment.createdAt}
                          </span>
                        </div>

                        <span className="text-gray-500">
                          <TagFacesIcon /> Liked
                        </span>
                        <p className="ml-2">{detail.Comment.content}</p>
                        <span className="text-gray-400 text-sm">
                          Stayed in {FormatDateToGBShort(detail.check_in)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
