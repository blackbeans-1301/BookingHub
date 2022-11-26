import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import React, { Fragment, useState } from "react";
import CreateTripModal from "../Items/CreateTripModal";

export default function Trips() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
        <h1 className="font-bold text-4xl my-6 ml-6">Trips</h1>
        <button
          className="float-right mr-4 p-2 bg-sky-300 font-semibold rounded-lg text-colorText hover:shadow-xl hover:text-white hover:bg-sky-500"
          onClick={() => setShowModal(true)}
        >
          Create new trip
        </button>

        <div className="flex flex-col justify-center items-center my-20 mx-auto">
          <div className="text-3xl">
            <BookOutlinedIcon />
          </div>

          <h1 className="text-3xl">No upcoming Trips</h1>
          <h4>
            Simply add to your Trips by forwarding emails with booking receipts
            to trips@momondo.com
          </h4>
        </div>

        <div className="flex justify-center mx-auto">
          <button
            className="p-2 bg-sky-300 mr-8 font-semibold rounded-lg text-colorText hover:shadow-xl hover:text-white hover:bg-sky-500"
            onClick={() => setShowModal(true)}
          >
            Create a trip manually
          </button>
          <button className="p-2 bg-sky-300 ml-8 font-semibold rounded-lg text-colorText hover:shadow-xl hover:text-white hover:bg-sky-500">
            Find a booking
          </button>
        </div>
      </div>

      <CreateTripModal
        isVisible={showModal}
        isClose={() => setShowModal(false)}
      />
    </Fragment>
  );
}
