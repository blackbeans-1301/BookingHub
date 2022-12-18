import React from "react"
import OwnerHeader from "./OwnerHeader"
import PlacePageHeader from "./PlacePageHeader"
import { getLSItem } from "../../../utils"
import OwnerSidebar from "./OwnerSidebar"

export default function OwnerLayout({ children }) {
  const login = getLSItem("token")
  console.log("login", login)

  return (
    <div className="flex relative">
      <OwnerSidebar />
      <div className="flex-1 h-screen absolute right-0 owner-content">
        {login !== null ? <OwnerHeader /> : <PlacePageHeader />}
        {/* <OwnerHeader /> */}
        {children}
      </div>
    </div>
  )
}
