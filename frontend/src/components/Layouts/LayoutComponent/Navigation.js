import React, { Fragment, useState } from "react"
// import Icon from '@mui/icons-material/Icon';
// import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import FlightOutlinedIcon from "@material-ui/icons/FlightOutlined"
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined"
import RowingOutlinedIcon from "@material-ui/icons/RowingOutlined"
import BeachAccessOutlinedIcon from "@material-ui/icons/BeachAccessOutlined"
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined"
import PolicyOutlinedIcon from "@material-ui/icons/PolicyOutlined"
import BookOutlinedIcon from "@material-ui/icons/BookOutlined"
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined"
import Logo from "../../../assets/images/logo.png"
import { redirect } from "../../../utils"

export default function Navigation() {
  const [open, setOpen] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const menu = [
    // {
    //   title: "BookingHub",
    //   icon: <img src={Logo} />
    // },

    // {
    //   title: "Sign In",
    //   icon: <AccountCircleIcon />,
    //   //   gap: true,
    // },
    {
      title: "Flights",
      icon: <FlightOutlinedIcon />,
      gap: true,
      link: `${process.env.API_URL}/user/FlightsPage`,
    },
    {
      title: "Stay",
      icon: <HotelOutlinedIcon />,
      link: `${process.env.API_URL}/user/StayPage`,
    },
    {
      title: "Things to do",
      icon: <RowingOutlinedIcon />,
      link: `${process.env.API_URL}/user/ThingsToDoPage`,
    },
    {
      title: "Packages",
      icon: <BeachAccessOutlinedIcon />,
    },
    {
      title: "Explore",
      icon: <LanguageOutlinedIcon />,
      link: `${process.env.API_URL}/user/ExplorePage`,
    },
    {
      title: "Travel Restrictions",
      icon: <PolicyOutlinedIcon />,
    },
    {
      title: "Trips",
      icon: <BookOutlinedIcon />,
      link: `${process.env.API_URL}/user/TripsPage`,
    },
  ]

  return (
    <Fragment>
      <div
        className={`w-1/12 fixed bg-primary min-h-screen text-gray-100 px-2 nav`}
      >
        <img
          src={Logo}
          className="rounded-full w-20 flex items-center justify-center h-20 my-4 mx-auto"
        />

        {/* <div className="py-3 mb-4 mt-20">
          <span
            className="fixed top-28 left-10 p-1 rounded flex justify-end cursor-pointer hover:bg-white hover:text-colorText"
            onClick={() => setOpen(!open)}
          >
            <MenuOutlinedIcon />
          </span>
        </div> */}

        {/* <div
          className={`group flex items-center justify-center gap-3.5 hover:bg-white rounded-md hover:text-colorText cursor-pointer p-2
                `}
          onClick={() => {
            console.log("click on login");
            setShowModal(true);
          }}
        >
          <span className={`material-icons md-48`}>
            <AccountCircleIcon />
          </span>

          <h2
            className={`absolute 2xl:left-28 xl:left-28 lg:left-20 md:left-16 sm:left-2 z-20 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-2 py-1 w-0 hidden
                             group-hover:block group-hover:px-2 group-hover:py-1 group-hover:duration-300 group-hover:w-fit 
                              `}
          >
            Sign in
          </h2>
        </div> */}

        <div className="mt-10 flex flex-col w-full gap-4 relative">
          {menu.map((menuItem, index) => (
            <div
              key={index}
              className={`group flex gap-3.5 hover:bg-white rounded-md hover:text-colorText cursor-pointer p-2
                ${menuItem.gap ? "mt-6" : "mt-2"}`}
              onClick={() => redirect(menuItem.link)}
            >
              <span className={`material-icons md-48`}>{menuItem.icon}</span>

              <span
                className={`title font-semibold text-gray-900 px-1 hidden duration-300 w-fit text-sm text-white group-hover:text-colorText`}
              >
                {menuItem.title}
              </span>

              {/* <h2
                className={`absolute 2xl:left-28 xl:left-28 lg:left-20 md:left-16 sm:left-2 z-20 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-2 py-1 w-0 hidden
                             group-hover:block group-hover:px-2 group-hover:py-1 group-hover:duration-300 group-hover:w-fit 
                              `}
              >
                {menuItem.title}
              </h2> */}
              {/* <span
                style={{ transitionDelay: `${index + 3}00ms` }}
                className={`${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                } duration-500`}
              >
                {menuItem.title}
              </span> */}
            </div>
          ))}
        </div>
      </div>
      {/* <LoginModal isVisible={showModal} isClose={() => setShowModal(false)} /> */}
    </Fragment>

    // // {`${
    // //   open ? "w-72" : "w-20"
    // // } bg-primary relative fixed top-0 left-0 bottom-0 duration-1000 p-2 overflow-y-auto text-center shadow h-full`}
    // <div className="fixed h-screen w-250px">
    //   <div
    //     className={`bg-primary relative fixed top-0 left-0 bottom-0 duration-1000 p-2 overflow-y-auto text-center shadow h-full`}
    //   >
    //     <span
    //       className={`cursor-pointer top-20 p-2 m-5 mt-20 border-2 border-primary hover:bg-white ${
    //         !open && "rotate-180"
    //       }`}
    //       onClick={() => setOpen(!open)}
    //     >
    //       <MenuOutlinedIcon />
    //     </span>

    //     <div className="flex items-center justify-center mt-6 mb-6">
    //       <img
    //         className={`h-10 w-10 rounded-full duration-1000 ${
    //           open && "rotate-[360deg]"
    //         }`}
    //         src={Logo}
    //       />
    //       <span
    //         className={`${
    //           !open && "hidden"
    //         } origin-left duration-200 ml-10 font-bold text-lg`}
    //       >
    //         BookingHub
    //       </span>
    //     </div>

    //   </div>
    // </div>
  )
}
