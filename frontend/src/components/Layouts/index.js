import React from "react"
import Header from "./user/Header"
import UserHeader from "./user/UserHeader"
import Navigation from "./user/Navigation"
import Footer from "./user/Footer"
import { getLSItem } from "../../utils"

export default function Layout({ children }) {
  const login = getLSItem("token")

  console.log('login', login)

  return (
    <div className="flex relative">
      {/* <div className="fixed h-screen w-1/12 nav"> */}
      <Navigation />
      {/* </div> */}
      <div className="flex-1 h-screen absolute right-0 content">
        {login !== null ? <UserHeader /> : <Header />}
        {/* <Header /> */}
        {children}
        <Footer />
      </div>
    </div>
  )
}
