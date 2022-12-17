import * as React from "react";
import { Fragment } from "react";
import { useState } from "react";
import BookingModal from "../../Items/BookingModal";

export default function Flights() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <div className="m-4 bg-white w-screen z-10 md:w-auto w-full">
        <h1 className="font-bold text-2xl mb-3">this is the flight page</h1>

        <button
          className=""
          onClick={() => {
            console.log("click on make reservation");
            setShowModal(true);
          }}
        >
          <span className="">Make a reservation</span>
        </button>
      </div>
      <BookingModal isVisible={showModal} isClose={() => setShowModal(false)} />
    </Fragment>
  );
}
