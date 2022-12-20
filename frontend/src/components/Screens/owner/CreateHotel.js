import * as React from "react"
import * as yup from "yup"
import { useState } from "react"
import { useEffect } from "react"
import _ from "lodash"
import { createHotelApi, getAllProvinces } from "../../../apis/hotelApi"
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
import { getLSItem, redirect } from "../../../utils"
import { HotelCriterias } from "../../../assets/data/HotelCriteriaData"

const validationSchema = yup.object({
  name: yup.string().required("Enter your hotel's name"),
  address: yup.string().required("Enter your hotel's address"),
  description: yup.string().required("Enter the hotel's description"),
  email: yup
    .string()
    .email("Let enter a valid email")
    .required("Enter your email"),
  province: yup.string().required("Province is required"),
  phone: yup.string().required("Phone number is required"),
  phone: yup.string().required("Phone number is required"),
  fromCenter: yup.string().required("This field is required"),
  criteria: yup.array(),
  imgURL: yup.array().required("Image field is required"),
})

export default function CreateHotel() {
  const [isUploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [criterias, setCriterias] = useState([])
  const [all, setAll] = useState()

  let imagesURLs = []
  console.log("all", all)
  const pr = all
  console.log("pr", pr)

  console.log(criterias)

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

    console.log('img urls', imagesURLs)
    formik.values.imgURL = imagesURLs

    setUploading(false)
  }

  useEffect(() => {
    getAllProvinces(setAll)
  }, [])

  const redirectFunc = () => {
    redirect(`${process.env.API_URL}/owner/ListHotelPage`)
  }

  const handleGetHotelInfor = (values) => {
    const token = getLSItem("ownerToken")
    console.log("token", token)
    const createHotel = async (postData) => {
      const response = await createHotelApi(postData, token)
      console.log("response", response)
      console.log("type", typeof response)
      const type = typeof response
      if (type === "object") {
        toast.success("Create a new hotel successfully.")
        setTimeout(redirectFunc, 1000)
      } else {
        console.log("Create a new hotel failed.")
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
      phone: values.phone,
      email: values.email,
      fromCenter: values.fromCenter,
      criteria: values.criteria,
      imgURL: values.imgURL,
    }
    setIsLoading(true)
    createHotel(data)
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      email: "",
      address: "",
      province: "",
      phone: "",
      fromCenter: "",
      criteria: [],
      imgURL: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("value", values)
      handleGetHotelInfor(values)
    },
  })

  return (
    <div>
      <h1 className="font-bold text-2xl m-5">Create a new hotel</h1>
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
              {pr !== undefined &&
                pr.map((p, index) => {
                  return (
                    <MenuItem key={index} value={p.name}>
                      {p.name}
                    </MenuItem>
                  )
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
          <Typography variant="subtitle1">Phone number</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter your hotel's phone number..."
            name="phone"
            value={formik.values.phone}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            onChange={formik.handleChange}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </FormControl>


        <FormControl className="my-2">
          <Typography variant="subtitle1">Email</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter hotel's email..."
            name="email"
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>

        <FormControl className="my-2">
          <Typography variant="subtitle1">Distance to center(m)</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter the distance to center..."
            name="fromCenter"
            value={formik.values.fromCenter}
            error={formik.touched.fromCenter && Boolean(formik.errors.fromCenter)}
            onChange={formik.handleChange}
            helperText={formik.touched.fromCenter && formik.errors.fromCenter}
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
          // helperText={formik.touched.description && formik.errors.description}
          />
        </FormControl>
        <FormLabel>Amenities (select criterias of your hotel)</FormLabel>
        <FormGroup>
          {HotelCriterias.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    name="criteria"
                    value={item.name}
                    checked={criterias.includes(`${item.name}`)}
                    onChange={handleCriteriaChange}
                  />
                }
                label={
                  <Fragment>
                    {item.icon} {item.name}
                  </Fragment>
                }
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
      { }
    </div>
  )
}
