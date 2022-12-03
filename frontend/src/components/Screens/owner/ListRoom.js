import * as React from "react";
import { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveCircleOutlineSharpIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import MoreVertSharpIcon from "@material-ui/icons/MoreVertSharp";
import InfoRoomModal from "../../Items/InfoRoomModal";
import { getAllRoomsApi } from "../../../apis/roomApi";

export default function ListRoom() {
  const [allRooms, setAllRooms] = useState();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [hotel, setHotel] = useState();
  const [roomDetail, setRoomDetail] = useState({
    name: "",
    address: "",
    criteria: "",
    Images: "",
    description: "",
    province: "",
  });

  const token = localStorage.getItem("token");
  const hotelID = localStorage.getItem("hotelID");

  const data = {
    hotel: {
      hotel_id: hotelID,
    },
  };

  useEffect(() => {
    console.log("in use effects");
    getAllRoomsApi(setAllRooms, data, token);
  }, []);

  console.log("all rooms", allRooms);

  function directToUpdatePage(id) {
    localStorage.setItem("hotelID", id);
    window.location = "http://localhost:8000/owner/UpdateHotelPage";
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
        List of stays
      </h1>

      <div class="container mx-auto px-4 sm:px-8">
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    No
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Room
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hotel name
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Address
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Room type
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Created date
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Updated date
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>

              <tbody>
                {/* Images
: 
(2) [{…}, {…}]
criteria
: 
"Wifi, view dep"
description
: 
"heheheheheheheh"
hotel_id
: 
"b28cda9e-5686-44d9-939f-cd0665660b21"
number_of_bed
: 
"2"
price
: 
10
room_id
: 
"1b1f5b43-de0e-45e7-91b3-e581799a1c18"
room_name
: 
"101"
status
: 
false
type_of_room
: 
"111" */}

                {allRooms != undefined &&
                  allRooms.map((room, index) => {
                    return (
                      <tr>
                        {/* column 1: id */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {index + 1}
                          </p>
                        </td>

                        {/* column 2: room */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {room.room_name}
                          </p>
                        </td>

                        {/* column 3: hotel's name */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Peridot Grand Luxury Boutique Hotel
                          </p>
                        </td>

                        {/* column 5: address */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            Hoan Kiem, Hanoi, Vietnam
                          </p>
                        </td>

                        {/* column 6: room type */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {room.type_of_room}
                          </p>
                        </td>

                        {/* column 7: price */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {room.price}
                          </p>
                          <p class="text-gray-600 whitespace-no-wrap">USD</p>
                        </td>

                        {/* column 8: posted date */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {room.createdAt}
                          </p>
                        </td>

                        {/* column 8: posted date */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {room.updatedAt}
                          </p>
                        </td>

                        {/* column 9: actions */}
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                          <div className="flex">
                            <button
                              type="button"
                              class="inline-block mx-px text-green-300 hover:text-green-500"
                              onClick={() => {
                                setRoomDetail(room);
                                setTimeout(setShowInfoModal(true), 2000);
                              }}
                            >
                              <EditIcon />
                            </button>

                            <button
                              type="button"
                              class="inline-block mx-px text-rose-300 hover:text-rose-500"
                            >
                              <DeleteIcon />
                            </button>

                            <button
                              type="button"
                              class="inline-block mx-px text-gray-400 hover:text-gray-600"
                            >
                              <MoreVertSharpIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {showInfoModal && (
        <InfoRoomModal
          isVisible={showInfoModal}
          isClose={() => setShowInfoModal(false)}
          detail={roomDetail}
        />
      )}
    </div>
  );
}
