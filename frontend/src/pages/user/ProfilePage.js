import * as React from "react"
import { useEffect, useState } from "react"
import Layout from "../../components/Layouts"
import Profile from "../../components/Screens/user/Profile"
import { getLSItem } from "../../utils"
import { getUserInfor } from "../../apis/userApi"

const ProfilePage = () => {
  const email = getLSItem("email")
  const [userData, setUserData] = useState()
  useEffect(() => {
    const getUserData = async () => {
      const data = await getUserInfor(setUserData(userData), getLSItem("token"))
      console.log(data)
    }

    // getUserData()
  }, [])

  return (
    <Layout>
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
              <h1 className="rounded-lg py-4 px-12 bg-primary text-white text-xl font-bold">Change Password</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default ProfilePage
