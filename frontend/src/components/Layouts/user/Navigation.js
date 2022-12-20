import React, { Fragment, useState } from "react"
// import Icon from '@mui/icons-material/Icon';
// import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import FlightOutlinedIcon from "@material-ui/icons/FlightOutlined"
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined"
import RowingOutlinedIcon from "@material-ui/icons/RowingOutlined"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import HistoryIcon from '@mui/icons-material/History'
import BeachAccessOutlinedIcon from "@material-ui/icons/BeachAccessOutlined"
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined"
import PolicyOutlinedIcon from "@material-ui/icons/PolicyOutlined"
import BookOutlinedIcon from "@material-ui/icons/BookOutlined"
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined"
import Logo from "../../../assets/images/logo.png"
import { redirect } from "../../../utils"

export default function Navigation() {
  const userMenu = [
    {
      title: "History",
      icon: <HistoryIcon />,
      gap: true,
      link: `${process.env.API_URL}/user/HistoryPage`,
    },
    {
      title: "Reservation",
      icon: <EventSeatIcon />,
      gap: true,
      link: `${process.env.API_URL}/user/ReservationPage`,
    },
  ]

  const menu = [
    {
      title: "Stay",
      icon: <HotelOutlinedIcon />,
      link: `${process.env.API_URL}`,
    },
    {
      title: "Things to do",
      icon: <RowingOutlinedIcon />,
      link: `${process.env.API_URL}/user/ThingsToDoPage`,
    },
    {
      title: "Explore",
      icon: <LanguageOutlinedIcon />,
      link: `${process.env.API_URL}/user/ExplorePage`,
    },
    {
      title: "Travel Restrictions",
      icon: <PolicyOutlinedIcon />,
      link: `${process.env.API_URL}/user/TravelRestrictionPage`,
    },
  ]

  const privacy = [
    {
      title: "Privacy",
      icon: <VerifiedUserIcon />,
      link: `${process.env.API_URL}/user/PrivacyPage`,
    },
  ]

  return (
    <Fragment>
      <div
        className={`w-1/12 fixed bg-primary min-h-screen text-gray-100 px-2 nav`}
      >
        <img
          src={Logo}
          className="rounded-full w-10 cursor-pointer flex items-center justify-center h-10 my-4 mx-auto"
          width="50px"
          height="50px"
          onClick={() => redirect(process.env.API_URL)}
        />

        <div className="mt-10 flex flex-col w-full gap-4 relative">
          <div>
            {userMenu.map((menuItem, index) => (
              <div
                key={index}
                className={`group flex gap-3.5 hover:bg-white rounded-md hover:text-colorText cursor-pointer p-2 mb-2
                ${menuItem.gap ? "mt-6" : "mt-2"}`}
                onClick={() => redirect(menuItem.link)}
              >
                <span className={`material-icons md-48`}>{menuItem.icon}</span>

                <span
                  className={`title font-semibold text-gray-900 px-1 hidden duration-300 w-fit text-sm text-white group-hover:text-colorText`}
                >
                  {menuItem.title}
                </span>
              </div>
            ))}
          </div>


          <div className="border-b mx-4"></div>
          <div className="">

            {menu.map((menuItem, index) => (
              <div
                key={index}
                className={`group flex gap-3.5 hover:bg-white rounded-md hover:text-colorText cursor-pointer p-2 mb-4
                ${menuItem.gap ? "mt-6" : "mt-26"}`}
                onClick={() => redirect(menuItem.link)}
              >
                <span className={`material-icons md-48`}>{menuItem.icon}</span>

                <span
                  className={`title font-semibold px-1 hidden duration-300 w-fit text-sm text-white group-hover:text-colorText`}
                >
                  {menuItem.title}
                </span>
              </div>
            ))}
          </div>

          <div className="border-b mx-4"></div>

          <div className="">

            {privacy.map((menuItem, index) => (
              <div
                key={index}
                className={`group flex gap-3.5 hover:bg-white rounded-md hover:text-colorText cursor-pointer p-2 mb-4
                ${menuItem.gap ? "mt-6" : "mt-26"}`}
                onClick={() => redirect(menuItem.link)}
              >
                <div className={`material-icons md-48`}>{menuItem.icon}</div>

                <div
                  className={`title font-semibold px-1 hidden duration-300 w-fit text-sm text-white group-hover:text-colorText h-max`}
                >
                  {menuItem.title}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Fragment>
  )
}
