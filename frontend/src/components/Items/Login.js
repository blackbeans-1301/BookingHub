import * as yup from "yup"
import React, { Fragment } from "react"
import { useState } from "react"
import CancelIcon from "@material-ui/icons/Cancel"
// import axios, { Axios } from "axios";
import { useFormik } from "formik"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { loginAPI, getInformation, registerAPI, getUserInfor } from "../../apis/userApi"
import { toast } from "react-toastify"
import { useSetRecoilState } from "recoil"
import { userState } from "../../store/atoms/userState"
import { tokenState } from "../../store/atoms/tokenState"
import { LoadingButton } from "@mui/lab"
import ToastMessage from "./ToastMessage"
import { parse, isDate } from "date-fns"
import { date } from "yup"
import { getLSItem, setLSItem, redirect } from "../../utils"

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date())

  return parsedDate
}

const today = new Date()
const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Let enter a valid email")
    .required("Enter your email"),
  password: yup.string().required("Enter your password"),
})

const registerValidationSchema = yup.object({
  email: yup
    .string()
    .email("Let enter a valid email")
    .required("Enter your email"),
  password: yup.string().required("Enter your password"),
  firstName: yup.string().required("Enter your firstName"),
  lastName: yup.string().required("Enter your lastName"),
  dob: date().transform(parseDateString).max(today).required("Enter your date of birth. Please enter a valid date."),
  gender: yup.string().required("Enter your gender"),
  phone_number: yup.string().required("Enter your phone number"),
})

