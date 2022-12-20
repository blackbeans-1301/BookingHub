import * as React from "react";
import * as yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import RoomServiceIcon from "@material-ui/icons/RoomService";
import WifiIcon from "@material-ui/icons/Wifi";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import CancelIcon from "@material-ui/icons/Cancel";

import _ from "lodash";
import { getAllProvinces } from "../../apis/hotelApi";
import { useFormik } from "formik";

import { toast } from "react-toastify";

import { IMAGE_CLOUD_API } from "../../configs/api";
import ToastMessage from "./ToastMessage";

import { updateRoomInfor, updateHotelInfor } from "../../apis/roomApi";
import { redirect, getLSItem, setLSItem } from "../../utils";

const validationSchema = yup.object({
  room_name: yup.string().required("Enter your room's name"),
  // address: yup.string().required("Enter your hotel's address"),
  description: yup.string().required("Enter the hotel's description"),
  // province: yup.string().required("Province is required"),
  criteria: yup.string(),
  imgURL: yup.array(),
  // type_of_room: yup.string().required("This field is required"),
  price: yup.string().required("Price is required"),
  number_of_bed: yup.string().required("Number of bed is required"),
});

export default function ReservationInforModal({ isVisible, isClose, detail }) {
  const [isLoading, setIsLoading] = useState(false);
  const [criterias, setCriterias] = useState([]);
  const [all, setAll] = useState();

  useEffect(() => {
    getAllProvinces(setAll);
  }, []);

  const redirectFunc = () => {
    redirect(`${process.env.API_URL}/owner/ListHotelPage`);
  };

  const handleGetHotelInfor = (values) => {
    const token = getLSItem("ownerToken");
    console.log("token", token);
    const signUp = async (postData) => {
      const response = await updateHotelInfor(postData, token);
      console.log("response", response);
      console.log("type", typeof response);
      const type = typeof response;
      if (type === "object") {
        toast.success("Update room details successfully");
        setTimeout(redirectFunc, 1000);
      } else {
        console.log("Update room details failed");
        toast.error(response);
      }
      setIsLoading(false);
    };
    formik.values.criteria = criterias.toString();
    const data = {
      hotel: {
        // hotel_id: detail.Hotel.hotel_id,
      },
      room_name: values.room_name,
      criteria: values.criteria,
      price: values.price,
      number_of_bed: values.number_of_bed,
      description: values.description,

      imgURL: values.imgURL,
    };
    setIsLoading(true);
    signUp(data);
  };

  const formik = useFormik({
    initialValues: {
      criteria: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("value", values);
      handleGetHotelInfor(values);
    },
  });

  console.log("detail", detail);

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
      <div className="w-11/12 flex flex-col z-20 h-5/6 rounded-2xl">
        <div className="bg-white p-2 rounded flex flex-col m-2 overflow-y-scroll">
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
                <div className="flex flex-col m-2">
                  <span className="text-sm">Check in: </span>
                  <span className="text-lg font-bold text-sky-600">
                    {detail.check_in != null ? detail.check_in : "___"}
                  </span>
                </div>

                <div className="flex flex-col m-2">
                  <span className="text-sm">Check out: </span>
                  <span className="text-lg font-bold text-sky-600">
                    {detail.check_out != null ? detail.check_out : "___"}
                  </span>
                </div>

                <div className="flex flex-col m-2">
                  <span className="text-sm">Date in (expected): </span>
                  <span className="text-lg font-bold text-sky-600">
                    {detail.date_in}
                  </span>
                </div>

                <div className="flex flex-col m-2">
                  <span className="text-sm">Date out (expected): </span>
                  <span className="text-lg font-bold text-sky-600">
                    {detail.date_out}
                  </span>
                </div>

                <div className="flex flex-col m-2">
                  <span className="text-sm">Total rooms: </span>
                  <span className="text-lg font-bold text-sky-600">
                    {detail.number_of_rooms}
                  </span>
                </div>
              </div>
              <div className="flex3">
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

                    <div className="flex flex-col m-2">
                      <span className="text-sm">Status: </span>
                      <span className="text-lg font-bold text-sky-600">
                        <span
                          className={
                            detail.status === "waiting"
                              ? "text-sky-400 "
                              : detail.status === "canceled"
                              ? "text-red-400"
                              : detail.status === "completed"
                              ? "text-green-400"
                              : "text-amber-400"
                          }
                        >
                          {detail.status.toUpperCase()}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col ml-8">
                    <div className="flex flex-col m-2">
                      <span className="text-sm">Reservation id: </span>
                      <span className="text-lg font-bold text-sky-600">
                        {detail.reservation_id}
                      </span>
                    </div>

                    <div className="flex flex-col m-2 justify-end">
                      <span className="text-lg font-semibold text-green-600">
                        Total price:{" "}
                      </span>
                      <span className="text-xl font-bold">
                        {detail.Bill.total_price}$
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
