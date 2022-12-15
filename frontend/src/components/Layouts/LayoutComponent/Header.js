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
      <div className="bg-white flex w-screen z-10 md:w-auto w-full drop-shadow-lg">
        <div className="flex justify-between items-center w-full h-full">
          <img className="md:cursor-pointer h-12" src={textLogo} alt="logo" />
          <div className="flex">

            <button
              className="rounded-full font-bold text-lg border-green-400 border-2 py-1 px-4 m-2 hover:text-white hover:bg-green-400"
              onClick={() => { redirect(`${process.env.API_URL}/owner/main`) }
              }
            >
              <DescriptionIcon />
              <span className="hidden lg:inline">List your place</span>

            </button>

            <button
              className="rounded-full font-bold text-lg border-primary border-2 py-1 px-4 m-2 hover:text-white hover:bg-primary"
              onClick={() => {
                console.log("click on login")
                setShowModal(true)
              }}
            >
              <AccountCircleIcon />
              <span className="hidden lg:inline">Sign in</span>

            </button>
          </div>
        </div>
      </div>

      <Login isVisible={showModal} isClose={() => setShowModal(false)} />
    </Fragment>
  )
}

// bg-colorText border-b-2 border-black-100 text-black rounded-full md:cursor-pointer items-center
