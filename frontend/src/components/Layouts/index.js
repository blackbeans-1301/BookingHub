import React from "react"
import Header from "./LayoutComponent/Header"
import UserHeader from "./LayoutComponent/UserHeader"
import Navigation from "./LayoutComponent/Navigation"
import Footer from "./LayoutComponent/Footer"

export default function Layout({ children }) {
  let login
  // const isBrowser = typeof window !== "undefined" && window
  // if (isBrowser)
  //   login = localStorage.getItem("token")

  return (
    <div className="flex relative">
      {/* <div className="fixed h-screen w-1/12 nav"> */}
      <Navigation />
      {/* </div> */}
      <div className="flex-1 h-screen absolute right-0 content">
        {login != null ? <UserHeader /> : <Header />}
        {/* <Header /> */}
        {children}
        <Footer />
      </div>
    </div>
  )
}
