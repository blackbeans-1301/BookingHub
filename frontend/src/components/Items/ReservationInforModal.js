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
import { getAllProvinces } from "../../apis/hotelApi"
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
import { updateRoomInfor, updateHotelInfor } from "../../apis/roomApi"
import { redirect, getLSItem, setLSItem } from "../../utils"
import { ListItem } from "@material-ui/core"

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

export default function ReservationInforModal({ isVisible, isClose, detail }) {
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
    redirect(`${process.env.API_URL}/owner/ListHotelPage`)
  }

  const handleGetHotelInfor = (values) => {
    // const token = localStorage.getItem("token")
    const token = getLSItem("ownerToken")
    console.log("token", token)
    const signUp = async (postData) => {
      const response = await updateHotelInfor(postData, token)
      console.log("response", response)
      console.log("type", typeof response)
      const type = typeof response
      if (type === "object") {
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
      //   room_id: detail.room_id,
      hotel: {
        // hotel_id: detail.Hotel.hotel_id,
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
      //   room_name: detail.room_name,
      //   description: detail.description,
      // address: detail.Hotel.address,
      //   price: detail.price,
      // type_of_room: detail.type_of_room,
      //   number_of_bed: detail.number_of_bed,
      criteria: "",
      //   imgURL: detail.Images,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("value", values)
      handleGetHotelInfor(values)
    },
  })

  console.log('detail', detail)

  if (!isVisible) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
      <div className="w-11/12 flex flex-col z-20 h-5/6 rounded-2xl">
        <div className="bg-white p-2 rounded flex flex-col m-2 overflow-y-scroll">
          {/* <h1 className="font-bold text-2xl m-5">Update information for a hotel</h1> */}
          <div className="flex justify-between ">
            <h2 className="font-bold text-2xl text-colorText ml-4 mt-2">
              Reservation Details
            </h2>

            <button
              className="text-light-close text-lg place-self-end hover:text-close-color"
              onClick={() => isClose()}
            >
              <CancelIcon />
            </button>
          </div>
          <ToastMessage />

          <div className="flex flex-col relative w-screen md:w-auto w-full break-all border-2 m-4">
            <div className="border-2 border-sky-300 flex">
              <div className="flex-1 flex flex-col">
                <div className="flex flex-col m-2">
                  <span className="text-sm">Check in: </span>
                  <span className="text-lg font-bold text-sky-600">
                    {detail.check_in != null ? detail.check_in : "___"}
                  </span>
                </div>

                <div className="flex flex-col m-2">
                  <span className="text-sm">Check out: </span>
                  <span className="text-lg font-bold text-sky-600">
                    {detail.check_out != null ? detail.check_out : "___"}
                  </span>
                </div>

                <div className="flex flex-col m-2">
                  <span className="text-sm">Date in (expected): </span>
                  <span className="text-lg font-bold text-sky-600">{detail.date_in}</span>
                </div>

                <div className="flex flex-col m-2">
                  <span className="text-sm">Date out (expected): </span>
                  <span className="text-lg font-bold text-sky-600">{detail.date_out}</span>
                </div>

                <div className="flex flex-col m-2">
                  <span className="text-sm">Total rooms: </span>
                  <span className="text-lg font-bold text-sky-600">{detail.number_of_rooms}</span>
                </div>
              </div>
              <div className="flex3">
                <div className="flex flex-col m-2">
                  <span className="text-sm">Guest's name: </span>
                  <span className="text-lg font-bold text-sky-600">{detail.name}</span>
                </div>
                <div className="flex flex-col m-2">
                  <span className="text-sm">Guest's email: </span>
                  <span className="text-lg font-bold text-sky-600">{detail.email}</span>
                </div>

                <div className="flex">
                  <div className="flex flex-col mr-8">
                    <div className="flex flex-col m-2">
                      <span className="text-sm">Booking number: </span>
                      <span className="text-lg font-bold text-sky-600">{detail.phone}</span>
                    </div>

                    <div className="flex flex-col m-2">
                      <span className="text-sm">Status: </span>
                      <span className="text-lg font-bold text-sky-600">{detail.status}</span>
                    </div>
                  </div>

                  <div className="flex flex-col ml-8">
                    <div className="flex flex-col m-2">
                      <span className="text-sm">Reservation id: </span>
                      <span className="text-lg font-bold text-sky-600">{detail.reservation_id}</span>
                    </div>

                    <div className="flex flex-col m-2">
                      <span className="text-sm">Price: </span>
                      <span className="text-lg font-bold text-sky-600">100$</span>
                    </div>

                    <div className="flex flex-col m-2">
                      <span className="text-sm">Discount: </span>
                      <span className="text-lg font-bold text-green-600">20%</span>
                    </div>

                    <div className="flex flex-col m-2 justify-end">
                      <span className="text-lg font-semibold text-green-600">
                        Total price:{" "}
                      </span>
                      <span className="text-xl font-bold">80$</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
