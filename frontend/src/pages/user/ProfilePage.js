import * as React from "react"
import * as yup from "yup"
import CancelIcon from "@material-ui/icons/Cancel"
import { useEffect, useState } from "react"
import Layout from "../../components/Layouts"
import Profile from "../../components/Screens/user/Profile"
import { getLSItem } from "../../utils"
import { getUserInfor } from "../../apis/userApi"
import { toast } from "react-toastify"
import { date } from "yup"
import { useFormik } from "formik"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import ToastMessage from "../../components/Items/ToastMessage"
import { resetPassword } from "../../apis/userApi"


const changePasswordValidationSchema = yup.object({
  oldPassword: yup
    .string()
    .required("Enter your email"),
  newPassword: yup
    .string()
    .required("Enter your email"),
})


const ProfilePage = () => {
  const email = getLSItem("email")
  const [userData, setUserData] = useState()
  const [modalActive, setModalActive] = useState("")
  const [error, setError] = useState("")


  useEffect(() => {
    const getUserData = async () => {
      const data = await getUserInfor(setUserData(userData), getLSItem("token"))
      console.log(data)
    }

    // getUserData()
  }, [])

  const changePasswordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: (values) => {
      requestChangePassword(values.oldPassword, values.newPassword)
    },
  })

  const requestChangePassword = async (oldPassword, newPassword) => {

    const data = {
      password: oldPassword,
      newPassword,
    }

    console.log(data, getLSItem("token"))

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
            <span className="text-lg font-bold">{email ?? 'blackbeans.1301@gmail.com'}</span>
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
                  <h1 className="text-xl font-bold">{userData?.fullName ?? "(not set)"}</h1>
                  <h1>edit</h1>
                </div>
              </div>

              <div className="mt-8">
                <h1>Email</h1>
                <div className="flex w-80 justify-between border-b mt-2">
                  <h1 className="text-xl font-bold">{userData?.email ?? "(not set)"}</h1>
                  <h1></h1>
                </div>
              </div>

              <div className="mt-8">
                <h1>Gender</h1>
                <div className="flex w-80 justify-between border-b mt-2">
                  <h1 className="text-xl font-bold">{userData?.fullName ?? "(not set)"}</h1>
                  <h1>edit</h1>
                </div>
              </div>

              <div className="mt-8">
                <h1>Phone number</h1>
                <div className="flex w-80 justify-between border-b mt-2">
                  <h1 className="text-xl font-bold">{userData?.fullName ?? "(not set)"}</h1>
                  <h1>edit</h1>
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

              {/* <button
              type="submit"
              className="font-bold text-lg mb-4 pl-4 pr-4 bg-light-primary w-full text-colorText py-2 rounded-full hover:bg-primary hover:text-white"
            >
              Send
            </button> */}
            </div>
          </div>
        </div>
      )}
    </Layout >
  )
}

export default ProfilePage
