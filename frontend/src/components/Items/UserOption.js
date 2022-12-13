import React, { Fragment } from "react"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import SettingsIcon from "@material-ui/icons/Settings"
import ReplyIcon from "@material-ui/icons/Reply"
import { redirect } from "../../utils"

export default function UserOption({ isVisible, isClose }) {
  if (!isVisible) return null
  return (
    <div className="absolute top-16 right-2 z-10 flex flex-col bg-white rounded-xl shadow-2xl shadow-blue-200">
      <button
        type="button"
        className="relative m-2 p-2 cursor-pointer text-left hover:bg-primary hover:text-white sm:text-sm"
        onClick={() => redirect("http://localhost:8000/user/ProfilePage")}
      >
        <span className="flex items-center">
          <AccountCircleIcon />
          <span className="ml-3 block">Profile</span>
        </span>
      </button>

      <button
        type="button"
        className="relative m-2 p-2 cursor-pointer text-left hover:bg-primary hover:text-white sm:text-sm"
        onClick={() => redirect("http://localhost:8000/user/SettingsPage")}
      >
        <span className="flex items-center">
          <SettingsIcon />
          <span className="ml-3 block">Settings</span>
        </span>
      </button>

      <button
        type="button"
        className="relative m-2 p-2 cursor-pointer text-left hover:bg-primary hover:text-white sm:text-sm"
        onClick={() => {
          const isBrowser = typeof window !== "undefined" && window
          if (isBrowser) {
            localStorage.removeItem("token")
            window.location.reload()
          }
        }}
      >
        <span className="flex items-center">
          <ReplyIcon />
          <span className="ml-3 block">Log out</span>
        </span>
      </button>
    </div>
  )
}
