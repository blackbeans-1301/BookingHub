import * as yup from "yup"
import React, { Fragment } from "react"
import { useState } from "react"
import CancelIcon from "@material-ui/icons/Cancel"
import GoogleIcon from "@mui/icons-material/Google"
// import axios, { Axios } from "axios";
import { useFormik } from "formik"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import {
  loginAPI,
  getInformation,
  registerAPI,
  getUserInfor,
  forgotPassword,
  resetPasswordWithVerificationCode,
} from "../../apis/userApi"
import { toast } from "react-toastify"
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
  repeatPassword: yup.string().required("Enter your password"),
  firstName: yup.string().required("Enter your firstName"),
  lastName: yup.string().required("Enter your lastName"),
  dob: date()
    .transform(parseDateString)
    .max(today)
    .required("Enter your date of birth. Please enter a valid date."),
  gender: yup.string().required("Enter your gender"),
  phone_number: yup.string().required("Enter your phone number"),
})

const forgotPassValidationSchema = yup.object({
  email: yup
    .string()
    .email("Let enter a valid email")
    .required("Enter your email"),
})

const resetPasswordValidationSchema = yup.object({
  verificationCode: yup.string().required("Enter verification code"),
  newPassword: yup.string().required("Enter New password"),
  repeatPassword: yup.string().required("Enter Repeat Password"),
})

