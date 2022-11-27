import * as yup from "yup";
import React, { Fragment } from "react";
import { useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
// import axios, { Axios } from "axios";
import { useFormik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { loginAPI, getInformation } from "../../apis/loginApi";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { userState } from "../../store/atoms/userState";
import { tokenState } from "../../store/atoms/tokenState";
import { LoadingButton } from "@mui/lab";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Let enter a valid email")
    .required("Enter your username"),
  password: yup.string().required("Enter your password"),
});

export default function Login({ isVisible, isClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState("signin");
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  const handleLogin = (values) => {
    const getToken = async (postData) => {
      const response = await loginAPI(postData);
      console.log('response', response);
      
      if (response.includes('Email')) {
        console.log('invalid password or email')
        toast.error("Login failed");
      }
      else {
        localStorage.setItem('token', response.assessToken);

        const getInfor = await getInformation(localStorage.getItem('token'));
        console.log(getInfor);
      }

      if (response?.UserLogin) {
        setToken({
          id: response.UserLogin.Id,
          token: response.Token,
          refreshToken: response.RefreshToken,
          role: response.UserLogin.Role,
        });

        setUser(response.UserLogin);
      } else {
        toast.error("Login failed");
      }

      setIsLoading(false);
    };

    const data = {
      email: values.email,
      password: values.password,
      isOwner: 0,
    };
    setIsLoading(true);
    getToken(data);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log("value" + values);
      handleLogin(values);
    },
  });

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="w-[600px] flex flex-col z-20">
        {/* sign in modal */}
        {active === "signin" && (
          // <form className="bg-white p-2 rounded flex flex-col m-2"
          // // onSubmit={this.handleSignIn}
          // >
          //   <div className="flex justify-between m-2">
          //     <h2 className="font-bold text-xl text-colorText">Sign in</h2>
          //     <button
          //       className="text-light-close text-xl place-self-end hover:text-close-color"
          //       onClick={() => isClose()}
          //     >
          //       <CancelIcon />
          //     </button>
          //   </div>

          //   <div>
          //     <div className="p-2 mb-4">
          //       <label className="text-colorText">Username</label>
          //       <input
          //         className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
          //         type="username"
          //         name="username"
          //         onChange={(e) => {
          //           setUsernameLogin(e.target.value);
          //         }}
          //       />
          //       <p className="text-red-500 hidden">Wrong username</p>
          //     </div>

          //     <div className="p-2 mb-4">
          //       <label className="text-colorText">Password</label>
          //       <input
          //         className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
          //         type="password"
          //         name="password"
          //         onChange={(e) => {
          //           setPasswordLogin(e.target.value);
          //         }}
          //       />
          //       <p className="text-red-500 hidden">Wrong password</p>
          //     </div>

          //     <div className="p-2 mb-4 flex justify-between">
          //       <div>
          //         <input className="mr-2" type="checkbox" id="remember" />
          //         <label className="text-colorText" for="remember">
          //           Remember me
          //         </label>
          //       </div>

          //       <span
          //         className="font-bold text-light-primary hover:text-primary"
          //         onClick={() => setActive("forgot")}
          //       >
          //         Forgot password ?
          //       </span>
          //     </div>
          //   </div>
          //   <button
          //     type="submit"
          //     className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
          //     onClick={login}
          //   >
          //     Login
          //   </button>

          //   <div className="mb-4 flex justify-center">
          //     <span>You don't have account ? </span>
          //     <span
          //       className="font-bold text-light-primary hover:text-primary"
          //       onClick={() => setActive("signup")}
          //     >
          //       {" "}
          //       Sign up
          //     </span>
          //   </div>
          // </form>

          <div className="bg-white p-2 rounded flex flex-col m-2">
            <div className="flex justify-between m-2">
              <h2 className="font-bold text-3xl text-colorText">Sign in</h2>
              <button
                className="text-light-close text-xl place-self-end hover:text-close-color"
                onClick={() => isClose()}
              >
                <CancelIcon />
              </button>
            </div>

            <form className="flex flex-col m-4" onSubmit={formik.handleSubmit}>
              <FormControl className="my-2">
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your email..."
                  name="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Password</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  type="password"
                  placeholder="Enter your password..."
                  name="password"
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  onChange={formik.handleChange}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <div className="p-2 mb-2 flex justify-between">
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

              <LoadingButton
                type="submit"
                loading={isLoading}
                variant="contained"
                className="bg-sky-300 text-xl font-bold rounded-full mt-1 hover:bg-sky-500 hover:text-white py-2"
              >
                Sign in
              </LoadingButton>
            </form>

            <div className="mb-4 flex justify-center">
              <span>You don't have account ? </span>
              <span
                className="font-bold text-light-primary hover:text-primary mx-2"
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
              <h2 className="font-bold text-3xl text-colorText">Sign up</h2>
              <button
                className="text-light-close text-xl place-self-end hover:text-close-color"
                onClick={() => isClose()}
              >
                <CancelIcon />
              </button>
            </div>

            {/* <div>
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
            </div> */}

            {/* <button
              type="submit"
              className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
              onClick={signUpFunc}
            >
              Sign up
            </button> */}
            <form className="flex flex-col m-4" onSubmit={formik.handleSubmit}>
              <FormControl className="my-2">
                <Typography variant="subtitle1">Username</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your username..."
                  name="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Fullname</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your fullname..."
                  name="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your email..."
                  name="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Password</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  type="password"
                  placeholder="Enter your password..."
                  name="password"
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  onChange={formik.handleChange}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Confirm password</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  type="password"
                  placeholder="Enter your password..."
                  name="password"
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  onChange={formik.handleChange}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <button
                loading={isLoading}
                variant="contained"
                className="bg-sky-300 text-xl font-bold rounded-full mt-1 hover:bg-sky-500 hover:text-white py-2"
                type="submit"
              >
                Sign up
              </button>
            </form>
            <div className="mb-4 flex justify-center">
              <span>You had an account ? </span>
              <span
                className="font-bold text-light-primary hover:text-primary mx-2"
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
              <h2 className="font-bold text-3xl text-colorText">
                Forgot password
              </h2>
              <button
                className="text-light-close text-xl place-self-end hover:text-close-color"
                onClick={() => isClose()}
              >
                <CancelIcon />
              </button>
            </div>

            {/* <div>
              <div className="p-2 mb-4">
                <label className="text-colorText">Email</label>
                <input
                  className="w-full py-2 bg-gray-100 text-colorText px-1 outline-none"
                  type="email"
                />
              </div>
            </div> */}

            <form className="flex flex-col m-4" onSubmit={formik.handleSubmit}>
              <FormControl className="my-2">
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your email..."
                  name="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>

              <div className="p-2 right-0 flex justify-end items-end">
                Go to
                <span
                  className="font-bold text-light-primary hover:text-primary mx-2"
                  onClick={() => setActive("signin")}
                >
                  Sign in
                </span>
              </div>

              <button
                loading={isLoading}
                variant="contained"
                className="bg-sky-300 text-xl font-bold rounded-full mt-6 hover:bg-sky-500 hover:text-white py-2"
                type="submit"
              >
                Send
              </button>
            </form>

            {/* <button
              type="submit"
              className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
            >
              Send
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}
