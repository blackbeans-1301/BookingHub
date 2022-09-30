import React, { useState } from "react";
// import Icon from '@mui/icons-material/Icon';
// import PeopleIcon from '@material-ui/icons/People';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FlightOutlinedIcon from "@material-ui/icons/FlightOutlined";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import RowingOutlinedIcon from "@material-ui/icons/RowingOutlined";
import BeachAccessOutlinedIcon from "@material-ui/icons/BeachAccessOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import PolicyOutlinedIcon from "@material-ui/icons/PolicyOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

export default function Navigation() {
  const [open, setOpen] = useState(true);

  const menu = [
    {
      title: "Sign In",
      icon: <AccountCircleIcon />,
    //   gap: true,
    },
    {
      title: "Flights",
      icon: <FlightOutlinedIcon />,
      gap: true,
    },
    {
      title: "Stay",
      icon: <HotelOutlinedIcon />,
    },
    {
      title: "Things to do",
      icon: <RowingOutlinedIcon />,
    },
    {
      title: "Packages",
      icon: <BeachAccessOutlinedIcon />,
    },
    {
      title: "Explore",
      icon: <LanguageOutlinedIcon />,
    },
    {
      title: "Travel Restrictions",
      icon: <PolicyOutlinedIcon />,
    },
    {
      title: "Trips",
      icon: <BookOutlinedIcon />,
    },
  ];

  return (
    <div className={`${open ? "w-72" : "w-20"} h-screen bg-primary relative`}>
      {/* <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Arrowleft.png"
        className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-primary ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      /> */}

      <span
        className={`cursor-pointer top-20 p-2 m-5 mt-20 border-2 border-primary hover:bg-white ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      >
        <MenuOutlinedIcon />
      </span>

      <ul>
        {menu.map((menuItem, index) => (
          <li
            key={index}
            className={`text-colorText-300 text-sm flex items-center gap-x-10 cursor-pointer p-2 pt-4 pb-4 hover:bg-white rounded-md 
            ${menuItem.gap ? "mt-12" : "mt-2"}`}
          >
            <span className={`ml-5 font-size-50`}>{menuItem.icon}</span>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {menuItem.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
