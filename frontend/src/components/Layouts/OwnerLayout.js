import React from "react"
import Header from "./LayoutComponent/Header"
import UserHeader from "./LayoutComponent/UserHeader"
import Navigation from "./LayoutComponent/Navigation"
import Footer from "./LayoutComponent/Footer"
import OwnerHeader from "./LayoutComponent/OwnerHeader"
import PlacePageHeader from "./LayoutComponent/PlacePageHeader"

export default function OwnerLayout({ children }) {
  const login = localStorage.getItem("token")

  return (
    <div className="flex">
      <div className="flex-1 h-screen">
        {login != null ? <OwnerHeader /> : <PlacePageHeader />}
        {/* <OwnerHeader /> */}
        {children}
      </div>
    </div>
  )
}
