import * as React from "react";
import * as yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import PoolIcon from "@material-ui/icons/Pool";
import SpaIcon from "@material-ui/icons/Spa";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import FireplaceIcon from "@material-ui/icons/Fireplace";
import RoomServiceIcon from "@material-ui/icons/RoomService";
import WifiIcon from "@material-ui/icons/Wifi";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import PetsIcon from "@material-ui/icons/Pets";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import KitchenIcon from "@material-ui/icons/Kitchen";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import StorefrontIcon from "@material-ui/icons/Storefront";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import LocalFloristIcon from "@material-ui/icons/LocalFlorist";
import DeckIcon from "@material-ui/icons/Deck";
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import WavesIcon from "@material-ui/icons/Waves";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import NatureIcon from "@material-ui/icons/Nature";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import GTranslateIcon from "@material-ui/icons/GTranslate";
import TerrainIcon from "@material-ui/icons/Terrain";
import TvIcon from "@material-ui/icons/Tv";
import KingBedIcon from "@material-ui/icons/KingBed";
import HttpsIcon from "@material-ui/icons/Https";
import SportsCricketIcon from "@material-ui/icons/SportsCricket";
import WeekendIcon from "@material-ui/icons/Weekend";
import BathtubIcon from "@material-ui/icons/Bathtub";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InfoIcon from "@material-ui/icons/Info";
import API from "../../../pages/owner/service";
import _ from "lodash";
import { createHotelApi, getAllProvinces } from "../../../apis/hotelApi";
import { Field, useFormik, Form, Formik } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { Fragment } from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  TextareaAutosize,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IMAGE_CLOUD_API } from "../../../configs/api";
import ToastMessage from "../../Items/ToastMessage";
import { createRoomApi } from "../../../apis/roomApi";
import { getAllHotels } from "../../../apis/hotelApi";

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
//   type: yup.string().required("Enter your room's type"),
number_of_bed: yup.number().integer().min(0).required("This field is required"),
  price: yup.number().min(0).required("This field is required"),
//   description: yup.string().required("This field is required"),
  imgURL: yup.array().required("Image field is required"),
});

export default function CreateRoom() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTnC, setAcceptTnC] = useState(false);
  const [criterias, setCriterias] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [province, setProvince] = useState("");
  const [images, setImages] = useState([]);

  let imagesURLs = [];
  //   console.log("all", all);
  //   const pr = all;
  //   console.log("pr", pr);

  const ownerToken = localStorage.getItem("token");
