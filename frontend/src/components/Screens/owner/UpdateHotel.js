import * as React from "react"
import * as yup from "yup"
import { useState } from "react"
import { useEffect } from "react"
import PoolIcon from "@material-ui/icons/Pool"
import SpaIcon from "@material-ui/icons/Spa"
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter"
import RestaurantIcon from "@material-ui/icons/Restaurant"
import FireplaceIcon from "@material-ui/icons/Fireplace"
import RoomServiceIcon from "@material-ui/icons/RoomService"
import WifiIcon from "@material-ui/icons/Wifi"
import AcUnitIcon from "@material-ui/icons/AcUnit"
import LocalParkingIcon from "@material-ui/icons/LocalParking"
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle"
import PetsIcon from "@material-ui/icons/Pets"
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast"
import KitchenIcon from "@material-ui/icons/Kitchen"
import FastfoodIcon from "@material-ui/icons/Fastfood"
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService"
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard"
import StorefrontIcon from "@material-ui/icons/Storefront"
import GolfCourseIcon from "@material-ui/icons/GolfCourse"
import LocalFloristIcon from "@material-ui/icons/LocalFlorist"
import DeckIcon from "@material-ui/icons/Deck"
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill"
import LocalAtmIcon from "@material-ui/icons/LocalAtm"
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar"
import WavesIcon from "@material-ui/icons/Waves"
import LocationCityIcon from "@material-ui/icons/LocationCity"
import NatureIcon from "@material-ui/icons/Nature"
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu"
import ChildCareIcon from "@material-ui/icons/ChildCare"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import API from "../../../services/service"
import _ from "lodash"
import {
  createHotelApi,
  getAllProvinces,
  getHotelById,
} from "../../../apis/hotelApi"
import { Field, useFormik, Form, Formik } from "formik"
import FormControl from "@material-ui/core/FormControl"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { LoadingButton } from "@mui/lab"
import { toast } from "react-toastify"
import { Fragment } from "react"
import {
  Box,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  TextareaAutosize,
} from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { IMAGE_CLOUD_API } from "../../../configs/api"
import ToastMessage from "../../Items/ToastMessage"

const validationSchema = yup.object({
  name: yup.string().required("Enter your hotel's name"),
  address: yup.string().required("Enter your hotel's address"),
  description: yup.string().required("Enter the hotel's description"),
  province: yup.string().required("Province is required"),
  criteria: yup.string(),
  imgURL: yup.array().required("Image field is required"),
})

