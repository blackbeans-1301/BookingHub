import * as React from "react";
import * as yup from "yup";
import { useState } from "react";
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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";

const registerValidationSchema = yup.object({
  name: yup.string().required("Enter your hotel's name"),
  address: yup.string().required("Enter your hotel's address"),
  price: yup.string().required("Enter the price"),
  criterias: yup.string().required("Required"),
});

export default function CreateHotel() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [acceptTnC, setAcceptTnC] = useState(false);
  const [criterias, setCriterias] = useState([]);
  const [all, setAll] = useState();
  const [province, setProvince] = useState("");

  console.log("all", all);

  //   console.log(criterias);

  // change criterias state
  //   const handleChange = (event) => {
  //     setAcceptTnC(event.target.checked);
  //   };

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

  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
  };

  //   handle upload images
  const handleUpload = async (e) => {
    let { files } = e.target;

    let formData = new FormData();
    setUploadedImages([]);
    _.forEach(e.target.files, (file) => {
      formData.append("files", file);
    });
    setUploading(true);
    let { data } = await API.post("/images/multiple-upload", formData, {
      onUploadProgress: ({ loaded, total }) => {
        setProgress(((loaded / total) * 100).toFixed(2));
      },
    });
    // setProgress(0);
    setUploadedImages(data);
    setUploading(false);
  };

  useEffect(() => {
    getAllProvinces(setAll);
  }, []);
  //   const type = typeof allProvinces;
  //   console.log("allProvinces", allProvinces, type);

  const handleGetHotelInfor = (values) => {
    const signUp = async (postData) => {
      const response = await createHotelApi(postData);
      console.log("response", response);
      console.log("type", typeof response);
      const type = typeof response;
      if (type == "object") {
        toast.success("Sign up successfully");
      } else {
        console.log("Sign up failed");
        toast.error(response);
      }
      setIsLoading(false);
    };

    const data = {
      name: values.name,
      address: values.address,
      price: values.price,
      criterias: values.criterias,
    };
    setIsLoading(true);
    signUp(data);
  };

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      address: "",
      price: "",
      criterias: [],
    },
    validationSchema: registerValidationSchema,
    onSubmit: (values) => {
      console.log("value", values);
      handleGetHotelInfor(values);
    },
  });
  // user_id: userData.user_id,
  //       name: req.body.name,
  //       description: req.body.description,
  //       address: req.body.address,
  //       province: req.body.province

  return (
    <div>
      <h1 className="font-bold text-2xl m-5">Create a new hotel</h1>

      <form
        className="flex flex-col m-4"
        onSubmit={registerFormik.handleSubmit}
      >
        <FormControl className="my-2">
          <Typography variant="subtitle1">Hotel's name</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter your hotel's name..."
            name="name"
            value={registerFormik.values.name}
            error={
              registerFormik.touched.name && Boolean(registerFormik.errors.name)
            }
            onChange={registerFormik.handleChange}
            helperText={
              registerFormik.touched.name && registerFormik.errors.name
            }
          />
        </FormControl>

        <FormControl className="my-2">
          <Typography variant="subtitle1">Address</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter your hotel's address..."
            name="address"
            value={registerFormik.values.address}
            error={
              registerFormik.touched.address &&
              Boolean(registerFormik.errors.address)
            }
            onChange={registerFormik.handleChange}
            helperText={
              registerFormik.touched.address && registerFormik.errors.address
            }
          />
        </FormControl>

        <FormControl className="my-2">
          <Typography variant="subtitle1">Price for a night (USD)</Typography>
          <TextField
            sx={{
              height: "85px",
            }}
            placeholder="Enter the price for a night..."
            name="price"
            value={registerFormik.values.price}
            error={
              registerFormik.touched.price &&
              Boolean(registerFormik.errors.price)
            }
            onChange={registerFormik.handleChange}
            helperText={
              registerFormik.touched.price && registerFormik.errors.price
            }
          />
        </FormControl>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={province}
              label="Age"
              onChange={handleChangeProvince}
            >
              <MenuItem value={{}}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
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

        <LoadingButton
          loading={isLoading}
          variant="contained"
          className="bg-sky-300 text-xl font-bold rounded-full mt-4 hover:bg-sky-500 hover:text-white py-2"
          type="submit"
        >
          Send
        </LoadingButton>
      </form>

      {/* <form>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            getP();
          }}
        >
          Test province api
        </button>
        <div className="shadow-xl rounded-2xl bg-sky-100 ml-5 mr-5 p-2">
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
              placeholder="Enter your hotel's address..."
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
              <span className="">(select criterias of your hotel)</span>
            </p>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="fire-extinguisher"
                  name="fire-extinguisher"
                  value="fire-extinguisher"
                />
                <label for="fire-extinguisher" className="text-colorText ml-2">
                  {" "}
                  <FireplaceIcon /> Fire extinguisher
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="air-conditioned"
                  name="air-conditioned"
                  value="air-conditioned"
                />
                <label for="air-conditioned" className="text-colorText ml-2">
                  {" "}
                  <AcUnitIcon /> Air-conditioned
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="Elevator"
                  name="Elevator"
                  value="Elevator"
                />
                <label for="Elevator" className="text-colorText ml-2">
                  {" "}
                  <SwapVerticalCircleIcon /> Elevator
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="pet-allowed"
                  name="pet-allowed"
                  value="pet-allowed"
                />
                <label for="pet-allowed" className="text-colorText ml-2">
                  {" "}
                  <PetsIcon /> Pets allowed
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="outdoor-pool"
                  name="outdoor-pool"
                  value="outdoor-pool"
                />
                <label for="outdoor-pool" className="text-colorText ml-2">
                  {" "}
                  <PoolIcon /> Outdoor-pool
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="indoor-pool"
                  name="indoor-pool"
                  value="indoor-pool"
                />
                <label for="indoor-pool" className="text-colorText ml-2">
                  {" "}
                  <PoolIcon /> Indoor pool
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input type="checkbox" id="spa" name="spa" value="spa" />
                <label for="spa" className="text-colorText ml-2">
                  {" "}
                  <SpaIcon /> Spa and wellness center
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="fitness"
                  name="fitness"
                  value="fitness"
                />
                <label for="fitness" className="text-colorText ml-2">
                  {" "}
                  <FitnessCenterIcon /> Fitness center
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="restaurant"
                  name="restaurant"
                  value="restaurant"
                />
                <label for="restaurant" className="text-colorText ml-2">
                  {" "}
                  <RestaurantIcon />
                  Restaurant
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input type="checkbox" id="bar" name="bar" value="bar" />
                <label for="bar" className="text-colorText ml-2">
                  {" "}
                  <RestaurantIcon /> Bar/ Lounge
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="room-service"
                  name="room-service"
                  value="room-service"
                />
                <label for="room-service" className="text-colorText ml-2">
                  {" "}
                  <RoomServiceIcon /> Room service
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input type="checkbox" id="wifi" name="wifi" value="wifi" />
                <label for="wifi" className="text-colorText ml-2">
                  {" "}
                  <WifiIcon /> Free wifi
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="coffee-shop"
                  name="coffee-shop"
                  value="coffee-shop"
                />
                <label for="coffee-shop" className="text-colorText ml-2">
                  {" "}
                  <FreeBreakfastIcon /> Coffee shop
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="free-parking"
                  name="free-parking"
                  value="free-parking"
                />
                <label for="free-parking" className="text-colorText ml-2">
                  {" "}
                  <LocalParkingIcon /> Free parking
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
                  <KitchenIcon /> Minibar
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="snack-bar"
                  name="snack-bar"
                  value="snack-bar"
                />
                <label for="snack-bar" className="text-colorText ml-2">
                  {" "}
                  <FastfoodIcon /> Snack bar
                </label>
              </div>
            </div>

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
                  <RestaurantIcon /> Breakfast
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="laundry"
                  name="laundry"
                  value="laundry"
                />
                <label for="laundry" className="text-colorText ml-2">
                  {" "}
                  <LocalLaundryServiceIcon /> Laundry facilities
                </label>
              </div>
            </div>

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
                  <LocalLaundryServiceIcon /> Ironing service
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="gift-shop"
                  name="gift-shop"
                  value="gift-shop"
                />
                <label for="gift-shop" className="text-colorText ml-2">
                  {" "}
                  <CardGiftcardIcon /> Gift shop
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input type="checkbox" id="shop" name="shop" value="shop" />
                <label for="shop" className="text-colorText ml-2">
                  {" "}
                  <StorefrontIcon /> Shops on site
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input type="checkbox" id="golf" name="golf" value="golf" />
                <label for="golf" className="text-colorText ml-2">
                  {" "}
                  <GolfCourseIcon /> Golf
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="garden"
                  name="garden"
                  value="garden"
                />
                <label for="garden" className="text-colorText ml-2">
                  {" "}
                  <LocalFloristIcon /> Garden
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="terrace"
                  name="terrace"
                  value="terrace"
                />
                <label for="terrace" className="text-colorText ml-2">
                  {" "}
                  <DeckIcon /> Terrace/ Patio
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input type="checkbox" id="atm" name="atm" value="atm" />
                <label for="atm" className="text-colorText ml-2">
                  {" "}
                  <LocalAtmIcon /> ATM on-site
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="car-rental"
                  name="car-rental"
                  value="car-rental"
                />
                <label for="car-rental" className="text-colorText ml-2">
                  {" "}
                  <DirectionsCarIcon /> Car rental
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input type="checkbox" id="grill" name="grill" value="grill" />
                <label for="grill" className="text-colorText ml-2">
                  {" "}
                  <OutdoorGrillIcon /> Grill
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
                  <WavesIcon /> Lake view
                </label>
              </div>
            </div>

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
                  <LocationCityIcon /> City view
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
                  <NatureIcon /> Playground
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="buffet"
                  name="buffet"
                  value="buffet"
                />
                <label for="buffet" className="text-colorText ml-2">
                  {" "}
                  <RestaurantMenuIcon /> Buffet
                </label>
              </div>

              <div className="text-colorText m-1 flex-1">
                <input
                  type="checkbox"
                  id="childcare"
                  name="childcare"
                  value="childcare"
                />
                <label for="childcare" className="text-colorText ml-2">
                  {" "}
                  <ChildCareIcon /> Babysitting or childcare
                </label>
              </div>
            </div>

            <div className="flex">
              <div className="text-colorText m-1 flex-1">
                <input type="checkbox" id="other" name="other" value="other" />
                <label for="other" className="text-colorText ml-2">
                  {" "}
                  <MoreHorizIcon /> Others
                </label>
              </div>
            </div>
          </div>

          <div className="m-4 block">
            <p className="text-colorText h-4 font-bold mb-4">
              Upload Images about your hotel
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
              Describe your hotel
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
      </form> */}
    </div>
  );
}
