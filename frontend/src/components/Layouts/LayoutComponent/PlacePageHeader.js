import React, { Fragment, useState } from "react"
import textLogo from "../../../assets/images/text-logo.png"
import Login from "../../Items/Login"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import UndoIcon from "@material-ui/icons/Undo"
<<<<<<< HEAD
import { redirect } from "../../../utils"
=======
>>>>>>> master

export default function PlacePageHeader() {
  const [showModal, setShowModal] = useState(false)

  return (
    <Fragment>
      <div className="bg-white flex w-screen z-10 md:w-auto w-full drop-shadow-lg">
        <div className="flex justify-between items-center w-full h-full">
          <img className="md:cursor-pointer h-12" src={textLogo} alt="logo" />
          <div className="">
            <button
              className="rounded-full font-bold text-lg border-red-400 border-2 py-1 px-4 m-2 hover:text-white hover:bg-red-400"
<<<<<<< HEAD
            // onClick={() => { redirect("http://localhost:8000/") }}
=======
              onClick={() => {
                // const isBrowser = typeof window !== "undefined" && window
                // if (isBrowser) window.location = "http://localhost:8000/"
              }}
>>>>>>> master
            >
              <UndoIcon /> Return to main page
            </button>

            <button
              className="rounded-full font-bold text-lg border-primary border-2 py-1 px-4 m-2 hover:text-white hover:bg-primary"
              onClick={() => {
                console.log("click on login")
                setShowModal(true)
              }}
            >
              <AccountCircleIcon /> Sign in
            </button>
          </div>
        </div>
      </div>

      <Login isVisible={showModal} isClose={() => setShowModal(false)} />
    </Fragment>
  )
}

// bg-colorText border-b-2 border-black-100 text-black rounded-full md:cursor-pointer items-center
