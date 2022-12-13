import React, { Fragment } from "react"
import CancelIcon from "@material-ui/icons/Cancel"
import { redirect } from "../../utils"

export default function ChooseModal({ isVisible, isClose }) {
  if (!isVisible) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="w-[900px] flex flex-col z-20">
        <div className="bg-white p-2 rounded flex flex-col m-2">
          <div className="m-2">
            <div className="flex justify-between ">
              <h2 className="font-bold text-xl text-colorText">
                Which of the following best for you?
              </h2>

              <button
                className="text-light-close text-xl place-self-end hover:text-close-color"
                onClick={() => isClose()}
              >
                <CancelIcon />
              </button>
            </div>
            <p>
              Select one, and we’ll take you to the next step for quick
              onboarding
            </p>
          </div>

          <div className="flex">
            <div className="m-1.5 p-1 rounded-xl shadow-md hover:shadow-xl w-2/6 h-10/12">
              <img
                className="h-[300px]"
                src="https://thumbs.dreamstime.com/b/hotel-near-sea-ocean-resort-view-vector-illustration-flat-cartoon-building-beach-street-road-big-skyscrapers-town-128845202.jpg"
              />
              <p className="font-bold">Create new hotel</p>
              <button
                className="w-full text-center text-colorText rounded-full border-2 border-primary my-4 hover:bg-primary hover:text-white"
                onClick={() => { redirect("http://localhost:8000/owner/CreateHotelPage") }
                }
              >
                Select
              </button>
            </div>

            <div className="m-1.5 p-1 rounded-xl shadow-md hover:shadow-xl w-2/6 h-10/12">
              <img
                className="h-[300px]"
                src="https://media.istockphoto.com/vectors/colorful-interior-of-bedroom-in-flat-cartoon-style-vector-id640093404"
              />
              <p className="font-bold">Create new room</p>
              <button
                className="w-full text-center text-colorText rounded-full border-2 border-primary my-4 hover:bg-primary hover:text-white"
                onClick={() =>
                  redirect("http://localhost:8000/owner/CreateRoomPage")
                }
              >
                Select
              </button>
            </div>

            <div className="m-1.5 p-1 rounded-xl shadow-md hover:shadow-xl w-2/6 h-10/12">
              <img
                className="h-[300px]"
                src="https://www.how-to-draw-funny-cartoons.com/images/cartoon-list-002.png"
              />
              <p className="font-bold">List all hotels</p>
              <button
                className="w-full text-center text-colorText rounded-full border-2 border-primary my-4 hover:bg-primary hover:text-white"
                onClick={() =>
                  redirect("http://localhost:8000/owner/ListHotelPage")
                }
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
