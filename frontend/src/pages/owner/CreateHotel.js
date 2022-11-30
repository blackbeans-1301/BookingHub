import * as React from "react";
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
import OwnerLayout from "../../components/Layouts/OwnerLayout";
import API from "./service";
import _ from "lodash";

export default function CreateHotelPage() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

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

  // user_id: userData.user_id,
  //       name: req.body.name,
  //       description: req.body.description,
  //       address: req.body.address,
  //       province: req.body.province

  return (
    <OwnerLayout>
      <div>
        <h1 className="font-bold text-2xl m-5">Create a new hotel</h1>

        <form>
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
                <span className="">(select amenities of your hotel)</span>
              </p>

              <div className="flex">
                <div className="text-colorText m-1 flex-1">
                  <input
                    type="checkbox"
                    id="fire-extinguisher"
                    name="fire-extinguisher"
                    value="fire-extinguisher"
                  />
                  <label
                    for="fire-extinguisher"
                    className="text-colorText ml-2"
                  >
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
                  <input
                    type="checkbox"
                    id="grill"
                    name="grill"
                    value="grill"
                  />
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
                  <input
                    type="checkbox"
                    id="other"
                    name="other"
                    value="other"
                  />
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
        </form>
      </div>
    </OwnerLayout>
  );
}

// export const Head = () => <title>Home Page</title>;
