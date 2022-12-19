import React, { Fragment, useState } from "react"
import Logo from "../../../assets/images/logo.png"
import textLogo from "../../../assets/images/text-logo.png"
import LoginModal from "../../Items/LoginModal"
import Login from "../../Items/Login"
// import Button from "../Items/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import DescriptionIcon from "@material-ui/icons/Description"
import { redirect } from "../../../utils"

export default function Header() {
  const [showModal, setShowModal] = useState(false)

  return (
    <Fragment>
      <div className="bg-white flex w-screen h-16 z-10 md:w-auto drop-shadow-lg">
        <div className="flex justify-between items-center w-full h-full">
          <img className="md:cursor-pointer h-12" src={textLogo} alt="logo" onClick={() => { redirect(process.env.API_URL) }} />
          <div className="flex">

            <button
              className="font-semibold text-md border-green-400 py-1 px-4 m-2 hover:text-primary"
              onClick={() => {
                console.log(process.env.API_URL)
                redirect(`${process.env.API_URL}/owner/main`)
              }
              }
            >
              <span className="hidden lg:inline">Own a hotel?</span>
            </button>

            <button
              className="rounded-md font-bold text-sm border-primary border py-1 px-4 m-2 hover:text-white hover:bg-primary"
              onClick={() => {
                console.log("click on login")
                setShowModal(true)
              }}
            >
              <div className="flex center">

                <AccountCircleIcon />
                <span className="hidden lg:inline lg:font-semibold lg:ml-2">Sign in</span>
              </div>

            </button>
          </div>
        </div>
      </div>

      <Login isVisible={showModal} isClose={() => setShowModal(false)} />
    </Fragment>
  )
}

// bg-colorText border-b-2 border-black-100 text-black rounded-full md:cursor-pointer items-center
