import * as React from "react";
import * as yup from "yup";
import EditIcon from "@material-ui/icons/Edit";
import { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { getUserInfor, registerAPI } from "../../../apis/userApi";
import { useFormik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { parse, isDate } from "date-fns";

import { date } from "yup";

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}
const today = new Date();
const registerValidationSchema = yup.object({
  email: yup
    .string()
    .email("Let enter a valid email")
    .required("Enter your email"),
  firstName: yup.string().required("Enter your firstName"),
  lastName: yup.string().required("Enter your lastName"),
  dob: date()
    .transform(parseDateString)
    .max(today)
    .required("Enter your date of birth. Please enter a valid date."),
  gender: yup.string().required("Enter your gender"),
  phone_number: yup.string().required("Enter your phone number"),
});

export default function Profile() {
  const [toggleState, setToggleState] = useState(1);
  const [showEditNameForm, setShowEditNameForm] = useState(false);
  const [showEditNumberForm, setShowEditNumberForm] = useState(false);
  const [showEditBirthdayForm, setShowEditBirthdayForm] = useState(false);
  const [showEditGenderForm, setShowEditGenderForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [expiration, setExpiration] = useState(new Date());
  const [infor, setInfor] = useState();
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState("signin");
  const { birth } = birthday;
  const { expirationDate } = expiration;

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    getUserInfor(setInfor, token);
  }, []);

  console.log("infor", infor);

  const handleRegister = (values) => {
    const signUp = async (postData) => {
      const response = await registerAPI(postData);
      console.log("response", response);
      console.log("type", typeof response);
      const type = typeof response;
      if (type == "object") {
        toast.success("Change user's information successfully");
        setActive("signin");
      } else {
        console.log("Change user's information failed");
        toast.error(response);
      }

      setIsLoading(false);
    };

    const data = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      dob: values.dob,
      gender: values.gender,
      phone_number: values.phone_number,
      isOwner: 1,
    };
    setIsLoading(true);
    signUp(data);
  };
  const registerFormik = useFormik({
    initialValues: {
      email: infor.email,
      firstName: infor.firstName,
      lastName: infor.lastName,
      dob: infor.dob,
      gender: infor.gender,
      phone_number: infor.phone_number,
      isOwner: 1,
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      // console.log("value" + values);
      handleRegister(values);
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between m-4 bg-light-primary w-screen z-10 md:w-auto w-full">
        <div>
          <h1 className="font-bold text-2xl mb-3 m-4">
            Hello, <span>{infor != undefined ? infor.lastName : ""}</span>
          </h1>
          <div className="m-4">
            <p className="font-bold">Account Email</p>
            <p className="">{infor != undefined ? infor.email : ""}</p>
          </div>
          <div className="m-4">
            <p className="font-bold">Name</p>
            <p className="">
              {infor != undefined ? `${infor.firstName} ${infor.lastName}` : ""}
            </p>
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
        {/* <div className="flex mt-3">
            <div className="relative flex items-center text-gray-400 focus-within:text-gray-600 w-5/6">
              <CameraAltIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
              <input
                className="md:w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-colorText rounded-2xl boder-none ring-2 ring-gray-300 focus:ring-primary-500 focus: ring-2"
                type="text"
                aria-label="Choose the destination..."
              />
            </div>

            <div className="w-1/6">
              <button className="w-3/4 h-full px-2 rounded-full bg-white text-colorText flex items-center justify-center ml-2 border-2 border-light-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-gray-200">
                <SearchIcon />
                <span>Search</span>
              </button>
            </div>
          </div> */}
      </div>

      <div className="flex flex-col relative w-screen md:w-auto w-full bg-light-primary break-all border-2 m-4">
        <div className="flex">
          <div
            className={
              toggleState === 1
                ? "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-white border-b-2 border-primary font-bold"
                : "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-light-primary"
            }
            onClick={() => toggleTab(1)}
          >
            Dashboard
          </div>
          <div
            className={
              toggleState === 2
                ? "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-white border-b-2 border-primary font-bold"
                : "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-light-primary"
            }
            onClick={() => toggleTab(2)}
          >
            General settings
          </div>
          <div
            className={
              toggleState === 3
                ? "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-white border-b-2 border-primary font-bold"
                : "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-light-primary"
            }
            onClick={() => toggleTab(3)}
          >
            Payment details
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
              {/* <div className="ml-4">
                <div
                  className={showEditNameForm === false ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Your name</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    Nguyen Loan{" "}
                    <button onClick={() => setShowEditNameForm(true)}>
                      <EditIcon />
                    </button>{" "}
                  </div>
                </div>

                <form
                  className={showEditNameForm === true ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Your name</p>
                  <input
                    type="text"
                    autofocus
                    value="Nguyen Loan"
                    className="border-b-2 border-primary px-2 text-colorText w-full"
                  />
                  <div className="flex mt-4">
                    <button
                      type="submit"
                      className="w-20 px-2 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={() => setShowEditNameForm(false)}
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
                    nguyenloan15062002@gmail.com{" "}
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
                    +84
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
                    value="+84"
                    className="border-b-2 border-primary px-2 text-colorText w-full"
                  />
                  <div className="flex mt-4">
                    <button
                      type="submit"
                      className="w-20 px-2 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={() => setShowEditNumberForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <div className="ml-4 mt-4">
                <div
                  className={showEditNumberForm === false ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Birthday</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    {" "}
                    01/01/1000
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
                      setBirthday({ birth });
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
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={() => setShowEditBirthdayForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <div className="ml-4 mt-4">
                <div
                  className={showEditNumberForm === false ? "block" : "hidden"}
                >
                  <p className="text-lg mb-2">Gender</p>
                  <div className="flex justify-between border-b-2 border-primary px-2 text-colorText">
                    {" "}
                    Male
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
                  <select name="gender" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                  <div className="flex mt-4">
                    <button
                      type="submit"
                      className="w-20 px-2 text-colorText bg-light-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                    >
                      Save
                    </button>
                    <button
                      className="w-20 px-2 text-colorText bg-white border-2 border-primary hover:text-white hover:bg-primary mr-4 rounded-full"
                      onClick={() => setShowEditGenderForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div> */}

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
                      registerFormik.touched.email &&
                      registerFormik.errors.email
                    }
                    disabled
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

                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  className="bg-sky-300 text-xl font-bold rounded-full mt-4 hover:bg-sky-500 hover:text-white py-2"
                  type="submit"
                >
                  Submit
                </LoadingButton>
              </form>
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
                    setExpiration({ expirationDate });
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
    </div>
  );
}
