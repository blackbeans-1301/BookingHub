import * as React from "react"
import * as yup from "yup"
import { useState } from "react"
import { useEffect } from "react"
import RestaurantIcon from "@material-ui/icons/Restaurant"
import RoomServiceIcon from "@material-ui/icons/RoomService"
import WifiIcon from "@material-ui/icons/Wifi"
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService"
import InfoIcon from "@material-ui/icons/Info"
import TvIcon from "@material-ui/icons/Tv"
import BathtubIcon from "@material-ui/icons/Bathtub"
import WeekendIcon from "@material-ui/icons/Weekend"
import HttpsIcon from "@material-ui/icons/Https"
import KingBedIcon from "@material-ui/icons/KingBed"
import SportsCricketIcon from "@material-ui/icons/SportsCricket"
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus"
import TerrainIcon from "@material-ui/icons/Terrain"
import GTranslateIcon from "@material-ui/icons/GTranslate"
import _ from "lodash"
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
import { createRoomApi } from "../../../apis/roomApi"
import { getAllHotels } from "../../../apis/hotelApi"
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
} from "../../../assets/data/RoomCriteriaData"
import { getLSItem, redirect, setLSItem } from "../../../utils"


const validationSchema = yup.object({
  hotel: yup
    .object({
      Images: yup.array(),
      address: yup.string(),
      criteria: yup.string(),
      description: yup.string(),
      hotel_id: yup.string(),
      name: yup.string(),
      province: yup.string(),
      rating: yup.string(),
    })
    .required("This field is required"),
  room_name: yup.string().required("Enter your room's name"),
  type_of_room: yup.string().required("Enter your room's type"),
  number_of_bed: yup
    .number()
    .integer()
    .min(0)
    .required("This field is required"),
  price: yup.number().min(0).required("This field is required"),
  criteria: yup.string(),
  description: yup.string().required("This field is required"),
  imgURL: yup.array().required("Image field is required"),
})

export default function CreateRoom() {
  const [progress, setProgress] = useState(0)
  const [isUploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTnC, setAcceptTnC] = useState(false)
  const [criterias, setCriterias] = useState([])
  const [allHotels, setAllHotels] = useState()
  const [province, setProvince] = useState("")
  const [images, setImages] = useState([])

  let imagesURLs = []
  const ownerToken = getLSItem("token")
  //   console.log("owner token", ownerToken);
  useEffect(() => {
    getAllHotels(setAllHotels, ownerToken)
  }, [])
  console.log("all hotels", allHotels)
  console.log(criterias)

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

  const test = "email:a@gmail.com"
  const redirectFunc = () => {
    redirect(`${process.env.API_URL}/owner/ListRoomPage`)
  }

  const handleGetRoomInfor = (values) => {
    const token = getLSItem("token")
    console.log("token", token)
    const signUp = async (postData) => {
      const response = await createRoomApi(postData, token)
      console.log("response", response)
      console.log("type", typeof response)
      const type = typeof response
      if (type === "object") {
        toast.success("Create a new room successfully")
        setTimeout(redirectFunc, 3000)
      } else {
        console.log("Create a new room failed")
        toast.error(response)
      }
      setIsLoading(false)
    }

    const hotelID = 0
    formik.values.criteria = criterias.toString()
    const data = {
      hotel: values.hotel,
      room_name: values.room_name,
      criteria: values.criteria,
      number_of_bed: values.number_of_bed,
      type_of_room: values.type_of_room,
      price: values.price,
      description: values.description,
      imgURL: values.imgURL,
    }
    setIsLoading(true)
    signUp(data)
  }

  const formik = useFormik({
    initialValues: {
      hotel: "",
      room_name: "",
      criteria: "",
      number_of_bed: "",
      type_of_room: "",
      price: "",
      description: "",
      imgURL: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("value", values)
      handleGetRoomInfor(values)
    },
  })

  return (
    <div>
      <h1 className="font-bold text-2xl m-5">Create a new room</h1>
      <ToastMessage />
      <form className="flex flex-col m-4" onSubmit={formik.handleSubmit}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Hotel's name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.hotel}
              name="hotel"
              label="Hotel's name"
              onChange={formik.handleChange}
              error={formik.touched.hotel && !!formik.errors.hotel}
            >
              {allHotels !== undefined &&
                allHotels.map((p) => {
                  return <MenuItem value={p}>{p.name}</MenuItem>
                })}
            </Select>
          </FormControl>
        </Box>

        <FormControl className="my-2">
          <Typography variant="subtitle1">Room's name</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter your room's name..."
            name="room_name"
            value={formik.values.room_name}
            error={formik.touched.room_name && Boolean(formik.errors.room_name)}
            onChange={formik.handleChange}
            helperText={formik.touched.room_name && formik.errors.room_name}
          />
        </FormControl>

        <FormControl className="my-2">
          <Typography variant="subtitle1">Room's type</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter your hotel's type..."
            name="type_of_room"
            value={formik.values.type_of_room}
            error={
              formik.touched.type_of_room && Boolean(formik.errors.type_of_room)
            }
            onChange={formik.handleChange}
            helperText={
              formik.touched.type_of_room && formik.errors.type_of_room
            }
          />
        </FormControl>

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
              formik.touched.number_of_bed && formik.errors.number_of_bed
            }
          />
        </FormControl>

        <FormControl className="my-2">
          <Typography variant="subtitle1">Price for a night</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter the price for a night..."
            name="price"
            value={formik.values.price}
            error={formik.touched.price && Boolean(formik.errors.price)}
            onChange={formik.handleChange}
            helperText={formik.touched.price && formik.errors.price}
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
  )
}
