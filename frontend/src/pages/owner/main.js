import * as React from "react"
import { Fragment } from "react"
import { useState } from "react"
import ChooseModal from "../../components/Items/ChooseModal"
import OwnerHeader from "../../components/Layouts/LayoutComponent/OwnerHeader"
import OwnerLayout from "../../components/Layouts/OwnerLayout"
// import OwnerHeader from "../../components/Layouts/LayoutComponent/OwnerHeader";

const OwnerPage = () => {
  const [showModal, setShowModal] = useState(false)


  // const isBrowser = typeof window !== "undefined" && window
  // if (isBrowser) console.log("GET TOKEN FROM LOCAL STORAGE", localStorage.getItem("token"))

  return (
    <OwnerLayout>
      <div className="h-[32rem] w-full relative">
        <img
          src="https://img.freepik.com/free-vector/friendly-receptionists-from-hotel-registration-desk-help-clients_74855-4420.jpg?w=2000"
          className="w-full h-full object-cover absolute mix-blend-overlay"
        />

        <div className="p-4 shadow-lg bg-white w-96 h-48 top-48 left-32 absolute">

          <h1 className="text-textColor text-2xl font-bold">
            List your places
          </h1>
          <h3 className="text-textColor text-xl">
            Get the bookings you’ve been missing by listing for free on Agoda,
            today!
          </h3>
          <button
            className="flex justify-center rounded-full font-bold text-lg border-primary border-2 py-1 px-4 m-2 hover:text-white hover:bg-primary"
            onClick={() => {
              setShowModal(true)
            }}
          >
            List your place now
          </button>
        </div>
      </div>

      <div className="h-[32rem] w-full">
        <h1 className="flex justify-center text-textColor font-bold text-2xl mt-6 mb-4">
          All you have to do
        </h1>
        <div className="flex my-4 py-4 bg-blue-200">
          <div className="w-3/12 m-1 p-2 bg-white rounded-2xl">
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/261/180/non_2x/account-login-line-icon-new-user-register-free-vector.jpg"
              className="w-full h-72 rounded-t-2xl"
            />
            <h4 className="font-bold">
              Sign in or sign up for a BookingHub account
            </h4>
          </div>

          <div className="w-3/12 m-1 p-2 bg-white rounded-2xl">
            <img
              src="https://thumbs.dreamstime.com/z/note-blank-notes-pinned-to-surface-45645915.jpg"
              className="w-full h-72 rounded-t-2xl"
            />
            <h4 className="font-bold">
              Upload your property details and pictures
            </h4>
          </div>

          <div className="w-3/12 m-1 p-2 bg-white rounded-2xl">
            <img
              src="https://images.cdn4.stockunlimited.net/preview1300/house-with-dollar-sign_1331530.jpg"
              className="w-full h-72 rounded-t-2xl"
            />
            <h4 className="font-bold">Set your prices and available dates</h4>
          </div>

          <div className="w-3/12 m-1 p-2 bg-white rounded-2xl">
            <img
              src="https://media.istockphoto.com/vectors/hotel-hotel-icon-fivestar-hotel-on-a-white-background-vector-id961189076?k=20&m=961189076&s=612x612&w=0&h=T3p2qARooIUEOOAJOWdwFM2wyfE81wkqnOHTZcczN24="
              className="w-full h-72 rounded-t-2xl"
            />
            <h4 className="font-bold">
              See your listing go live in front of millions of travelers
            </h4>
          </div>
        </div>
      </div>
      <ChooseModal isVisible={showModal} isClose={() => setShowModal(false)} />
    </OwnerLayout>
  )
}

export default OwnerPage