export default function Login({ isVisible, isClose, isOwner }) {
  const [isLoading, setIsLoading] = useState(false)
  const [active, setActive] = useState("signin")
  const [recoverEmail, setRecoverEmail] = useState()
  const [error, setError] = useState("")

  const redirectFunc = () => {
    redirect(
      isOwner === 0 ? process.env.API_URL : `${process.env.API_URL}/owner/main`
    )
  }

  const handleLogin = (values) => {
    const getToken = async (postData) => {
      const response = await loginAPI(postData)
      const type = typeof response
      if (type === "object") {
        if (isOwner === 0) setLSItem("token", response.assessToken)
        else setLSItem("ownerToken", response.assessToken)

        console.log("token", getLSItem("token"))
        toast.success("Login successfully")

        setTimeout(redirectFunc, 1000)
      } else {
        console.log("login failed")
        toast.error("Error login! Please try again!")
      }
      setIsLoading(false)
    }

    const data = {
      email: values.email,
      password: values.password,
      isOwner,
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
      handleLogin(values)
    },
  })

  const handleRegister = (values) => {
    const signUp = async (postData) => {
      const response = await registerAPI(postData)
      console.log("response", response)
      console.log("type", typeof response)
      const type = typeof response
      if (type === "object") {
        toast.success("Sign up successfully")
        setActive("signin")
      } else {
        console.log("Sign up failed")
        toast.error("Error signing up! Please try again!")
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
      isOwner,
    }
    setIsLoading(true)
    signUp(data)
  }

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      phone_number: "",
      isOwner,
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      if (values.password != values.repeatPassword) {
        toast.error("password not match!")
        return
      }

      handleRegister(values)
    },
  })

  const forgotPassFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPassValidationSchema,
    onSubmit: (values) => {
      setRecoverEmail(values.email)
      sendEmail()
    },
  })

  const resetPasswordFormik = useFormik({
    initialValues: {
      newPassword: "",
      repeatPassword: "",
      verificationCode: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      if (values.verificationCode.toString().trim().length !== 6) {
        setError("Not a valid code!")
        return
      }

      if (values.newPassword !== values.repeatPassword) {
        setError("Password not match, please retype again!")
        return
      }
      setError("")
      requestNewPassword(values.verificationCode, values.newPassword)
    },
  })

  const sendEmail = async () => {
    const response = await forgotPassword({ email: recoverEmail, isOwner })
    console.log(response)
    if (response.message === "Send code to email successfully") {
      setActive("confirm")
    }
  }

  const requestNewPassword = async (verificationCode, password) => {
    const data = {
      code: verificationCode,
      isOwner,
      email: recoverEmail,
      newPassword: password,
    }
    console.log(data)
    const response = await resetPasswordWithVerificationCode(data)

    console.log(response)
    if (response.message === "Reset password successfully") {
      toast.success("Reset password successfully! Going to login.")
      setActive("signin")
    } else {
      toast.error("Wrong verification code! Please try again.")
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="w-[600px] flex flex-col z-20">
        <ToastMessage />
        {/* sign in modal */}
        {active === "signin" && (
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
            {isOwner !== 1 && (
              <div>
                <div className="text-center text-gray-500 flex center justify-center">
                  <div className="w-1/2 h-4 border-b border-gray-200 mr-4"></div>
                  or
                  <div className="w-1/2 h-4 border-b border-gray-200 ml-4"></div>
                </div>
                <div className="flex justify-center">
                  <div
                    className="flex center rounded-md cursor-pointer border px-8 py-2 my-8 border-gray-400"
                    onClick={() => {
                      console.log("go to google")
                      redirect(`${process.env.SERVER_API_URL}/api/user/auth/google`)
                    }}
                  >
                    <span className="font-bold">Google</span>{" "}
                    <GoogleIcon className="ml-2" />
                  </div>
                </div>
              </div>
            )}
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
                    registerFormik.touched.firstName &&
                    registerFormik.errors.firstName
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
                    registerFormik.touched.lastName &&
                    registerFormik.errors.lastName
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
                    registerFormik.touched.gender &&
                    registerFormik.errors.gender
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
                    registerFormik.touched.phone_number &&
                    registerFormik.errors.phone_number
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
                  name="repeatPassword"
                  value={registerFormik.values.repeatPassword}
                  error={
                    registerFormik.touched.repeatPassword &&
                    Boolean(registerFormik.errors.repeatPassword)
                  }
                  onChange={registerFormik.handleChange}
                  helperText={
                    registerFormik.touched.repeatPassword &&
                    registerFormik.errors.repeatPassword
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
                Continue
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

        {active === "confirm" && (
          <div className="bg-white p-2 rounded flex flex-col m-2">
            <div className="flex justify-between m-2">
              <h2 className="font-bold text-3xl text-colorText">
                Reset password
              </h2>
              <button
                className="text-light-close text-xl place-self-end hover:text-close-color"
                onClick={() => isClose()}
              >
                <CancelIcon />
              </button>
            </div>
            <form
              className="flex flex-col m-4"
              onSubmit={resetPasswordFormik.handleSubmit}
            >
              <FormControl className="my-2">
                <Typography variant="subtitle2">Verification code</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Enter verification code"
                  name="verificationCode"
                  value={resetPasswordFormik.values.verificationCode}
                  error={
                    resetPasswordFormik.touched.verificationCode &&
                    Boolean(resetPasswordFormik.errors.verificationCode)
                  }
                  onChange={resetPasswordFormik.handleChange}
                  helperText={
                    resetPasswordFormik.touched.verificationCode &&
                    resetPasswordFormik.errors.verificationCode
                  }
                />
              </FormControl>
              <FormControl className="my-2">
                <Typography variant="subtitle1">New Password</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="New password"
                  name="newPassword"
                  value={resetPasswordFormik.values.newPassword}
                  error={
                    resetPasswordFormik.touched.newPassword &&
                    Boolean(resetPasswordFormik.errors.newPassword)
                  }
                  onChange={resetPasswordFormik.handleChange}
                  helperText={
                    resetPasswordFormik.touched.newPassword &&
                    resetPasswordFormik.errors.newPassword
                  }
                />
              </FormControl>

              <FormControl className="my-2">
                <Typography variant="subtitle2">Repeat Password</Typography>
                <TextField
                  sx={{
                    height: "85px",
                  }}
                  placeholder="Repeat password"
                  name="repeatPassword"
                  value={resetPasswordFormik.values.repeatPassword}
                  error={
                    resetPasswordFormik.touched.repeatPassword &&
                    Boolean(resetPasswordFormik.errors.repeatPassword)
                  }
                  onChange={resetPasswordFormik.handleChange}
                  helperText={
                    resetPasswordFormik.touched.repeatPassword &&
                    resetPasswordFormik.errors.repeatPassword
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
              <div className="text-red-700 font-bold text-center">{error}</div>
              <button
                loading={isLoading}
                variant="contained"
                className="bg-sky-300 text-xl font-bold rounded-full mt-6 hover:bg-sky-500 hover:text-white py-2"
                type="submit"
              >
                Confirm
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
