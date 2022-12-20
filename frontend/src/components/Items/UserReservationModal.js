import * as React from "react";
import * as yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { getAllProvinces } from "../../apis/hotelApi";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { IMAGE_CLOUD_API } from "../../configs/api";
import ToastMessage from "./ToastMessage";
import { updateRoomInfor, updateHotelInfor } from "../../apis/roomApi";
import { redirect, getLSItem, setLSItem } from "../../utils";
import { ListItem } from "@material-ui/core";
import { FormatDateToGBShort } from "../Common/CommonFunc";
import CallIcon from "@material-ui/icons/Call";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { addFavoriteHotel, checkFavoriteHotel } from "../../apis/userApi";

export default function UserReservationModal({ isVisible, isClose, detail }) {
  const [favorite, setFavorite] = useState(0);

  const token = getLSItem("token");
  const hotelID = detail.Hotel.hotel_id;

  useEffect(() => {
    checkFavoriteHotel(token, hotelID, setFavorite);
  }, []);

  const data = {
    hotel_id: detail.Hotel.hotel_id,
  };

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
      <div className="w-11/12 flex flex-col z-20 h-5/6 rounded-2xl">
        <div className="bg-white p-2 rounded flex flex-col m-2 overflow-y-scroll">
          <ToastMessage />
          {/* <h1 className="font-bold text-2xl m-5">Update information for a hotel</h1> */}
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
            <div className="border-2 border-sky-300 flex">
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
                      {detail.status}
                    </span>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col m-2 w-40">
                    <span className="text-sm">Price: </span>
                    <span className="text-lg font-bold text-sky-600">100$</span>
                  </div>

                  <div className="flex flex-col m-2 w-40">
                    <span className="text-sm">Discount: </span>
                    <span className="text-lg font-bold text-green-600">
                      20%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col m-2 justify-end">
                  <span className="text-lg font-semibold text-green-600">
                    Total price:{" "}
                  </span>
                  <span className="text-xl font-bold">80$</span>
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
                          setFavorite(1);
                          addFavoriteHotel(token, data);
                          toast.success("Add hotel to favorites successfully.");
                        } else {
                          setFavorite(0);
                          toast.success(
                            "Remove hotel from favorites successfully."
                          );
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
          </div>
        </div>
      </div>
    </div>
  );
}