//   console.log("owner token", ownerToken);
  useEffect(() => {
    getAllHotels(setAllHotels, ownerToken);
  }, []);
  console.log('all hotels', allHotels);
  console.log(criterias);

  // change criterias state
  const handleChange = (event) => {
    setAcceptTnC(event.target.checked);
  };

  const handleCriteriaChange = (event) => {
    const index = criterias.indexOf(event.target.value);
    if (index === -1) {
      setCriterias([...criterias, event.target.value]);
    } else {
      setCriterias(
        criterias.filter((criteria) => criteria !== event.target.value)
      );
    }
  };

  //   const handleChangeProvince = (event) => {
  //     setProvince(event.target.value);
  //   };

  //   handle upload images
  const handleUpload = async (e) => {
    let { files } = e.target;
    console.log("files", files);

    const uploadName = "jqlebxmc";

    let formData = new FormData();

    setUploadedImages([]);

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", uploadName);
      fetch(IMAGE_CLOUD_API, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => imagesURLs.push(res.url));
    }

    console.log("img urls", imagesURLs);
    formik.values.imgURL = imagesURLs;

    setUploading(false);
  };

  const redirectFunc = () => {
    window.location = "http://localhost:8000/owner/ListRoomPage";
  };

  const handleGetRoomInfor = (values) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const signUp = async (postData) => {
      const response = await createRoomApi(postData, token);
      console.log("response", response);
      console.log("type", typeof response);
      const type = typeof response;
      if (type == "object") {
        toast.success("Sign up successfully");
        setTimeout(redirectFunc, 3000);
      } else {
        console.log("Sign up failed");
        toast.error(response);
      }
      setIsLoading(false);
    }; 

    const hotelID = 0;
    formik.values.criteria = criterias.toString();
    const data = {
      hotel_id: values.hotel.hotel_id,
      room_name: values.hotel_name,
      criteria: values.criteria,
      number_of_bed: values.number_of_bed,
      price: values.price,
      imgURL: values.imgURL,
    };
    setIsLoading(true);
    signUp(data);
  };

  const formik = useFormik({
    initialValues: {
        hotel_id: "",
        room_name: "",
        criteria: "",
        price: "",
        number_of_bed: "",
        // description: "",
        imgURL: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("value", values);
      handleGetRoomInfor(values);
    },
  });

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
              {allHotels != undefined &&
                allHotels.map((p) => {
                  return <MenuItem value={p}>{p.name}</MenuItem>;
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

        {/* <FormControl className="my-2">
          <Typography variant="subtitle1">Room's type</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter your hotel's type..."
            name="type"
            value={formik.values.type}
            error={formik.touched.type && Boolean(formik.errors.type)}
            onChange={formik.handleChange}
            helperText={formik.touched.type && formik.errors.type}
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
            error={formik.touched.number_of_bed && Boolean(formik.errors.number_of_bed)}
            onChange={formik.handleChange}
            helperText={formik.touched.number_of_bed && formik.errors.number_of_bed}
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

        {/* <FormControl className="my-2">
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
        </FormControl> */}
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
  );
}

{
  /* <div>
        <h1 className="font-bold text-2xl m-5">Create a new room</h1>

        <form>
          <div className="shadow-xl rounded-2xl bg-sky-100 ml-5 mr-5 p-2">
            <div className="m-4 flex">
              <p className="text-colorText w-40 h-4">Room's name</p>
              <input
                type="text"
                placeholder="Enter your hotel's name..."
                className="p-1 pl-2 flex-1 rounded-md"
              />
            </div>

            <div className="m-4 flex">
              <p className="text-colorText w-40 h-4">Hotel's name</p>
              <input
                type="text"
                placeholder="Enter your hotel's name..."
                className="p-1 pl-2 flex-1 rounded-md"
              />
            </div>

            <div className="m-4 flex">
              <p className="text-colorText w-40 h-4">Address</p>
              <input
                type="text"
                placeholder="Enter your hotel's type..."
                className="p-1 pl-2 flex-1 rounded-md"
              />
            </div>

            <div className="m-4 flex">
              <p className="text-colorText w-40 h-4">Room type</p>
              <input
                type="text"
                placeholder="Enter the room type..."
                className="p-1 pl-2 flex-1 rounded-md"
              />
            </div>

            <div className="m-4 flex">
              <p className="text-colorText w-40 h-4">Number of beds</p>
              <input
                type="text"
                placeholder="Enter the number of beds..."
                className="p-1 pl-2 flex-1 rounded-md"
              />
            </div>

            <div className="m-4 flex">
              <p className="text-colorText w-40 h-4">Price for a night</p>
              <input
                type="text"
                placeholder="Enter the price for a night..."
                className="p-1 pl-2 flex-1 rounded-md"
              />
            </div>

            <div className="m-4 block">
              <p className="text-colorText mb-4 font-bold">
                Amenities{" "}
                <span className="">(select amenities of your hotel)</span>
              </p>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <InfoIcon />
                  <span className="ml-2">General</span>
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="shuttle-service"
                      name="shuttle-service"
                      value="shuttle-service"
                    />
                    <label
                      for="shuttle-service"
                      className="text-colorText ml-2"
                    >
                      {" "}
                      Shuttle service
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="air-conditioned"
                      name="air-conditioned"
                      value="air-conditioned"
                    />
                    <label
                      for="air-conditioned"
                      className="text-colorText ml-2"
                    >
                      {" "}
                      Air-conditioned
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="floor"
                      name="floor"
                      value="floor"
                    />
                    <label for="floor" className="text-colorText ml-2">
                      {" "}
                      Hardwood or parquet floor
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="heating"
                      name="heating"
                      value="heating"
                    />
                    <label for="heating" className="text-colorText ml-2">
                      {" "}
                      Heating
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="soundproofing"
                      name="soundproofing"
                      value="soundproofing"
                    />
                    <label for="soundproofing" className="text-colorText ml-2">
                      {" "}
                      Soundproofing
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="car-hire"
                      name="car-hire"
                      value="car-hire"
                    />
                    <label for="car-hire" className="text-colorText ml-2">
                      {" "}
                      Car hire
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="laptop-safe"
                      name="laptop-safe"
                      value="laptop-safe"
                    />
                    <label for="laptop-safe" className="text-colorText ml-2">
                      {" "}
                      Laptop safe
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input type="checkbox" id="lift" name="lift" value="lift" />
                    <label for="lift" className="text-colorText ml-2">
                      {" "}
                      Lift
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="family-room"
                      name="family-room"
                      value="family-room"
                    />
                    <label for="family-room" className="text-colorText ml-2">
                      {" "}
                      Family room
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="ironing-facilities"
                      name="ironing-facilities"
                      value="ironing-facilities"
                    />
                    <label
                      for="ironing-facilities"
                      className="text-colorText ml-2"
                    >
                      {" "}
                      Ironing facilities
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="airport-shuttle"
                      name="airport-shuttle"
                      value="airport-shuttle"
                    />
                    <label
                      for="airport-shuttle"
                      className="text-colorText ml-2"
                    >
                      {" "}
                      Airport shuttle
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="non-smoking-room"
                      name="non-smoking-room"
                      value="non-smoking-room"
                    />
                    <label
                      for="non-smoking-room"
                      className="text-colorText ml-2"
                    >
                      {" "}
                      Non-smoking room
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <RestaurantIcon />
                  Food & Drink
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="breakfast"
                      name="breakfast"
                      value="breakfast"
                    />
                    <label for="breakfast" className="text-colorText ml-2">
                      {" "}
                      Breakfast
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="restaurant"
                      name="restaurant"
                      value="restaurant"
                    />
                    <label for="restaurant" className="text-colorText ml-2">
                      {" "}
                      Restaurant
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="minibar"
                      name="minibar"
                      value="minibar"
                    />
                    <label for="minibar" className="text-colorText ml-2">
                      {" "}
                      Minibar
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="snackbar"
                      name="snackbar"
                      value="snackbar"
                    />
                    <label for="snackbar" className="text-colorText ml-2">
                      {" "}
                      Snack bar
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <WifiIcon />
                  Internet
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input type="checkbox" id="wifi" name="wifi" value="wifi" />
                    <label for="wifi" className="text-colorText ml-2">
                      {" "}
                      Wifi is available
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <RoomServiceIcon />
                  Reception services
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="concierge"
                      name="concierge"
                      value="concierge"
                    />
                    <label for="concierge" className="text-colorText ml-2">
                      {" "}
                      Concierge service
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="luggage"
                      name="luggage"
                      value="luggage"
                    />
                    <label for="luggage" className="text-colorText ml-2">
                      {" "}
                      Luggage storage
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="tour-desk"
                      name="tour-desk"
                      value="tour-desk"
                    />
                    <label for="tour-desk" className="text-colorText ml-2">
                      {" "}
                      Tour desk
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="currency-exchange"
                      name="currency-exchange"
                      value="currency-exchange"
                    />
                    <label
                      for="currency-exchange"
                      className="text-colorText ml-2"
                    >
                      {" "}
                      Currency exchange
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="lockers"
                      name="lockers"
                      value="lockers"
                    />
                    <label for="lockers" className="text-colorText ml-2">
                      {" "}
                      Lockers
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input type="checkbox" id="24h" name="24h" value="24h" />
                    <label for="24h" className="text-colorText ml-2">
                      {" "}
                      24-hour front desk
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="private"
                      name="private"
                      value="private"
                    />
                    <label for="private" className="text-colorText ml-2">
                      {" "}
                      Private check-in/ check-out
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="express"
                      name="express"
                      value="express"
                    />
                    <label for="express" className="text-colorText ml-2">
                      {" "}
                      Express check-in/ check-out
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <LocalLaundryServiceIcon />
                  Cleaning services
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="ironing"
                      name="ironing"
                      value="ironing"
                    />
                    <label for="ironing" className="text-colorText ml-2">
                      {" "}
                      Ironing service
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="dry-cleaning"
                      name="dry-cleaning"
                      value="dry-cleaning"
                    />
                    <label for="dry-cleaning" className="text-colorText ml-2">
                      {" "}
                      Dry cleaning
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="laundry"
                      name="laundry"
                      value="laundry"
                    />
                    <label for="laundry" className="text-colorText ml-2">
                      {" "}
                      Laundry
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="housekeeping"
                      name="housekeeping"
                      value="housekeeping"
                    />
                    <label for="housekeeping" className="text-colorText ml-2">
                      {" "}
                      Daily housekeeping
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="laundry"
                      name="laundry"
                      value="laundry"
                    />
                    <label for="laundry" className="text-colorText ml-2">
                      {" "}
                      Laundry
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="trouser"
                      name="trouser"
                      value="trouser"
                    />
                    <label for="trouser" className="text-colorText ml-2">
                      {" "}
                      Trouser press
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <BathtubIcon />
                  Bathroom
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="toilet-paper"
                      name="toilet-paper"
                      value="toilet-paper"
                    />
                    <label for="toilet-paper" className="text-colorText ml-2">
                      {" "}
                      Toilet paper
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="towel"
                      name="towel"
                      value="towel"
                    />
                    <label for="towel" className="text-colorText ml-2">
                      {" "}
                      Towels
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="bidet"
                      name="bidet"
                      value="bidet"
                    />
                    <label for="bidet" className="text-colorText ml-2">
                      {" "}
                      Bidet
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="slipper"
                      name="slipper"
                      value="slipper"
                    />
                    <label for="slipper" className="text-colorText ml-2">
                      {" "}
                      Slippers
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="private-bathroom"
                      name="private-bathroom"
                      value="private-bathroom"
                    />
                    <label
                      for="private-bathroom"
                      className="text-colorText ml-2"
                    >
                      {" "}
                      Private bathroom
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="toilet"
                      name="toilet"
                      value="toilet"
                    />
                    <label for="toilet" className="text-colorText ml-2">
                      {" "}
                      Toilet
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="bathrobe"
                      name="bathrobe"
                      value="bathrobe"
                    />
                    <label for="bathrobe" className="text-colorText ml-2">
                      {" "}
                      Bathrobe
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="hairdryer"
                      name="hairdryer"
                      value="hairdryer"
                    />
                    <label for="hairdryer" className="text-colorText ml-2">
                      {" "}
                      Hairdryer
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input type="checkbox" id="bath" name="bath" value="bath" />
                    <label for="bath" className="text-colorText ml-2">
                      {" "}
                      Bath
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="shower"
                      name="shower"
                      value="shower"
                    />
                    <label for="shower" className="text-colorText ml-2">
                      {" "}
                      Shower
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <WeekendIcon />
                  Living Area
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="fireplace"
                      name="fireplace"
                      value="fireplace"
                    />
                    <label for="fireplace" className="text-colorText ml-2">
                      {" "}
                      Fireplace
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input type="checkbox" id="desk" name="desk" value="desk" />
                    <label for="desk" className="text-colorText ml-2">
                      {" "}
                      Desk
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <HttpsIcon />
                  Safety & Security
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="fire-extinguishers"
                      name="fire-extinguishers"
                      value="fire-extinguishers"
                    />
                    <label
                      for="fire-extinguishers"
                      className="text-colorText ml-2"
                    >
                      {" "}
                      Fire extinguishers
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="smoke-alarm"
                      name="smoke-alarm"
                      value="smoke-alarm"
                    />
                    <label for="smoke-alarm" className="text-colorText ml-2">
                      {" "}
                      Smoke alarm
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="key-card"
                      name="key-card"
                      value="key-card"
                    />
                    <label for="key-card" className="text-colorText ml-2">
                      {" "}
                      Key card access
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="key-access"
                      name="key-access"
                      value="key-access"
                    />
                    <label for="key-access" className="text-colorText ml-2">
                      {" "}
                      Key access
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input type="checkbox" id="24h" name="24h" value="24h" />
                    <label for="24h" className="text-colorText ml-2">
                      {" "}
                      24-hour security
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="safety"
                      name="safety"
                      value="safety"
                    />
                    <label for="safety" className="text-colorText ml-2">
                      {" "}
                      Safety deposit box
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <KingBedIcon />
                  Bedroom
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="alarm-clock"
                      name="alarm-clock"
                      value="alarm-clock"
                    />
                    <label for="alarm-clock" className="text-colorText ml-2">
                      {" "}
                      Alarm clock
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="smoke-alarm"
                      name="smoke-alarm"
                      value="smoke-alarm"
                    />
                    <label for="smoke-alarm" className="text-colorText ml-2">
                      {" "}
                      Smoke alarm
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <SportsCricketIcon />
                  Activities
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="cooking"
                      name="cooking"
                      value="cooking"
                    />
                    <label for="cooking" className="text-colorText ml-2">
                      {" "}
                      Cooking class
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="culture"
                      name="culture"
                      value="culture"
                    />
                    <label for="culture" className="text-colorText ml-2">
                      {" "}
                      Tour about local culture
                    </label>
                  </div>
                </div>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="bike-tour"
                      name="bike-tour"
                      value="bike-tour"
                    />
                    <label for="bike-tour" className="text-colorText ml-2">
                      {" "}
                      Bike tours
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="playground"
                      name="playground"
                      value="playground"
                    />
                    <label for="playground" className="text-colorText ml-2">
                      {" "}
                      Playground
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <TvIcon />
                  Media & Technology
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="flat-screen-tv"
                      name="flat-screen-tv"
                      value="flat-screen-tv"
                    />
                    <label for="flat-screen-tv" className="text-colorText ml-2">
                      {" "}
                      Flat-screen TV
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="telephone"
                      name="telephone"
                      value="telephone"
                    />
                    <label for="telephone" className="text-colorText ml-2">
                      {" "}
                      Telephone
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <DirectionsBusIcon />
                  Transport
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="ticket"
                      name="ticket"
                      value="ticket"
                    />
                    <label for="ticket" className="text-colorText ml-2">
                      {" "}
                      Public transport ticket
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <TerrainIcon />
                  View
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="city-view"
                      name="city-view"
                      value="city-view"
                    />
                    <label for="city-view" className="text-colorText ml-2">
                      {" "}
                      City view
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="lake-view"
                      name="lake-view"
                      value="lake-view"
                    />
                    <label for="lake-view" className="text-colorText ml-2">
                      {" "}
                      Lake-view
                    </label>
                  </div>
                </div>
              </div>

              <div className="m-4 text-colorText">
                <p className="font-bold">
                  <GTranslateIcon />
                  Languages spoken
                </p>

                <div className="flex">
                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="english"
                      name="english"
                      value="english"
                    />
                    <label for="english" className="text-colorText ml-2">
                      {" "}
                      English
                    </label>
                  </div>

                  <div className="text-colorText m-1 flex-1">
                    <input
                      type="checkbox"
                      id="vietnamese"
                      name="vietnamese"
                      value="vietnamese"
                    />
                    <label for="vietnamese" className="text-colorText ml-2">
                      {" "}
                      Vietnamese
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="m-4 block">
              <p className="text-colorText h-4 font-bold mb-4">
                Upload Images about your room
              </p>
              <div className="bg-white rounded-2xl p-2.5">
                <div className="flex justify-center items-center h-60 cursor-pointer text-6xl text-sky-500 rounded-2xl border-dashed border-4 border-sky-300">
                  <CloudUploadIcon className="w-28 h-28" />
                  <input type="file" onChange={handleUpload} hidden />
                </div>
                <div className="flex items-center justify-center mt-5">
                  <button className="bg-green-300 flex-1 font-bold text-textColor text-xl rounded hover:bg-green-500 hover:text-white">
                    Upload Images
                  </button>
                </div>
              </div>
            </div>

            <div className="m-4 ">
              <h1 className="text-colorText h-4 font-bold mb-4">
                Describe your room
              </h1>
              <textarea rows="4" className="w-full p-2"></textarea>
            </div>

            <div className="flex">
              <button
                type="submit"
                className="flex-1 bg-sky-200 text-colorText text-2xl rounded-full hover:bg-sky-500 hover:text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
</div> */
}
