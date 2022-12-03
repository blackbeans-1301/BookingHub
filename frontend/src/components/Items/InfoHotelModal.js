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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MapIcon from "@material-ui/icons/Map";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ImageIcon from "@material-ui/icons/Image";
import ChatIcon from "@material-ui/icons/Chat";
import HomeWorkIcon from "@material-ui/icons/HomeWork";

import _, { defaultTo, set } from "lodash";
import {
  createHotelApi,
  getAllProvinces,
  getHotelById,
  updateHotelInfor,
} from "../../apis/hotelApi";
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
import { IMAGE_CLOUD_API } from "../../configs/api";
import ToastMessage from "./ToastMessage";
import PreviewImage from "./PreviewImage";

const validationSchema = yup.object({
  name: yup.string().required("Enter your hotel's name"),
  address: yup.string().required("Enter your hotel's address"),
  description: yup.string().required("Enter the hotel's description"),
  province: yup.string().required("Province is required"),
  criteria: yup.string(),
  imgURL: yup.array(),
});

export default function InfoHotelModal({ isVisible, isClose, detail }) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTnC, setAcceptTnC] = useState(false);
  const [criterias, setCriterias] = useState([]);
  const [all, setAll] = useState();
  const [province, setProvince] = useState("");
  const [images, setImages] = useState([]);
  const [hotelInfor, setHotelInfor] = useState();
  const [imgFile, setImgFile] = useState();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  //   const [detail, setDetail] = useState();

  useEffect(() => {
    getAllProvinces(setAll);
  }, []);

  let imagesURLs = [];
  // console.log("all", all);
  const pr = all;
  // console.log("pr", pr);

  console.log(criterias);

  console.log("detail from params", detail.hotel_id);
  // console.log("criteria from params", detail.criteria);
  let checkedCriterias = detail.criteria.split(",");
  // console.log("arr criteria", checkedCriterias);

  //   setCriterias(checkedCriterias);
  //   const token = localStorage.getItem("token");
  //   const hotelID = localStorage.getItem("hotelID");

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

  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
  };

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
      const getImg = fetch(IMAGE_CLOUD_API, {
        method: "POST",
        body: formData,
      });
      setImgFile(getImg);
      getImg.then((res) => res.json()).then((res) => imagesURLs.push(res.url));
    }

    // console.log("img urls", imagesURLs[0].imgURL);
    formik.values.imgURL = imagesURLs;

    setUploading(false);
  };

  // console.log("img files", detail.Images[0].imgURL);
  const redirectFunc = () => {
    window.location = "http://localhost:8000/owner/ListHotelPage";
  };

  const handleGetHotelInfor = (values) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const signUp = async (postData) => {
      const response = await updateHotelInfor(postData, token);
      console.log("response", response);
      console.log("type", typeof response);
      const type = typeof response;
      if (type == "object") {
        toast.success("Update hotel details successfully");
        setTimeout(redirectFunc, 3000);
      } else {
        console.log("Update hotel details failed");
        toast.error(response);
      }
      setIsLoading(false);
    };
    formik.values.criteria = criterias.toString();
    const data = {
      hotel_id: detail.hotel_id,
      name: values.name,
      description: values.description,
      address: values.address,
      province: values.province,
      criteria: values.criteria,
      imgURL: values.imgURL,
    };
    setIsLoading(true);
    signUp(data);
  };

  const formik = useFormik({
    initialValues: {
      name: detail.name,
      description: detail.description,
      address: detail.address,
      province: detail.province,
      criteria: "",
      imgURL: detail.Images,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("value", values);
      handleGetHotelInfor(values);
    },
  });

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 ">
      <div className="w-11/12 flex flex-col z-20 h-5/6 rounded-2xl">
        <div className="bg-white p-2 rounded flex flex-col m-2 overflow-y-scroll">
          {/* <h1 className="font-bold text-2xl m-5">Update information for a hotel</h1> */}
          <div className="flex justify-between ">
            <h2 className="font-bold text-2xl text-colorText ml-4 mt-2">
              Hotel {detail.name}
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
                <h2>Hotel details</h2>
              </div>
              <div
                className={
                  toggleState === 2
                    ? "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-white border-b-2 border-primary font-bold"
                    : "p-2.5 text-center w-6/12 cursor-pointer box-content relative outline-0 bg-light-primary"
                }
                onClick={() => toggleTab(2)}
              >
                Edit hotel details
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
                <h1 className="font-bold text-2xl mb-4">Hotel's detail</h1>
                <div className="">
                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-stone-700">
                        <AssignmentIcon />
                      </span>
                      Hotel's name:
                    </span>{" "}
                    {detail.name}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-green-600">
                        <MapIcon />
                      </span>
                      Province:
                    </span>{" "}
                    {detail.province}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2 text-red-500">
                        <LocationOnIcon />
                      </span>
                      Hotel's address:
                    </span>{" "}
                    {detail.address}
                  </div>

                  <div className="m-2 text-lg">
                    <span className="font-semibold text-sky-600">
                      <span className="mr-2">
                        <ChatIcon />
                      </span>
                      Hotel's description:
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
                      Hotel's images:
                    </span>{" "}
                    {detail.Images.length != 0 ? (
                      detail.Images.map((item, index) => {
                        return <img src={item.imgURL} className="m-2" />;
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
                      <InputLabel id="demo-simple-select-label">
                        Province
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formik.values.province}
                        name="province"
                        label="Province"
                        onChange={formik.handleChange}
                        error={
                          formik.touched.province && !!formik.errors.province
                        }
                      >
                        {pr != undefined &&
                          pr.map((p) => {
                            return <MenuItem value={p.name}>{p.name}</MenuItem>;
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
                      error={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      onChange={formik.handleChange}
                      helperText={
                        formik.touched.address && formik.errors.address
                      }
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
                      minRows={1}
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
                    Amenities (Please select all criterias of your hotel)
                  </FormLabel>
                  <FormGroup>
                    <div className="flex text-sm">
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

                    <div className="flex flex-col">
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

                    {detail.Images.length != 0 ? (
                      detail.Images.map((item, index) => {
                        return <img src={item.imgURL} className="m-2" />;
                      })
                    ) : (
                      <div>This hotel has no images</div>
                    )}
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
  );
}
