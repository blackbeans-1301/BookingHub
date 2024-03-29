import React, { Fragment, useState } from "react"
import textLogo from "../../../assets/images/text-logo.png"
import Login from "../../Items/Login"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import UndoIcon from "@material-ui/icons/Undo"
import { redirect } from "../../../utils"

export default function OwnerHeader() {
  const [showModal, setShowModal] = useState(false)

  return (
    <Fragment>
      <div className="bg-white flex w-screen z-10 md:w-auto w-full drop-shadow-lg">
        <div className="flex justify-between items-center w-full h-full">
          <img className="md:cursor-pointer h-12" src={textLogo} alt="logo" onClick={() => redirect(`${process.env.API_URL}`)} />
          <div className="flex">
            <button
              className="flex rounded-full font-bold text-lg border-green-400 border-2 py-1 px-4 m-2 hover:text-white hover:bg-green-400"
              onClick={() => {
                redirect(`${process.env.API_URL}/owner/OwnerProfilePage`)
              }}
            >
              <img
                className="w-7 h-7 rounded-full mr-2"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU"
              />
              <span className="hidden lg:flex">Profile</span>
            </button>
          </div>
        </div>
      </div>

      <Login isVisible={showModal} isClose={() => setShowModal(false)} />
    </Fragment>
  )
}

// bg-colorText border-b-2 border-black-100 text-black rounded-full md:cursor-pointer items-center
