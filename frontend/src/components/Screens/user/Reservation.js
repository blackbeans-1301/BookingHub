import * as React from "react";
import { Fragment } from "react";
import { useState } from "react";
import BookingModal from "../../Items/BookingModal";
// import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import MoreVertSharpIcon from "@material-ui/icons/MoreVertSharp";
import { getAllHotels } from "../../../apis/hotelApi";
import { useEffect } from "react";
import InfoHotelModal from "../../Items/InfoHotelModal";
import { getLSItem, redirect, setLSItem } from "../../../utils";
import { FormatDateToGB } from "../../Common/CommonFunc";
import { getHistory, getReservations } from "../../../apis/userApi";
import { toast } from "react-toastify";
import { GET_USER_INFOR_URL } from "../../../configs/api";
import UserReservationModal from "../../Items/UserReservationModal";
import { set } from "lodash";
import { SetColorForString } from "../../Common/CommonFunc";

export default function Reservation() {
  const [showModal, setShowModal] = useState(false);
  const [allHotels, setAllHotels] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [listReservation, setListReservation] = useState();
  const [hotelDetail, setHotelDetail] = useState({
    name: "",
    address: "",
    criteria: "",
    Images: "",
    description: "",
    province: "",
  });

  function directToUpdatePage(id) {
    setLSItem("hotelID", id);
    redirect(`${process.env.API_URL}/owner/UpdateHotelPage`);
  }

  const token = getLSItem("token");

  useEffect(() => {
    getReservations(token, setListReservation);
  }, []);

  console.log("reservations", listReservation);

//   function setColor(str) {
//     let res;
//     if (str.toUpperCase() === "CANCELED") {
//         res = `<span className="text-red-400">CANCELED</span>`;
//     }
//     return res;
//   }

  return (
    <Fragment>
      <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
        <h1 className="font-bold text-2xl mb-3">Reservations</h1>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              {listReservation === undefined ? (
                <div>You haven't book any reservations yet.</div>
              ) : (
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Reservation id
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Hotel name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Guest name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Telephone
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Number of rooms
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Check in date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Check out date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Created at
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {listReservation.map((item, index) => {
                      return (
                        <tr key={index}>
                          {/* column 1: id */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {index + 1}
                            </p>
                          </td>

                          {/* column 3: hotel's name */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.reservation_id}
                            </p>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {/* {item.Hotel.name} */}
                            </p>
                          </td>

                          {/* column 5: address */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.name}
                            </p>
                          </td>

                          {/* column 7: created date */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.phone}
                            </p>
                          </td>

                          {/* column 8: updated date */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.number_of_rooms}
                            </p>
                          </td>

                          {/* column 9: actions */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                            {item.check_in === null
                              ? "____"
                              : FormatDateToGB(item.check_in)}
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                            {item.check_out === null
                              ? "____"
                              : FormatDateToGB(item.check_out)}
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {FormatDateToGB(item.createdAt)}
                            </p>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {/* {SetColorForString(item.status)} */}
                            </p>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <button
                              type="button"
                              className="inline-block mx-px text-green-300 hover:text-green-500"
                              onClick={() => {
                                setShowInfoModal(true);
                              }}
                            >
                              <InfoIcon />
                            </button>
                          </td>

                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"></td>
                          {showInfoModal && (
                            <UserReservationModal
                              isVisible={showInfoModal}
                              isClose={() => setShowInfoModal(false)}
                              detail={item}
                            />
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}