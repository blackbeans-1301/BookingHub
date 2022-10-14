import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import axios, { Axios } from "axios";
// import jwt_decode from "jwt-decode";

export default function LoginModal({ isVisible, isClose }) {

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [active, setActive] = useState("signin");

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/login',
    }).then((response) => {
      console.log("response", response);
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});

  if (!isVisible) return null;

  // function submit sign in btn
  const login = () => {
    console.log("login");
    axios({
      method: "post",
      url: "http://localhost:3000/login",
      data: {
        username: usernameLogin,
        password: passwordLogin,
      },
    }).then((res) => {
      if (res.data.message) {
        setLoginStatus(res.data.message);
      } else {
        setLoginStatus(res.data[0].username);
      }
      console.log("res", res);
    });
  };

  // function submit sign up btn
  const signUpFunc = () => {
    console.log("register");

    axios({
      method: "post",
      url: "http://localhost:3000/register",
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
        {/* sign in modal */}
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
                <label className="text-colorText">Username</label>
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
                <label className="text-colorText">Password</label>
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

              <div className="p-2 mb-4 flex justify-between">
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
              </div>
            </div>
            <button
              type="submit"
              className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
              onClick={login}
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

            {/* <div className="" id="google"></div>

            <h1>{loginStatus}</h1>
            <button onClick={(e) => handleSignOut(e)}>Sign out</button>
                {user && 
                <div>
                    <img src={user.picture} />
                    <h3>{user.name}</h3>
                </div>
                } */}

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
                <label className="text-colorText">Username</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="text"
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div className="p-2 mb-4">
                <label className="text-colorText">Fullname</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="text"
                  name="fullname"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                />
              </div>

              <div className="p-2 mb-4">
                <label className="text-colorText">Email</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="p-2 mb-4">
                <label className="text-colorText">Password</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
              onClick={signUpFunc}
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
              <h2 className="font-bold text-xl text-colorText">
                Forgot password
              </h2>
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
              <span
                className="font-bold text-light-primary hover:text-primary"
                onClick={() => setActive("signin")}
              >
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
