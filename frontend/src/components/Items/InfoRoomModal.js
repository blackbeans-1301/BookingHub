import * as React from "react"
import * as yup from "yup"
import { useState } from "react"
import { useEffect } from "react"
import RestaurantIcon from "@material-ui/icons/Restaurant"
import RoomServiceIcon from "@material-ui/icons/RoomService"
import WifiIcon from "@material-ui/icons/Wifi"
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService"
import CancelIcon from "@material-ui/icons/Cancel"
import CheckIcon from "@material-ui/icons/Check"
import AssignmentIcon from "@material-ui/icons/Assignment"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import ImageIcon from "@material-ui/icons/Image"
import ChatIcon from "@material-ui/icons/Chat"
import HomeWorkIcon from "@material-ui/icons/HomeWork"
import ArtTrackIcon from "@material-ui/icons/ArtTrack"
import KingBedIcon from "@material-ui/icons/KingBed"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"
import BorderColorIcon from "@material-ui/icons/BorderColor"
import UpdateIcon from "@material-ui/icons/Update"
import InfoIcon from "@material-ui/icons/Info"
import TvIcon from "@material-ui/icons/Tv"
import BathtubIcon from "@material-ui/icons/Bathtub"
import WeekendIcon from "@material-ui/icons/Weekend"
import HttpsIcon from "@material-ui/icons/Https"
import SportsCricketIcon from "@material-ui/icons/SportsCricket"
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus"
import TerrainIcon from "@material-ui/icons/Terrain"
import GTranslateIcon from "@material-ui/icons/GTranslate"

import _ from "lodash"
import {
  getAllProvinces,
} from "../../apis/hotelApi"
import { useFormik } from "formik"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"
import { Fragment } from "react"
import {
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  TextareaAutosize,
} from "@mui/material"
import { IMAGE_CLOUD_API } from "../../configs/api"
import ToastMessage from "./ToastMessage"
import {
  GeneralCriteria,
  FBCriteria,
  WifiCriteria,
  RoomServiceCriteria,
  CleaningServiceCriteria,
  BathroomCriteria,
  LivingAreaCriteria,
  SafetyCriteria,
  BedroomCriteria,
  ActivitiCriteria,
  MediaCriteria,
  TransportCriteria,
  ViewCriteria,
  LanguageCriteria,
} from "../../assets/data/RoomCriteriaData"
import { updateRoomInfor } from "../../apis/roomApi"

const validationSchema = yup.object({
  room_name: yup.string().required("Enter your room's name"),
  // address: yup.string().required("Enter your hotel's address"),
  description: yup.string().required("Enter the hotel's description"),
  // province: yup.string().required("Province is required"),
  criteria: yup.string(),
  imgURL: yup.array(),
  // type_of_room: yup.string().required("This field is required"),
  price: yup.string().required("Price is required"),
  number_of_bed: yup.string().required("Number of bed is required"),
})

