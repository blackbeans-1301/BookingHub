import * as React from "react"
import { useState } from "react"
import EditIcon from "@material-ui/icons/Edit"
import SearchIcon from "@material-ui/icons/Search"
import DeleteIcon from "@material-ui/icons/Delete"
import InfoIcon from "@material-ui/icons/Info"
import MoreVertSharpIcon from "@material-ui/icons/MoreVertSharp"
import { getAllHotels } from "../../../apis/hotelApi"
import { useEffect } from "react"
import InfoHotelModal from "../../Items/InfoHotelModal"
import { getLSItem, redirect, setLSItem } from "../../../utils"
import { FormatDateToGB } from "../../Common/CommonFunc"
// test
export default function ListHotel() {
  const [allHotels, setAllHotels] = useState()
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [hotelDetail, setHotelDetail] = useState({
    name: "",
    address: "",
    criteria: "",
    Images: "",
    description: "",
    province: "",
  })
  // huydang to do
  const token = getLSItem("token")
  useEffect(() => {
    getAllHotels(setAllHotels, token)
  }, [])
  console.log("all hotels", allHotels)

  function directToUpdatePage(id) {
    setLSItem("hotelID", id)
    redirect(`${process.env.API_URL}/owner/UpdateHotelPage`)
  }

  return (
    <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
      <div className="flex mt-3">
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 w-5/6">
          <SearchIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
          <input
            className="md:w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="w-1/6">
          <button className="w-3/4 h-full px-2 rounded-full bg-white text-colorText flex items-center justify-center ml-2 border-2 border-light-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-gray-200">
            <SearchIcon />
            <span>Search</span>
          </button>
        </div>
      </div>

      <h1 className="font-bold text-2xl mb-3 text-colorText mt-3">
        List of hotels
      </h1>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            {allHotels === undefined ? <div>There's no hotels</div> : <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hotel name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Created date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Updated date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>

              <tbody>
                {allHotels.map((hotel, index) => {
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
                            {hotel.name}
                          </p>
                        </td>

                        {/* column 5: address */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hotel.address}
                          </p>
                        </td>

                        {/* column 7: created date */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {FormatDateToGB(hotel.createdAt)}
                          </p>
                        </td>

                        {/* column 8: updated date */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {FormatDateToGB(hotel.updatedAt)}
                          </p>
                        </td>

                        {/* column 9: actions */}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                          <div className="flex">
                            <button
                              type="button"
                              className="inline-block mx-px text-green-300 hover:text-green-500 mr-2"
                              onClick={() => {
                                setHotelDetail(hotel)
                                setTimeout(setShowInfoModal(true), 2000)
                              }}
                            >
                              <InfoIcon />
                            </button>

                            <button
                              type="button"
                              className="inline-block mx-px text-rose-300 hover:text-rose-500"
                            >
                              <DeleteIcon />
                            </button>

                            {/* <button
                              type="button"
                              className="inline-block mx-px text-gray-400 hover:text-gray-600"
                            >
                              <MoreVertSharpIcon />
                            </button> */}
                          </div>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            <button
                              className="px-3 py-1 text-colorText rounded-full border-2 border-primary my-4 hover:bg-primary hover:text-white"
                              onClick={() => {
                                setLSItem("hotelID", hotel.hotel_id)
                                redirect(`${process.env.API_URL}/owner/ListRoomPage`)
                              }}
                            >
                              List rooms
                            </button>

                            <button
                              className="px-3 py-1 text-colorText rounded-full border-2 border-primary my-4 hover:bg-primary hover:text-white"
                              onClick={() => {
                                setLSItem("hotelID", hotel.hotel_id)
                                redirect(`${process.env.API_URL}/owner/ListReservationPage`)
                              }}
                            >
                              List reservations
                            </button>
                          </p>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>}
            
          </div>
        </div>
      </div>
      {showInfoModal && (
        <InfoHotelModal
          isVisible={showInfoModal}
          isClose={() => setShowInfoModal(false)}
          detail={hotelDetail}
        />
      )}
    </div>
  )
}
