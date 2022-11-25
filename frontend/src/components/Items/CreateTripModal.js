import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import axios, { Axios } from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";

export default function CreateTripModal({ isVisible, isClose }) {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [arriveDay, setArriveDay] = useState(new Date());
  const [leaveDay, setLeaveDay] = useState(new Date());

  const { arrive } = arriveDay;
  const { leave } = leaveDay;

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://localhost:8080/login",
  //   }).then((response) => {
  //     console.log("response", response);
  //     if (response.data.loggedIn == true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});

  if (!isVisible) return null;

  // function submit sign in btn
  // const login = () => {
  //   console.log("login");
  //   axios({
  //     method: "post",
  //     url: "http://localhost:8080/login",
  //     data: {
  //       username: usernameLogin,
  //       password: passwordLogin,
  //     },
  //   }).then((res) => {
  //     if (res.data.message) {
  //       setLoginStatus(res.data.message);
  //     } else {
  //       setLoginStatus(res.data[0].username);
  //     }
  //     console.log("res", res);
  //   });
  // };

  // function submit sign up btn
  const signUpFunc = () => {
    console.log("register");

    axios({
      method: "post",
      url: "http://localhost:8080/register",
      data: {
        fullname: fullname,
        username: username,
        email: email,
        password: password,
      },
    }).then((res) => console.log("res", res));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20">
      <form className="w-[600px] flex flex-col z-20">
        <div className="bg-white p-2 rounded flex flex-col m-2">
          <div className="flex justify-between m-2">
            <h2 className="font-bold text-xl text-colorText">Create a Trip</h2>
            <button
              className="text-light-close text-xl place-self-end hover:text-close-color"
              onClick={() => isClose()}
            >
              <CancelIcon />
            </button>
          </div>

          <div>
            <div className="p-2 mb-4">
              <label className="text-colorText">Destination</label>
              <input
                className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                type="username"
                name="username"
                onChange={(e) => {
                  setUsernameLogin(e.target.value);
                }}
              />
              <p className="text-red-500 hidden">Wrong username</p>
            </div>

            <div className="p-2 mb-4">
              <label className="text-colorText">Trip name</label>
              <input
                className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                type="password"
                name="password"
                onChange={(e) => {
                  setPasswordLogin(e.target.value);
                }}
              />
              <p className="text-red-500 hidden">Wrong password</p>
            </div>

            <div className="flex items-center justify-center mx-auto my-6">
              <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 mr-4">
                <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
                <Flatpickr
                  className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
                  value={arrive}
                  onChange={(arrive) => {
                    setArriveDay({ arrive });
                  }}
                  options={{
                    altFormat: "d/m/Y",
                    altInput: true,
                  }}
                  placeholder="Start date"
                />
              </div>

              <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 ml-4">
                <EventAvailableOutlinedIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
                <Flatpickr
                  className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
                  value={leave}
                  onChange={(leave) => {
                    setLeaveDay({ leave });
                  }}
                  options={{
                    altFormat: "d/m/Y",
                    altInput: true,
                  }}
                  placeholder="End date"
                />
              </div>
            </div>

            {/* <div className="p-2 mb-4 flex justify-between">
              <div>
                <input className="mr-2" type="checkbox" id="remember" />
                <label className="text-colorText" for="remember">
                  Remember me
                </label>
              </div>

              <span
                className="font-bold text-light-primary hover:text-primary"
                onClick={() => setActive("forgot")}
              >
                Forgot password ?
              </span>
            </div> */}
          </div>
          <button
            type="submit"
            className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
            // onClick={login}
          >
            Save
          </button>

          {/* <div className="mb-4 flex justify-center">
            <span>You don't have account ? </span>
            <span
              className="font-bold text-light-primary hover:text-primary"
              onClick={() => setActive("signup")}
            >
              {" "}
              Save
            </span>
          </div> */}
        </div>
      </form>
    </div>
  );
}