export default function UpdateHotel() {
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

  let imagesURLs = []
  console.log("all", all)
  const pr = all
  console.log("pr", pr)

  console.log(criterias)

  let token
  let hotelID
  // const isBrowser = typeof window !== "undefined" && window
  // if (isBrowser) {
  //   token = localStorage.getItem("token")
  //   hotelID = localStorage.getItem("hotelID")
  // }

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
      fetch(IMAGE_CLOUD_API, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => imagesURLs.push(res.url))
    }

    console.log("img urls", imagesURLs)
    formik.values.imgURL = imagesURLs

    setUploading(false)
  }

  useEffect(() => {
    getAllProvinces(setAll)
  }, [])

  const redirectFunc = () => {
    // const isBrowser = typeof window !== "undefined" && window
    // if (isBrowser)
    //   window.location = "http://localhost:8000/owner/ListHotelPage"
  }

  const handleGetHotelInfor = (values) => {
    let token
    // const isBrowser = typeof window !== "undefined" && window
    // if (isBrowser) {
    //   token = localStorage.getItem("token")
    // }
    console.log("token", token)
    const signUp = async (postData) => {
      const response = await createHotelApi(postData, token)
      console.log("response", response)
      console.log("type", typeof response)
      const type = typeof response
      if (type == "object") {
        toast.success("Sign up successfully")
        setTimeout(redirectFunc, 3000)
      } else {
        console.log("Sign up failed")
        toast.error(response)
      }
      setIsLoading(false)
    }
    formik.values.criteria = criterias.toString()
    const data = {
      name: values.name,
      description: values.description,
      address: values.address,
      province: values.province,
      criteria: values.criteria,
      imgURL: values.imgURL,
    }
    setIsLoading(true)
    signUp(data)
  }

  useEffect(() => {
    getHotelById(hotelID, setHotelInfor, token)
  }, [])

  console.log("hotel infor", hotelInfor)

  const formik = useFormik({
    initialValues: {
      name: hotelInfor.name,
      description: hotelInfor.description,
      address: hotelInfor.address,
      province: hotelInfor.province,
      criteria: hotelInfor.criteria,
      imgURL: hotelInfor.Images,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("value", values)
      handleGetHotelInfor(values)
    },
  })

  return (
    <div className="">
      <h1 className="font-bold text-2xl m-5">Update information for a hotel</h1>
      <ToastMessage />
      <form className="flex flex-col m-4" onSubmit={formik.handleSubmit}>
        <FormControl className="my-2">
          <Typography variant="subtitle1">Hotel's name</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter your hotel's name..."
            name="name"
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            onChange={formik.handleChange}
            helperText={formik.touched.name && formik.errors.name}
          />
        </FormControl>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Province</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.province}
              name="province"
              label="Province"
              onChange={formik.handleChange}
              error={formik.touched.province && !!formik.errors.province}
            >
              {pr != undefined &&
                pr.map((p) => {
                  return <MenuItem value={p.name}>{p.name}</MenuItem>
                })}
            </Select>
          </FormControl>
        </Box>

        <FormControl className="my-2">
          <Typography variant="subtitle1">Address</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter your hotel's address..."
            name="address"
            value={formik.values.address}
            error={formik.touched.address && Boolean(formik.errors.address)}
            onChange={formik.handleChange}
            helperText={formik.touched.address && formik.errors.address}
          />
        </FormControl>

        <FormControl className="my-2">
          <Typography variant="subtitle1">Hotel's description</Typography>
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
              formik.touched.description && Boolean(formik.errors.description)
            }
            onChange={formik.handleChange}
            helperText={formik.touched.description && formik.errors.description}
          />
        </FormControl>
        <FormLabel>Amenities (select criterias of your hotel)</FormLabel>
        <FormGroup>
          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="fire-extinguisher"
                  checked={criterias.includes("fire-extinguisher")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <FireplaceIcon /> Fire extinguisher
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="air-conditioned"
                  checked={criterias.includes("air-conditioned")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <AcUnitIcon /> Air-conditioned
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="Elevator"
                  checked={criterias.includes("Elevator")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <SwapVerticalCircleIcon /> Elevator
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="pet-allowed"
                  checked={criterias.includes("pet-allowed")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <PetsIcon /> Pets allowed
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="outdoor-pool"
                  checked={criterias.includes("outdoor-pool")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <PoolIcon /> Outdoor-pool
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="indoor-pool"
                  checked={criterias.includes("indoor-pool")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <PoolIcon /> Indoor pool
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="spa"
                  checked={criterias.includes("spa")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <SpaIcon /> Spa and wellness center
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="fitness"
                  checked={criterias.includes("fitness")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <FitnessCenterIcon /> Fitness center
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="restaurant"
                  checked={criterias.includes("restaurant")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <RestaurantIcon />
                  Restaurant
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="bar"
                  checked={criterias.includes("bar")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <RestaurantIcon /> Bar/ Lounge
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="room-service"
                  checked={criterias.includes("room-service")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <RoomServiceIcon /> Room service
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="wifi"
                  checked={criterias.includes("wifi")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <WifiIcon /> Free wifi
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="coffee-shop"
                  checked={criterias.includes("coffee-shop")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <FreeBreakfastIcon /> Coffee shop
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="free-parking"
                  checked={criterias.includes("free-parking")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <LocalParkingIcon /> Free parking
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="minibar"
                  checked={criterias.includes("minibar")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <KitchenIcon /> Minibar
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="snack-bar"
                  checked={criterias.includes("snack-bar")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <FastfoodIcon /> Snack bar
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="shop"
                  checked={criterias.includes("shop")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <StorefrontIcon /> Shops on site
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="golf"
                  checked={criterias.includes("golf")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <GolfCourseIcon /> Golf
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="ironing"
                  checked={criterias.includes("ironing")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <LocalLaundryServiceIcon /> Ironing service
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="gift-shop"
                  checked={criterias.includes("gift-shop")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <CardGiftcardIcon /> Gift shop
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="garden"
                  checked={criterias.includes("garden")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <LocalFloristIcon /> Garden
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="terrace"
                  checked={criterias.includes("terrace")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <DeckIcon /> Terrace/ Patio
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="atm"
                  checked={criterias.includes("atm")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <LocalAtmIcon /> ATM on-site
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="car-rental"
                  checked={criterias.includes("car-rental")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <DirectionsCarIcon /> Car rental
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="grill"
                  checked={criterias.includes("grill")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <OutdoorGrillIcon /> Grill
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="lake-view"
                  checked={criterias.includes("lake-view")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <WavesIcon /> Lake view
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="city-view"
                  checked={criterias.includes("city-view")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <LocationCityIcon /> City view
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="playground"
                  checked={criterias.includes("playground")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <NatureIcon /> Playground
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="buffet"
                  checked={criterias.includes("buffet")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <RestaurantMenuIcon /> Buffet
                </Fragment>
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="childcare"
                  checked={criterias.includes("childcare")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <ChildCareIcon /> Babysitting or childcare
                </Fragment>
              }
            />
          </div>

          <div className="flex">
            <FormControlLabel
              control={
                <Checkbox
                  value="other"
                  checked={criterias.includes("other")}
                  onChange={handleCriteriaChange}
                />
              }
              label={
                <Fragment>
                  <MoreHorizIcon /> Others
                </Fragment>
              }
            />
          </div>
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
  )
}
