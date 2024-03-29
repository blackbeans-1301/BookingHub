import React, { Fragment, useState, useEffect } from "react"
import Logo from "../../../assets/images/logo.png"
import textLogo from "../../../assets/images/text-logo.png"
import Login from "../../Items/Login"
import { getInformation } from "../../../apis/userApi"
import { toast } from "react-toastify"
import UserOption from "../../Items/UserOption"
import { getLSItem, redirect } from "../../../utils"

export default function UserHeader() {
  const [showModal, setShowModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

  const token = getLSItem("token")
  console.log("token", typeof token)
  let user

  async function getUser() {
    const get = await getInformation(getLSItem("token")).then(
      (fulfilledResult) => {
        console.log("success", fulfilledResult)
        user = fulfilledResult
        return fulfilledResult
      },
      (rejectedResult) => {
        console.log("fail", rejectedResult)
      }
    )
    return get
  }

  return (
    <Fragment>
      <div className="bg-white flex w-screen z-10 md:w-auto w-full drop-shadow-lg">
        <div className="flex justify-between items-center w-full h-full">
          <img className="md:cursor-pointer h-12" src={textLogo} alt="logo" onClick={() => { redirect(process.env.API_URL) }} />
          <div className="flex">
            <button
              className="font-semibold text-md border-green-400 py-1 px-4 m-2 hover:text-primary"
              onClick={() => {
                console.log(process.env.API_URL)
                redirect(`${process.env.API_URL}/owner/main`)
              }}
            >
              <span className="hidden lg:inline">Own a hotel?</span>
            </button>
            <button
              className="flex relative rounded-full font-bold text-lg border-green-400 border-2 py-1 px-4 m-2 hover:text-white hover:bg-green-400"
              onClick={() =>
                setShowUserModal(true)
              }
            >
              <img
                className="w-7 h-7 rounded-full mr-2"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU"
              />
              <span className="hidden lg:flex">Profile</span>
            </button>

            {/* <button
              className="rounded-full font-bold text-lg border-primary border-2 py-1 px-4 m-2 hover:text-white hover:bg-primary"
              onClick={() => {
                console.log("click on login");
                setShowModal(true);
              }}
            >
              <AccountCircleIcon /> 
              <span className="hidden lg:inline">Sign in</span>
              
            </button> */}
          </div>
        </div>
      </div>

      <Login isVisible={showModal} isClose={() => setShowModal(false)} />
      <UserOption isVisible={showUserModal} isClose={() => setShowUserModal(false)} />

    </Fragment>
  )
}

// bg-colorText border-b-2 border-black-100 text-black rounded-full md:cursor-pointer items-center
