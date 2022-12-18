import * as React from "react"
import Reason from "../../Layouts/user/Reason"
import NearbyHotel from "../../Screens/user/nearbyHotel/NearbyHotel"

export default function Stay() {
  return (
    <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
      <h1 className="font-bold text-2xl mb-3">
        this is the stay page
      </h1>

      <Reason />
      <NearbyHotel />

    </div>
  )
}