export default function InfoRoomModal({ isVisible, isClose, detail }) {
  const [progress, setProgress] = useState(0)
  const [isUploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTnC, setAcceptTnC] = useState(false)
  const [criterias, setCriterias] = useState([])
  const [all, setAll] = useState()
  const [province, setProvince] = useState("")
  const [images, setImages] = useState([])
  const [hotelInfor, setHotelInfor] = useState()
  const [imgFile, setImgFile] = useState()
  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index) => {
    setToggleState(index)
  }

  //   const [detail, setDetail] = useState();

  useEffect(() => {
    getAllProvinces(setAll)
  }, [])

  let imagesURLs = []
  const pr = all
  let checkedCriterias = detail.criteria.split(",")
  // console.log("arr criteria", checkedCriterias);

  //   setCriterias(checkedCriterias);
  //   const token = localStorage.getItem("token");
  //   const hotelID = localStorage.getItem("hotelID");

  // change criterias state
  const handleChange = (event) => {
    setAcceptTnC(event.target.checked)
  }

  const handleCriteriaChange = (event) => {
    const index = criterias.indexOf(event.target.value)
    if (index === -1) {
      setCriterias([...criterias, event.target.value])
    } else {
      setCriterias(
        criterias.filter((criteria) => criteria !== event.target.value)
      )
    }
  }

  const handleChangeProvince = (event) => {
    setProvince(event.target.value)
  }

  //   handle upload images
  const handleUpload = async (e) => {
    let { files } = e.target
    console.log("files", files)

    const uploadName = "jqlebxmc"

    let formData = new FormData()

    setUploadedImages([])

    setUploading(true)
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      formData.append("file", file)
      formData.append("upload_preset", uploadName)
      const getImg = fetch(IMAGE_CLOUD_API, {
        method: "POST",
        body: formData,
      })
      setImgFile(getImg)
      getImg.then((res) => res.json()).then((res) => imagesURLs.push(res.url))
    }

    // console.log("img urls", imagesURLs[0].imgURL);
    formik.values.imgURL = imagesURLs

    setUploading(false)
  }

  // console.log("img files", detail.Images[0].imgURL);
  const redirectFunc = () => {
    redirect("http://localhost:8000/owner/ListHotelPage")
  }

  const handleGetHotelInfor = (values) => {
    // const token = localStorage.getItem("token")
    const token = getLSItem('token')
    console.log("token", token)
    const signUp = async (postData) => {
      const response = await updateHotelInfor(postData, token)
      console.log("response", response)
      console.log("type", typeof response)
      const type = typeof response
      if (type == "object") {
        toast.success("Update room details successfully")
        setTimeout(redirectFunc, 3000)
      } else {
        console.log("Update room details failed")
        toast.error(response)
      }
      setIsLoading(false)
    }
    formik.values.criteria = criterias.toString()
    const data = {
      room_id: detail.room_id,
      hotel: {
        hotel_id: detail.Hotel.hotel_id,
      },
      room_name: values.room_name,
      criteria: values.criteria,
      price: values.price,
      number_of_bed: values.number_of_bed,
      description: values.description,
      // address: values.address,
      // type_of_room: values.type_of_room,
      imgURL: values.imgURL,
    }
    setIsLoading(true)
    signUp(data)
  }

  const formik = useFormik({
    initialValues: {
      room_name: detail.room_name,
      description: detail.description,
      // address: detail.Hotel.address,
      price: detail.price,
      // type_of_room: detail.type_of_room,
      number_of_bed: detail.number_of_bed,
      criteria: "",
      imgURL: detail.Images,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("value", values)
      handleGetHotelInfor(values)
    },
  })

  if (!isVisible) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
      <div className="w-11/12 flex flex-col z-20 h-5/6 rounded-2xl">
        <div className="bg-white p-2 rounded flex flex-col m-2 overflow-y-scroll">
          {/* <h1 className="font-bold text-2xl m-5">Update information for a hotel</h1> */}
          <div className="flex justify-between ">
            <h2 className="font-bold text-2xl text-colorText ml-4 mt-2">
              Room {detail.name}
            </h2>

            <button
              className="text-light-close text-lg place-self-end hover:text-close-color"
              onClick={() => isClose()}
            >
              <CancelIcon />
            </button>
          </div>
          <ToastMessage />

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
                <h2>Room details</h2>
              </div>
              <div
                className={
                  toggleState === 2
                    ? "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-white border-b-2 border-primary font-bold"
                    : "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-light-primary"
                }
                onClick={() => toggleTab(2)}
              >
                Edit room details
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
                <h1 className="font-bold text-2xl mb-4">Room's detail</h1>
                <div className="">
                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-stone-700">
                        <ArtTrackIcon />
                      </span>
                      Room's name:
                    </span>{" "}
                    {detail.room_name}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-green-600">
                        <AssignmentIcon />
                      </span>
                      Hotel's name:
                    </span>{" "}
                    {detail.Hotel.name}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-red-500">
                        <LocationOnIcon />
                      </span>
                      Hotel's address:
                    </span>{" "}
                    {detail.Hotel.address}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-stone-700">
                        <MeetingRoomIcon />
                      </span>
                      Room type:
                    </span>{" "}
                    {detail.type_of_room}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-sky-600">
                        <KingBedIcon />
                      </span>
                      Number of bed:
                    </span>{" "}
                    {detail.number_of_bed}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-yellow-500">
                        <LocalOfferIcon />
                      </span>
                      Price:
                    </span>{" "}
                    {detail.price} USD
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-sky-600">
                        <BorderColorIcon />
                      </span>
                      Created at:
                    </span>{" "}
                    {detail.createdAt}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-green-500">
                        <UpdateIcon />
                      </span>
                      Last modified at:
                    </span>{" "}
                    {detail.updatedAt}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2">
                        <ChatIcon />
                      </span>
                      Room's description:
                    </span>{" "}
                    {detail.description}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2">
                        <HomeWorkIcon />
                      </span>
                      Amenities:
                    </span>{" "}
                    <ul className="ml-4">
                      {checkedCriterias.map((item) => (
                        <li>
                          <span className="text-green-500 font-bold mr-1">
                            <CheckIcon />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-stone-500">
                        <ImageIcon />
                      </span>
                      Room's images:
                    </span>{" "}
                    {detail.Images.length != 0 ? (
                      detail.Images.map((item, index) => {
                        return <img src={item.imgURL} className="m-2" />
                      })
                    ) : (
                      <div>This hotel has no images</div>
                    )}
                    {/* <img src={detail.Images} /> */}
                  </div>
                </div>
              </div>

              <div
                className={
                  toggleState === 2
                    ? "bg-white p-5 w-full h-full p-6 transition duration-300 block"
                    : "bg-white p-5 w-full h-full p-6 transition duration-300 hidden"
                }
              >
                <h1 className="font-bold text-2xl mb-4">Edit hotel's detail</h1>
                <form
                  className="flex flex-col m-4"
                  onSubmit={formik.handleSubmit}
                >
                  <FormControl className="my-2">
                    <Typography variant="subtitle1">Hotel's name</Typography>
                    <TextField
                      sx={{
                        height: "85px",
                      }}
                      value={detail.Hotel.name}
                      disabled
                    />
                  </FormControl>

                  <FormControl className="my-2">
                    <Typography variant="subtitle1">Room's name</Typography>
                    <TextField
                      sx={{
                        height: "85px",
                      }}
                      placeholder="Enter your room's name..."
                      name="room_name"
                      value={formik.values.room_name}
                      error={
                        formik.touched.room_name &&
                        Boolean(formik.errors.room_name)
                      }
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.room_name && formik.errors.room_name
                      }
                    />
                  </FormControl>

                  {/* <FormControl className="my-2">
                    <Typography variant="subtitle1">Room's type</Typography>
                    <TextField
                      sx={{
                        height: "85px",
                      }}
                      placeholder="Enter your hotel's type..."
                      name="type_of_room"
                      value={formik.values.type_of_room}
                      error={
                        formik.touched.type_of_room &&
                        Boolean(formik.errors.type_of_room)
                      }
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.type_of_room &&
                        formik.errors.type_of_room
                      }
                    />
                  </FormControl> */}

                  <FormControl className="my-2">
                    <Typography variant="subtitle1">Number of beds</Typography>
                    <TextField
                      sx={{
                        height: "85px",
                      }}
                      placeholder="Enter the number of beds..."
                      name="number_of_bed"
                      value={formik.values.number_of_bed}
                      error={
                        formik.touched.number_of_bed &&
                        Boolean(formik.errors.number_of_bed)
                      }
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.number_of_bed &&
                        formik.errors.number_of_bed
                      }
                    />
                  </FormControl>

                  <FormControl className="my-2">
                    <Typography variant="subtitle1">
                      Price for a night
                    </Typography>
                    <TextField
                      sx={{
                        height: "85px",
                      }}
                      placeholder="Enter the price for a night..."
                      name="price"
                      value={formik.values.price}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      onChange={formik.handleChange}
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </FormControl>

                  <FormControl className="my-2">
                    <Typography variant="subtitle1">
                      Hotel's description
                    </Typography>
                    <TextareaAutosize
                      sx={{
                        height: "85px",
                      }}
                      style={{
                        border: "1px solid black",
                        padding: "4px",
                        paddingLeft: "6px",
                      }}
                      minRows={3}
                      placeholder="Enter your hotel's description..."
                      name="description"
                      value={formik.values.description}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </FormControl>

                  <FormLabel>
                    Amenities (select criterias of your hotel)
                  </FormLabel>
                  <FormGroup>
                    <p className="font-bold">
                      <InfoIcon />
                      <span className="ml-2">General</span>
                    </p>
                    {GeneralCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <RestaurantIcon />
                      Food & Drink
                    </p>

                    {FBCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <WifiIcon />
                      Internet
                    </p>

                    {WifiCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <RoomServiceIcon />
                      Reception services
                    </p>

                    {RoomServiceCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <LocalLaundryServiceIcon />
                      Cleaning services
                    </p>

                    {CleaningServiceCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <BathtubIcon />
                      Bathroom
                    </p>

                    {BathroomCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <WeekendIcon />
                      Living Area
                    </p>

                    {LivingAreaCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <HttpsIcon />
                      Safety & Security
                    </p>

                    {SafetyCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <KingBedIcon />
                      Bedroom
                    </p>

                    {BedroomCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <SportsCricketIcon />
                      Activities
                    </p>

                    {ActivitiCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <TvIcon />
                      Media & Technology
                    </p>

                    {MediaCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <DirectionsBusIcon />
                      Transport
                    </p>

                    {TransportCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <TerrainIcon />
                      View
                    </p>

                    {ViewCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}

                    <p className="font-bold">
                      <GTranslateIcon />
                      Languages spoken
                    </p>

                    {LanguageCriteria.map((item, index) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={item.id}
                              checked={criterias.includes(`${item.id}`)}
                              onChange={handleCriteriaChange}
                            />
                          }
                          label={<Fragment>{item.name}</Fragment>}
                        />
                      )
                    })}
                  </FormGroup>

                  <FormControl className="my-2">
                    <Typography variant="subtitle1">Hotel's imgURL</Typography>
                    <input
                      type="file"
                      onChange={handleUpload}
                      // hidden
                      multiple
                      size="50"
                    />
                  </FormControl>

                  <LoadingButton
                    type="submit"
                    loading={isLoading}
                    variant="contained"
                    className="bg-sky-300 text-xl font-bold rounded-full mt-4 hover:bg-sky-500 hover:text-white py-2"
                  >
                    Send
                  </LoadingButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
