import * as React from "react"
import EditIcon from "@material-ui/icons/Edit"
import { useState, useEffect } from "react"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import { redirect } from "../../../utils"
import { getUserInfoEdited } from "../../../apis/userApi"
import { getLSItem } from "../../../utils"
import { selectorFamily } from "recoil"
import ToastMessage from "../../Items/ToastMessage"
import { updateUserInfo } from "../../../apis/userApi"
import { toast } from "react-toastify"

export default function OwnProfile() {
  const [toggleState, setToggleState] = useState(1)
  const [showEditFirstNameForm, setShowEditFirstNameForm] = useState(false)
  const [showEditLastNameForm, setShowEditLastNameForm] = useState(false)
  const [showEditNumberForm, setShowEditNumberForm] = useState(false)
  const [showEditBirthdayForm, setShowEditBirthdayForm] = useState(false)
  const [showEditGenderForm, setShowEditGenderForm] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [birthday, setBirthday] = useState(new Date())
  const [expiration, setExpiration] = useState(new Date())
  const { birth } = birthday
  const { expirationDate } = expiration
  const [ownerData, setOwnerData] = useState()

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [dob, setdob] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [gender, setGender] = useState()

  let ownerProfile

  const toggleTab = (index) => {
    setToggleState(index)
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getUserInfoEdited(getLSItem("ownerToken"))
      console.log(data)
      setOwnerData(data)
      ownerProfile = data

      setFirstName(data.firstName)
      setLastName(data.lastName)
      setdob(data.dob)
      setPhoneNumber(data.phone_number)
      setGender(data.gender)
    }
    getData()
  }, [])

  const updateProfile = async (event) => {
    event.preventDefault()

    const data = {
      firstName,
      lastName,
      dob,
      phone_number: phoneNumber,
      gender
    }

    const response = await updateUserInfo(data, getLSItem("ownerToken"))

    if (response.message === "Updated successfully") {
      toast.success(response.message)
    } else {
      toast.error("Failed to update info, please try again!")
    }
  }

  if (!ownerData)
    return null

  return (
    <div>
      <ToastMessage />
      <div className="flex items-center justify-between pt-8 px-12 bg-primary-light w-screen z-10 md:w-auto text-white">
        <div className="pb-12">
          <h1 className="font-bold text-3xl mb-3 m-4">
            Hello, <span>{ownerData.firstName + ' ' + ownerData.lastName}</span>
          </h1>
          <div className="m-4">
            <p className="font-bold">Account Email</p>
            <p className="">{ownerData.email}</p>
          </div>
        </div>
        <div className="mr-10 relative">
          <img
            className="w-32 h-32 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU"
          />
          <button className="w-8 h-8 rounded-full bg-slate-300 absolute top-24 right-2 border-gray-300 border-2 hover:shadow-xl hover:border-transparent hover:bg-white">
            <EditIcon />
          </button>
        </div>

      </div>

      <div className="flex flex-col relative w-screen md:w-auto bg-primary-light break-all">
        <div className="flex">
          <div
            className={
              toggleState === 1
                ? "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 text-white font-bold"
                : "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-primary-light text-gray-300"
            }
            onClick={() => toggleTab(1)}
          >
            <div className={toggleState === 1 ? "border-b-2 mx-36" : ""}>
              Dashboard
            </div>
          </div>
          <div
            className={
              toggleState === 2
                ? "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 text-white font-bold"
                : "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-primary-light text-gray-300"
            }
            onClick={() => toggleTab(2)}
          >
            <div className={toggleState === 2 ? "border-b-2 mx-36" : ""}>
              Gereral settings
            </div>
          </div>
          <div
            className={
              toggleState === 3
                ? "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 text-white font-bold"
                : "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-primary-light text-gray-300"
            }
            onClick={() => toggleTab(3)}
          >
            <div className={toggleState === 3 ? "border-b-2 mx-36" : ""}>
              Payment
            </div>
          </div>
        </div>

        <div className="grow">
          <div
            className={
              toggleState === 1
                ? "bg-white p-5 w-full h-full p-6 transition duration-300 block"
                : "bg-white p-5 w-full h-full p-6 transition duration-300 hidden"
            }
          >
            <h1 className="font-bold text-2xl mb-4">Your previous searches</h1>
            <div>
              <h2 className="font-bold text-xl ml-2 mb-4">
                You've got no search history – let's change that!
              </h2>
            </div>
          </div>

          <div
            className={
              toggleState === 2
                ? "bg-white p-5 w-full h-full p-6 transition duration-300 block"
                : "bg-white p-5 w-full h-full p-6 transition duration-300 hidden"
            }
          >
            <h1 className="font-bold text-2xl mb-4">General settings</h1>
            <div className="">
              <h2 className="font-bold text-xl ml-2 mb-4">Login details</h2>
              <div className="ml-4">
                <div
                  className={showEditFirstNameForm === false ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">First name</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    {ownerData.firstName} {" "}
                    <button onClick={() => setShowEditFirstNameForm(true)}>
                      <EditIcon />
                    </button>{" "}
                  </div>
                </div>

                <form
                  className={showEditFirstNameForm === true ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">First name</p>
                  <input
                    type="text"
                    autofocus
                    value={firstName || ""}
                    className="border-b-2 border-primary px-2 text-colorText w-full"
                    onChange={(event) => {
                      setFirstName(event.target.value)
                    }}
                  />
                  <div className="flex mt-4">
                    <button
                      type="submit"
                      className="w-20 px-2 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={updateProfile}
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={(event) => {
                        event.preventDefault()
                        setShowEditFirstNameForm(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <div className="ml-4">
                <div
                  className={showEditLastNameForm === false ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Last name</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    {ownerData.lastName} {" "}
                    <button onClick={() => setShowEditLastNameForm(true)}>
                      <EditIcon />
                    </button>{" "}
                  </div>
                </div>

                <form
                  className={showEditLastNameForm === true ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Last name</p>
                  <input
                    type="text"
                    autofocus
                    value={lastName || ""}
                    className="border-b-2 border-primary px-2 text-colorText w-full"
                    onChange={(event) => {
                      setLastName(event.target.value)
                    }}
                  />
                  <div className="flex mt-4">
                    <button
                      type="submit"
                      className="w-20 px-2 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={updateProfile}
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={(event) => {
                        event.preventDefault()
                        setShowEditLastNameForm(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <div className="ml-4 mt-4">
                <div>
                  <p className="text-lg mb-2">Email</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    {ownerData.email}{" "}
                  </div>
                </div>
              </div>

              <div className="ml-4 mt-4">
                <div
                  className={showEditNumberForm === false ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Phone number</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    {" "}
                    (+84) {ownerData.phone_number}
                    <button onClick={() => setShowEditNumberForm(true)}>
                      <EditIcon />
                    </button>{" "}
                  </div>
                </div>

                <form
                  className={showEditNumberForm === true ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Phone number</p>
                  <input
                    type="text"
                    autofocus
                    value={phoneNumber ? `${phoneNumber}` : ""}
                    className="border-b-2 border-primary px-2 text-colorText w-full"
                    onChange={(event) => {
                      setPhoneNumber(event.target.value)
                    }}
                  />
                  <div className="flex mt-4">
                    <button
                      type="submit"
                      className="w-20 px-2 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={updateProfile}
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={(event) => {
                        event.preventDefault()
                        setShowEditNumberForm(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <div className="ml-4 mt-4">
                <div
                  className={showEditBirthdayForm === false ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Birthday</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    {" "}
                    {ownerData.dob}
                    <button onClick={() => setShowEditBirthdayForm(true)}>
                      <EditIcon />
                    </button>{" "}
                  </div>
                </div>

                <form
                  className={showEditBirthdayForm === true ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Birthday</p>

                  <Flatpickr
                    className="w-full pr-3 pl-2 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
                    value={birth}
                    onChange={(birth) => {
                      setBirthday({ birth })
                    }}
                    options={{
                      altFormat: "d/m/Y",
                      altInput: true,
                    }}
                    placeholder="01/01/1000"
                  />

                  <div className="flex mt-4">
                    <button
                      type="submit"
                      className="w-20 px-2 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={updateProfile}
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={(event) => {
                        event.preventDefault()
                        setShowEditBirthdayForm(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <div className="ml-4 mt-4">
                <div
                  className={showEditGenderForm === false ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Gender</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    {" "}
                    {ownerData.gender}
                    <button onClick={() => setShowEditGenderForm(true)}>
                      <EditIcon />
                    </button>{" "}
                  </div>
                </div>

                <form
                  className={showEditGenderForm === true ? "block" : "hidden"}
                >
                  <label for="gender" className="mr-4">
                    Gender
                  </label>
                  <select name="gender" id="gender" onChange={(event) => {
                    setGender(event.target.value)
                  }}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <div className="flex mt-4">
                    <button
                      type="submit"
                      className="w-20 px-2 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={updateProfile}
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={(event) => {
                        event.preventDefault()
                        setShowEditGenderForm(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className={
              toggleState === 3
                ? "bg-white p-5 w-full h-full p-6 transition duration-300 block"
                : "bg-white p-5 w-full h-full p-6 transition duration-300 hidden"
            }
          >
            <h1 className="font-bold text-2xl mb-4">Payment details</h1>
            <div className={showPaymentForm === false ? "block" : "hidden"}>
              <h2 className="font-bold text-xl ml-2 mb-4">
                Saved payment methods
              </h2>
              <p className="font-light ml-4">
                Choose from your saved payment methods when booking to quickly
                autofill your payment info.
              </p>
              <button
                className="ml-6 mt-4 px-2 w-44 px-2 text-colorText text-lg bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full font-bold"
                onClick={() => setShowPaymentForm(true)}
              >
                Add a credit card
              </button>
            </div>
            <form
              className={showPaymentForm === true ? "block ml-4" : "hidden"}
            >
              <div className="mt-4">
                <p className="text-lg mb-2">Name on card</p>
                <input
                  type="text"
                  className="border-b-2 border-primary px-2 text-colorText w-full"
                />
              </div>

              <div className="mt-4">
                <p className="text-lg mb-2">Card number</p>
                <input
                  type="text"
                  className="border-b-2 border-primary px-2 text-colorText w-full"
                />
              </div>

              <div className="mt-4">
                <p className="text-lg mb-2">Expiration date</p>
                <Flatpickr
                  className="w-full pr-3 pl-2 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-primary focus:ring-primary-500 focus: ring-2"
                  value={expirationDate}
                  onChange={(expirationDate) => {
                    setExpiration({ expirationDate })
                  }}
                  options={{
                    altFormat: "m/Y",
                    altInput: true,
                  }}
                  placeholder="MM/YY"
                />
              </div>

              <div className="mt-4">
                <p className="text-lg mb-2">Address line 1</p>
                <input
                  type="text"
                  className="border-b-2 border-primary px-2 text-colorText w-full"
                />
              </div>

              <div className="mt-4">
                <p className="text-lg mb-2">Address line 2 (optional)</p>
                <input
                  type="text"
                  className="border-b-2 border-primary px-2 text-colorText w-full"
                />
              </div>

              <div className="mt-4">
                <p className="text-lg mb-2">Postal code</p>
                <input
                  type="text"
                  className="border-b-2 border-primary px-2 text-colorText w-full"
                />
              </div>

              <div className="mt-4">
                <p className="text-lg mb-2">City</p>
                <input
                  type="text"
                  className="border-b-2 border-primary px-2 text-colorText w-full"
                />
              </div>

              <div className="mt-4">
                <p className="text-lg mb-2">State/ Region</p>
                <input
                  type="text"
                  className="border-b-2 border-primary px-2 text-colorText w-full"
                />
              </div>

              <div className="mt-4">
                <p className="text-lg mb-2">Country</p>
                <input
                  type="text"
                  className="border-b-2 border-primary px-2 text-colorText w-full"
                />
              </div>

              <div className="flex mt-4">
                <button
                  type="submit"
                  className="w-24 px-4 py-1 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                >
                  Save
                </button>
                <button
                  className="w-24 px-4 py-1 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                  onClick={() => setShowEditNumberForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="ml-4 text-red-700 cursor-pointer text-2xl font-bold pb-24" >
        <span onClick={() => {
          const isBrowser = typeof window !== "undefined" && window
          if (isBrowser) {
            localStorage.removeItem("ownerToken")
            window.location.reload()
          }
          redirect(process.env.API_URL)
        }}>Logout.</span>
      </div>
    </div>
  )
}
