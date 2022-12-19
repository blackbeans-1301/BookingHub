import * as React from "react";
import ToastMessage from "./ToastMessage";
import CancelIcon from "@material-ui/icons/Cancel";
import { checkIn, checkOut } from "../../apis/reservationApi";
import { getLSItem } from "../../utils";
import { toast } from "react-toastify";

export default function VerifyModal({ isVisible, isClose, detail, type, id }) {
  const token = getLSItem("token");
  console.log("reservation_id", id);

  const data = {
    reservation_id: id,
  };

  const verifyFunction = () => {
    if (type == "checkIn") {
      const callApi = async (token, data) => {
        const response = await checkIn(token, data);
        console.log(response);

        if (response.status === 200) {
        } else if (response.status === 400) {
          toast.error(response.message);
        }
      };
      callApi(token, data);
    } else if (type == "checkOut") {
      const callApi = async (token, data) => {
        const response = await checkOut(token, data);
        console.log(response);

        if (response.status === 200) {
        } else if (response.status === 400) {
          toast.error(response.message);
        }
      };
      callApi(token, data);
    }
  };

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
      <div className="w-4/12 flex flex-col z-20 h-5/6 rounded-4xl">
        <div className="bg-white p-2 rounded flex flex-col m-2">
          {/* <h1 className="font-bold text-2xl m-5">Update information for a hotel</h1> */}
          <div className="flex justify-between ">
            <h2 className="font-bold text-2xl text-colorText ml-4 mt-2">
              Verify
            </h2>

            <button
              className="text-light-close text-lg place-self-end hover:text-close-color"
              onClick={() => isClose()}
            >
              <CancelIcon />
            </button>
          </div>
          <ToastMessage />

          <div className="flex flex-col">
            <h1 className="text-sky-600 m-4 text-lg">{detail}</h1>

            <div className="flex justify-around m-4">
              <button
                className="border-2 border-sky-500 bg-white hover:bg-sky-500 hover:text-white rounded-3xl p-2 w-24 font-bold"
                onClick={verifyFunction}
              >
                Verify
              </button>
              <button
                className="border-2 border-red-500 bg-white hover:bg-red-500 hover:text-white rounded-3xl p-2 w-24 font-bold"
                onClick={() => isClose()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
