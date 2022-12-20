import * as React from "react"
import { redirect, getLSItem } from "../../utils"
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import { toast } from "react-toastify"
import ToastMessage from "./ToastMessage"
import { removeHotelFavorite } from "../../apis/userApi"

const imgBase = "https://s7d1.scene7.com/is/image/marriotts7prod/si-ruhsi-tower-room-50062:Wide-Hor?wid=1336&fit=constrain"

export default function FavoriteItem({ hotel }) {

  const unlikeHotel = async () => {
    const data = { hotel_id: hotel.hotel_id }
    const response = await removeHotelFavorite(data, getLSItem("token"))
    console.log(response)
    if (typeof response === 'object') {
      toast.success("Success!")
      redirect(process.env.API_URL)
    } else {
      toast.error("Error! Please try again.")
    }
  }

  return (<div
    className="bg-primary rounded-lg flex justify-between mb-4 mx-24"
    key={hotel.hotel_id}
  >
    {/* siImg */}
    <ToastMessage />
    <div className="rounded-l-lg h-64 overflow-hidden w-72">
      <img
        src={hotel.Images.length != 0 ? hotel.Images[0].imgURL : "https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg"}
        alt=""
        className="object-cover w-96 h-96"
      />
    </div>


    {/* siDesc */}
    <div className="flex flex-col gap-1.5 flex2 p-2.5 pl-4 justify-center relative">
      <h1 className="text-2xl text-white font-bold">
        {hotel.name}
      </h1>

      <span className="text-sm text-green-400 p-1 rounded w-max underline">
        {hotel.fromCenter}m from center
      </span>

      <span className="mt-1 text-white text-sm">
        <span className="font-bold">Amenities: </span>
        {hotel.criteria}
      </span>

      <span className="font-bold text-green-400">
        Free cancellation
      </span>
      <div className="absolute mt-2 top-2 right-2 px-4 py-2 flex items-center justify-between border border-red-500 hover:bg-red-500 text-white rounded-md font-bold cursor-pointer"
        onClick={unlikeHotel}
      >
        <HeartBrokenIcon /> Unlike
      </div>

    </div>

    {/* siDetails */}
    <div className="flex flex-col flex-1 justify-center my-4 pl-2.5 pr-2.5 border-l-2">
      <div className="flex flex-col gap-1 justify-center">
        <div className="text-white text-2xl font-bold">{hotel.rating}/5</div>
        <div className="text-white font-bold">{hotel.classification} rated</div>
        <div className="border-b border-white"></div>
        <div className="text-white">From</div>
        <span className="text-xl font-semibold text-white">
          ${hotel.startPrice}
        </span>
        {/* siTaxOp */}
        <span className="text-sm text-gray-500">
          Includes taxes and fees
        </span>
        {/* siCheckButton */}
        <button
          className="bg-green-700 font-bold px-2 py-1 text-white rounded-sm hover:bg-sky-600 cursor-pointer"
          onClick={() => {
            redirect(`${process.env.API_URL}`)
          }}
        >
          See availability
        </button>
      </div>
    </div>
  </div>)
} 