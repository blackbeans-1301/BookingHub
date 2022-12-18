import React from "react"
import OwnerHeader from "./OwnerHeader"
import PlacePageHeader from "./PlacePageHeader"
import { getLSItem } from "../../../utils"

export default function OwnerLayout({ children }) {
  const login = getLSItem("token")
  console.log("login", login)

  return (
    <div className="flex">
      <div className="flex-1 h-screen">
        {login !== null ? <OwnerHeader /> : <PlacePageHeader />}
        {/* <OwnerHeader /> */}
        {children}
      </div>
    </div>
  )
}
