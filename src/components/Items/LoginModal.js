import React, { Fragment } from "react";
import { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import SignUpModal from "./SignUpModal";

export default function LoginModal({ isVisible, isClose }) {
  if (!isVisible) return null;

  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <form className="w-[600px] flex flex-col">
          <div className="bg-white p-2 rounded flex flex-col m-2">
            <div className="flex justify-between m-2">
              <h2 className="font-bold text-xl text-colorText">Sign in</h2>
              <button
                className="text-light-close text-xl place-self-end hover:text-close-color"
                onClick={() => isClose()}
              >
                <CancelIcon />
              </button>
            </div>

            <div>
              <div className="p-2 mb-4">
                <label className="text-colorText">Email</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="email"
                />
                <p className="text-red-500 hidden">Wrong email</p>
              </div>

              <div className="p-2 mb-4">
                <label className="text-colorText">Password</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="password"
                />
                <p className="text-red-500 hidden">Wrong password</p>
              </div>

              <div className="p-2 mb-4 flex justify-between">
                <div>
                  <input className="mr-2" type="checkbox" id="remember" />
                  <label className="text-colorText" for="remember">
                    Remember me
                  </label>
                </div>

                <span className="font-bold text-light-primary hover:text-primary">
                  Forgot password ?
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
            >
              Login
            </button>

            <div className="mb-4 flex justify-center">
              <span>You don't have account ? </span>
              <span
                className="font-bold text-light-primary hover:text-primary"
                // onClick={() => {test=true}}
              >
                {" "}
                Sign up
              </span>
            </div>
          </div>
        </form>
      </div>

      {/* <SignUpModal isVisible={test} isClose={isClose} /> */}
    </Fragment>
  );
}
