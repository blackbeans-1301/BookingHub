import React, { Fragment } from "react";
import { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
// import SignUpModal from "./SignUpModal";
// import SignInModal from "./SignInModal";
// import { AccountContext } from "./AccountContext";

export default function LoginModal({ isVisible, isClose }) {

  const [active, setActive] = useState("signin");

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <form className="w-[600px] flex flex-col">
        {active === "signin" && (
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

                <span className="font-bold text-light-primary hover:text-primary" onClick={() => setActive("forgot")}>
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
                onClick={() => setActive("signup")}
              >
                {" "}
                Sign up
              </span>
            </div>
          </div>
        )}

        {/* show sign up modal */}
        {active === "signup" && (
          <div className="bg-white p-2 rounded flex flex-col m-2">
            <div className="flex justify-between m-2">
              <h2 className="font-bold text-xl text-colorText">Sign up</h2>
              <button
                className="text-light-close text-xl place-self-end hover:text-close-color"
                onClick={() => isClose()}
              >
                <CancelIcon />
              </button>
            </div>

            <div>
              <div className="p-2 mb-4">
                <label className="text-colorText">Fullname</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="text"
                />
              </div>

              <div className="p-2 mb-4">
                <label className="text-colorText">Email</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="email"
                />
              </div>

              <div className="p-2 mb-4">
                <label className="text-colorText">Password</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="password"
                />
              </div>

              <div className="p-2 mb-4">
                <label className="text-colorText">Confirm password</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
            >
              Sign up
            </button>

            <div className="mb-4 flex justify-center">
              <span>You had an account ? </span>
              <span
                className="font-bold text-light-primary hover:text-primary"
                onClick={() => setActive("signin")}
              >
                {" "}
                Sign in
              </span>
            </div>
          </div>
        )}

        {/* show forgot password modal */}
        {active === "forgot" && (
          <div className="bg-white p-2 rounded flex flex-col m-2">
            <div className="flex justify-between m-2">
              <h2 className="font-bold text-xl text-colorText">Forgot password</h2>
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
              </div>
            </div>
            <div className="p-2 mb-4">
              Go to 
                <span className="font-bold text-light-primary hover:text-primary" onClick={() => setActive("signin")}>
                  Sign in
                </span>
              </div>
            <button
              type="submit"
              className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
            >
              Send
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
