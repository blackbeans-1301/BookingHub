import React, { Fragment, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import BeachAccessOutlinedIcon from "@material-ui/icons/BeachAccessOutlined";
import TodayIcon from "@material-ui/icons/Today";
import PolicyOutlinedIcon from "@material-ui/icons/PolicyOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import Logo from "../../../assets/images/logo.png";
import { redirect } from "../../../utils";

export default function OwnerSidebar() {
  const menu = [
    {
      title: "Create new hotel",
      icon: <AddCircleIcon />,
      gap: true,
      link: `${process.env.API_URL}/owner/CreateHotelPage`,
    },
    {
      title: "Create new room",
      icon: <AddCircleOutlineIcon />,
      link: `${process.env.API_URL}/owner/CreateRoomPage`,
    },
    {
      title: "List hotels",
      icon: <FormatListNumberedIcon />,
      link: `${process.env.API_URL}/owner/ListHotelPage`,
    },
    {
      title: "Reservations",
      icon: <TodayIcon />,
      link: `${process.env.API_URL}/owner/ListReservationPage`,
    },
    // {
    //   title: "Travel Restrictions",
    //   icon: <PolicyOutlinedIcon />,
    // },
    // {
    //   title: "Trips",
    //   icon: <BookOutlinedIcon />,
    //   link: `${process.env.API_URL}/user/TripsPage`,
    // },
  ];

  return (
    <Fragment>
      <div className={`owner-nav fixed bg-white min-h-screen px-2 shadow-lg`}>
        <img
          src={Logo}
          className="rounded-full w-20 flex items-center justify-center h-20 my-4 mx-auto border-2 border-sky-400"
        />

        <div className="mt-10 flex flex-col w-full gap-4 relative">
          {menu.map((menuItem, index) => (
            <div
              key={index}
              className={`obj flex items-start items-center gap-3.5 rounded-md text-primary hover:bg-sky-300 hover:text-slate-50 cursor-pointer p-2 ml-2
                ${menuItem.gap ? "mt-6" : "mt-2"}`}
              onClick={() => redirect(menuItem.link)}
            >
              <span
                className={`material-icons md-48 text-primary obj-hover:text-slate-50`}
              >
                {menuItem.icon}
              </span>

              <span
                className={`font-semibold px-1 duration-300 w-fit text-sm text-primary items-center obj-hover:text-slate-50`}
              >
                {menuItem.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