const forgotPassValidationSchema = yup.object({
  email: yup
    .string()
    .email("Let enter a valid email")
    .required("Enter your email"),
  password: yup.string().required("Enter your password"),
})
export default function Login({ isVisible, isClose }) {
  const [isLoading, setIsLoading] = useState(false)
  const [active, setActive] = useState("signin")
  // const setToken = useSetRecoilState(tokenState)
  // const setUser = useSetRecoilState(userState)

  const redirectFunc = () => {
    console.log(process.env.API_URL)
    redirect(process.env.API_URL)
  }

  const handleLogin = (values) => {
    const getToken = async (postData) => {
      const response = await loginAPI(postData)
      console.log("response", response)
      console.log("type", typeof response)
      const type = typeof response
      if (type == "object") {
        // localStorage.setItem("token", response.assessToken);
        setLSItem("token", response.assessToken)

        const getInfor = await getUserInfor(getLSItem("token"))
        console.log('token', getLSItem('token'))
        toast.success("Login successfully")
        setTimeout(redirectFunc, 3000)
      } else {
        console.log("login failed")
        toast.error(response)
      }

      // if (response.includes("Email")) {
      //   console.log("invalid password or email");
      //   toast.error("Login failed");
      // } else {

      // }

      // if (response?.UserLogin) {
      //   setToken({
      //     id: response.UserLogin.Id,
      //     token: response.Token,
      //     refreshToken: response.RefreshToken,
      //     role: response.UserLogin.Role,
      //   });
      //   toast.success("Login successfully");
      //   setUser(response.UserLogin);
      // } else {
      //   toast.error("Login failed");
      // }

      setIsLoading(false)
    }

    const data = {
      email: values.email,
      password: values.password,
      isOwner: 1,
    }
    setIsLoading(true)
    getToken(data)
  }


  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // console.log("value" + values);
      handleLogin(values)
    },
  })

  const handleRegister = (values) => {
    const signUp = async (postData) => {
      const response = await registerAPI(postData)
      console.log("response", response)
      console.log("type", typeof response)
      const type = typeof response
      if (type == "object") {
        toast.success("Sign up successfully")
        setActive("signin")
      } else {
        console.log("Sign up failed")
        toast.error(response)
      }

      setIsLoading(false)
    }

    const data = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dob: values.dob,
      gender: values.gender,
      phone_number: values.phone_number,
      isOwner: 1,
    }
    setIsLoading(true)
    signUp(data)
  }

  {/* email, password, firstName, lastName, dob, gender, phone_number, isOwner. */ }
  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      phone_number: "",
      isOwner: 1,
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      // console.log("value" + values);
      handleRegister(values)
    },
  })

  const forgotPassFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: forgotPassValidationSchema,
    onSubmit: (values) => {
      // console.log("value" + values);
      handleLogin(values)
    },
  })

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="w-[600px] flex flex-col z-20">
        <ToastMessage />
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

            <form
              className="flex flex-col m-4"
              onSubmit={loginFormik.handleSubmit}
            >
              <FormControl className="my-2">
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your email..."
                  name="email"
                  value={loginFormik.values.email}
                  error={
                    loginFormik.touched.email &&
                    Boolean(loginFormik.errors.email)
                  }
                  onChange={loginFormik.handleChange}
                  helperText={
                    loginFormik.touched.email && loginFormik.errors.email
                  }
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
                  value={loginFormik.values.password}
                  error={
                    loginFormik.touched.password &&
                    Boolean(loginFormik.errors.password)
                  }
                  onChange={loginFormik.handleChange}
                  helperText={
                    loginFormik.touched.password && loginFormik.errors.password
                  }
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

        {/* email, password, firstName, lastName, dob, gender, phone_number, isOwner. */}
        {active === "signup" && (
          <div className="bg-white p-2 rounded flex flex-col m-2">
            <div className="flex justify-between mx-2 my-1">
              <h2 className="font-bold text-2xl text-colorText">Sign up</h2>
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
            <form
              className="flex flex-col m-4"
              onSubmit={registerFormik.handleSubmit}
            >
              <FormControl className="my-2">
                <Typography variant="subtitle1">Firstname</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your firstname..."
                  name="firstName"
                  value={registerFormik.values.firstName}
                  error={
                    registerFormik.touched.firstName &&
                    Boolean(registerFormik.errors.firstName)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.firstName && registerFormik.errors.firstName
                  }
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Lastname</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your lastname..."
                  name="lastName"
                  value={registerFormik.values.lastName}
                  error={
                    registerFormik.touched.lastName &&
                    Boolean(registerFormik.errors.lastName)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.lastName && registerFormik.errors.lastName
                  }
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
                  value={registerFormik.values.email}
                  error={
                    registerFormik.touched.email &&
                    Boolean(registerFormik.errors.email)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.email && registerFormik.errors.email
                  }
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Date of birth</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="yyyy-mm-dd"
                  name="dob"
                  value={registerFormik.values.dob}
                  error={
                    registerFormik.touched.dob &&
                    Boolean(registerFormik.errors.dob)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.dob && registerFormik.errors.dob
                  }
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Gender</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your gender"
                  name="gender"
                  value={registerFormik.values.gender}
                  error={
                    registerFormik.touched.gender &&
                    Boolean(registerFormik.errors.gender)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.gender && registerFormik.errors.gender
                  }
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle1">Phone number</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your phone number..."
                  name="phone_number"
                  value={registerFormik.values.phone_number}
                  error={
                    registerFormik.touched.phone_number &&
                    Boolean(registerFormik.errors.phone_number)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.phone_number && registerFormik.errors.phone_number
                  }
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
                  value={registerFormik.values.password}
                  error={
                    registerFormik.touched.password &&
                    Boolean(registerFormik.errors.password)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.password &&
                    registerFormik.errors.password
                  }
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
                  value={registerFormik.values.password}
                  error={
                    registerFormik.touched.password &&
                    Boolean(registerFormik.errors.password)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.password &&
                    registerFormik.errors.password
                  }
                />
              </FormControl>

              <LoadingButton
                loading={isLoading}
                variant="contained"
                className="bg-sky-300 text-xl font-bold rounded-full mt-4 hover:bg-sky-500 hover:text-white py-2"
                type="submit"
              >
                Sign up
              </LoadingButton>
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

            <form
              className="flex flex-col m-4"
              onSubmit={forgotPassFormik.handleSubmit}
            >
              <FormControl className="my-2">
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter your email..."
                  name="email"
                  value={forgotPassFormik.values.email}
                  error={
                    forgotPassFormik.touched.email &&
                    Boolean(forgotPassFormik.errors.email)
                  }
                  onChange={forgotPassFormik.handleChange}
                  helperText={
                    forgotPassFormik.touched.email &&
                    forgotPassFormik.errors.email
                  }
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
  )
}
