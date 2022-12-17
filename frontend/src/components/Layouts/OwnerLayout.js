import React from "react"
import Header from "./LayoutComponent/Header"
import UserHeader from "./LayoutComponent/UserHeader"
import Navigation from "./LayoutComponent/Navigation"
import Footer from "./LayoutComponent/Footer"
import OwnerHeader from "./LayoutComponent/OwnerHeader"
import PlacePageHeader from "./LayoutComponent/PlacePageHeader"
import { getLSItem, setLSItem } from "../../utils"

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
