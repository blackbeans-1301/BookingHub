import * as React from "react"
import * as yup from "yup"
import CancelIcon from "@material-ui/icons/Cancel"
import { useEffect, useState } from "react"
import Layout from "../../components/Layouts"
import Profile from "../../components/Screens/user/Profile"
import { getLSItem } from "../../utils"
import { getUserInfor } from "../../apis/userApi"
import { toast, ToastContainer } from "react-toastify"
import { date } from "yup"
import { parse, isDate } from "date-fns"
import { useFormik } from "formik"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import ToastMessage from "../../components/Items/ToastMessage"
import { resetPassword, getUserInfoEdited, updateUserInfo } from "../../apis/userApi"


function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date())

  return parsedDate
}

const today = new Date()

const changePasswordValidationSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Enter your email"),
  newPassword: yup
    .string()
    .required("Enter your email"),
})

const editInfoValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("Enter your email"),
  lastName: yup
    .string()
    .required("Enter your email"),
  dateOfBirth: yup
    .date().transform(parseDateString).max(today).required("Enter your date of birth. Please enter a valid date."),
  gender: yup
    .string()
    .required("Enter your email"),
  phoneNumber: yup
    .string()
    .required("Enter your email"),
})


const ProfilePage = () => {
  const email = getLSItem("email")
  const [userData, setUserData] = useState()
  const [modalActive, setModalActive] = useState("")
  const [error, setError] = useState("")
  const [editedStatus, setEditedStatus] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUserInfoEdited(getLSItem("token"))
      setUserData(data)
    }

    getUserData()
  }, [])

  const changePasswordFormik = useFormik({
    validationSchema: changePasswordValidationSchema,
    onSubmit: (values) => {
      requestChangePassword(values.oldPassword, values.newPassword)
    },
  })

  const editInfoFormik = useFormik({
    initialValues: {
      firstName: userData ? userData.firstName : '',
      lastName: userData ? userData.lastName : '',
      gender: userData ? userData.gender : '',
      phoneNumber: userData ? userData.phone_number : '',
    },
    validationSchema: editInfoValidationSchema,
    onSubmit: (values) => {
      requestUpdateInfo(values)
    },
    enableReinitialze: true,
  })

  const requestUpdateInfo = async (values) => {
    const data = {
      dob: values.dateOfBirth,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      phone_number: values.phoneNumber,
    }

    const response = await updateUserInfo(data, getLSItem("token"))
    console.log(response)
    if (response !== undefined) {
      toast.success(response.message)
    } else {
      toast.error("Error updating information. Plase try again later...")
    }
  }

  const requestChangePassword = async (oldPassword, newPassword) => {
    const data = {
      password: oldPassword,
      newPassword,
    }

    const response = await resetPassword(data, getLSItem("token"))
    console.log(response)
    if (response === undefined) {
      toast.error("Wrong password!")
      return
    }
    if (response.message === 'Updated password successfully!') {
      toast.success(response.message)
      setModalActive("")
    }
  }

  return (
    <Layout>
      <ToastMessage />
      <div className="h-80 w-full bg-primary-light flex pt-20 px-32 justify-between">
        <div className="">
          <h1 className="text-white font-bold text-5xl">Hello</h1>
          <div className="text-white text-md pt-12">
            Account email
            <br />
            <span className="text-lg font-bold">{userData ? userData.email : "error getting data"}</span>
          </div>
        </div>
        <div>
          <img className="w-48" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar"></img>
        </div>
      </div>
      <div className="px-32 py-20">
        <h1 className="font-bold text-primary text-2xl">General settings</h1>
        <div className="p-8 border mt-12 rounded-md">
          <h1 className="font-bold text-black">Login details</h1>
          <div className="flex justify-between ">
            <div>
              <div className="mt-8">
                <h1>Name</h1>
                <div className="flex w-80 justify-between border-b mt-2">
                  <h1 className="text-xl font-bold">{userData ? `${userData.firstName + " " + userData.lastName}` : "not set"}</h1>
                  <h1 onClick={() => {
                    setModalActive("update")
                  }}
                    className="cursor-pointer">edit</h1>
                </div>
              </div>

              <div className="mt-8">
                <h1>Email</h1>
                <div className="flex w-80 justify-between border-b mt-2">
                  <h1 className="text-xl font-bold">{userData ? userData.email : "(not set)"}</h1>
                  <h1></h1>
                </div>
              </div>

              <div className="mt-8">
                <h1>Date of birth</h1>
                <div className="flex w-80 justify-between border-b mt-2">
                  <h1 className="text-xl font-bold">{userData ? userData.dob : "(not set)"}</h1>
                  <h1></h1>
                </div>
              </div>

              <div className="mt-8">
                <h1>Gender</h1>
                <div className="flex w-80 justify-between border-b mt-2">
                  <h1 className="text-xl font-bold">{userData ? userData.gender : "(not set)"}</h1>
                  <h1 onClick={() => {
                    setModalActive("update")
                  }}
                    className="cursor-pointer">edit</h1>
                </div>
              </div>

              <div className="mt-8">
                <h1>Phone number</h1>
                <div className="flex w-80 justify-between border-b mt-2">
                  <h1 className="text-xl font-bold">{userData ? userData.phone_number : "(not set)"}</h1>
                  <h1 onClick={() => {
                    setModalActive("update")
                  }}
                    className="cursor-pointer">edit</h1>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="rounded-lg py-4 px-12 bg-primary text-white text-xl font-bold cursor-pointer"
                onClick={() => {
                  setModalActive("changePW")
                }}
              >Change Password</h1>
            </div>
          </div>
        </div>
      </div>

      {modalActive === "changePW" && (
        <div className="w-full h-full fixed top-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="flex justify-center mt-12">
            <div className="bg-white w-1/2 p-2 rounded flex flex-col m-2 z-10 top-20">
              <div className="flex justify-between m-2">
                <h2 className="font-bold text-3xl text-colorText">
                  Change password
                </h2>
                <button
                  className="text-light-close text-xl place-self-end hover:text-close-color"
                  onClick={() => { setModalActive("") }}
                >
                  <CancelIcon />
                </button>
              </div>

              <form
                className="flex flex-col m-4"
                onSubmit={changePasswordFormik.handleSubmit}
              >
                <FormControl className="my-2">
                  <Typography variant="subtitle1">Your old password</Typography>
                  <TextField
                    sx={{
                      height: "85px",
                    }}
                    placeholder="Old password"
                    name="oldPassword"
                    value={changePasswordFormik.values.oldPassword}
                    error={
                      changePasswordFormik.touched.oldPassword &&
                      Boolean(changePasswordFormik.errors.oldPassword)
                    }
                    onChange={changePasswordFormik.handleChange}
                    helperText={
                      changePasswordFormik.touched.oldPassword &&
                      changePasswordFormik.errors.oldPassword
                    }
                  />
                </FormControl>


                <FormControl className="my-2">
                  <Typography variant="subtitle1">Your new password</Typography>
                  <TextField
                    sx={{
                      height: "85px",
                    }}
                    placeholder="New password"
                    name="newPassword"
                    value={changePasswordFormik.values.newPassword}
                    error={
                      changePasswordFormik.touched.newPassword &&
                      Boolean(changePasswordFormik.errors.newPassword)
                    }
                    onChange={changePasswordFormik.handleChange}
                    helperText={
                      changePasswordFormik.touched.newPassword &&
                      changePasswordFormik.errors.newPassword
                    }
                  />
                </FormControl>

                <div className="p-2 right-0 flex justify-end items-end">
                  Go to
                  <span
                    className="font-bold text-light-primary hover:text-primary mx-2"
                    onClick={() => setModalActive("signin")}
                  >
                    Sign in
                  </span>
                </div>
                <div className="text-red-700 font-bold text-center">{error}</div>
                <button
                  variant="contained"
                  className="bg-sky-300 text-xl font-bold rounded-full mt-6 hover:bg-sky-500 hover:text-white py-2"
                  type="submit"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {modalActive === "update" && (
        <div className="w-full h-full fixed top-0" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="flex justify-center mt-12">
            <div className="bg-white w-1/2 p-2 rounded flex flex-col m-2 z-10 top-20">
              <div className="flex justify-between m-2">
                <h2 className="font-bold text-3xl text-colorText">
                  Change password
                </h2>
                <button
                  className="text-light-close text-xl place-self-end hover:text-close-color"
                  onClick={() => { setModalActive("") }}
                >
                  <CancelIcon />
                </button>
              </div>
              <form
                className="flex flex-col m-4"
                onSubmit={editInfoFormik.handleSubmit}
              >
                <FormControl className="my-2">
                  <Typography variant="subtitle1">First name</Typography>
                  <TextField
                    sx={{
                      height: "85px",
                    }}
                    placeholder="First name"
                    name="firstName"
                    value={editInfoFormik.values.firstName}
                    error={
                      editInfoFormik.touched.firstName &&
                      Boolean(editInfoFormik.errors.firstName)
                    }
                    onChange={editInfoFormik.handleChange}
                    helperText={
                      editInfoFormik.touched.firstName &&
                      editInfoFormik.errors.firstName
                    }
                  />
                </FormControl>


                <FormControl className="my-2">
                  <Typography variant="subtitle1">Last name</Typography>
                  <TextField
                    sx={{
                      height: "85px",
                    }}
                    placeholder="Last name"
                    name="lastName"
                    value={editInfoFormik.values.lastName}
                    error={
                      editInfoFormik.touched.lastName &&
                      Boolean(editInfoFormik.errors.lastName)
                    }
                    onChange={editInfoFormik.handleChange}
                    helperText={
                      editInfoFormik.touched.lastName &&
                      editInfoFormik.errors.lastName
                    }
                  />
                </FormControl>

                <FormControl className="my-2">
                  <Typography variant="subtitle1">Gender</Typography>
                  <TextField
                    sx={{
                      height: "85px",
                    }}
                    placeholder="Gender"
                    name="gender"
                    value={editInfoFormik.values.gender}
                    error={
                      editInfoFormik.touched.gender &&
                      Boolean(editInfoFormik.errors.gender)
                    }
                    onChange={editInfoFormik.handleChange}
                    helperText={
                      editInfoFormik.touched.gender &&
                      editInfoFormik.errors.gender
                    }
                  />
                </FormControl>

                <FormControl className="my-2">
                  <Typography variant="subtitle1">Date of birth</Typography>
                  <TextField
                    sx={{
                      height: "85px",
                    }}
                    placeholder="Date of birth"
                    name="dateOfBirth"
                    value={editInfoFormik.values.dateOfBirth}
                    error={
                      editInfoFormik.touched.dateOfBirth &&
                      Boolean(editInfoFormik.errors.dateOfBirth)
                    }
                    onChange={editInfoFormik.handleChange}
                    helperText={
                      editInfoFormik.touched.dateOfBirth &&
                      editInfoFormik.errors.dateOfBirth
                    }
                  />
                </FormControl>

                <FormControl className="my-2">
                  <Typography variant="subtitle1">Phone number</Typography>
                  <TextField
                    sx={{
                      height: "85px",
                    }}
                    placeholder="EX: 0123456789"
                    name="phoneNumber"
                    value={editInfoFormik.values.phoneNumber}
                    error={
                      editInfoFormik.touched.phoneNumber &&
                      Boolean(editInfoFormik.errors.phoneNumber)
                    }
                    onChange={editInfoFormik.handleChange}
                    helperText={
                      editInfoFormik.touched.phoneNumber &&
                      editInfoFormik.errors.phoneNumber
                    }
                  />
                </FormControl>

                <div className="text-red-700 font-bold text-center">{error}</div>
                <button
                  variant="contained"
                  className="bg-sky-300 text-xl font-bold rounded-full mt-6 hover:bg-sky-500 hover:text-white py-2"
                  type="submit"
                >
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout >
  )
}

export default ProfilePage
