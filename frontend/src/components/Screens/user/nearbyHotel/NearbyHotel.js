import * as React from "react";
import { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import Slider from "react-slick";
import { searchHotelByCriteria } from "../../../../apis/hotelApi";
import { FormatDate, FormatDateToGBShort } from "../../../Common/CommonFunc";

export default function NearbyHotel() {
  const [nearbyHotel, setNearbyHotel] = useState();

  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(startDate.getDate() + 1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const getNearbyHotel = async () => {
      const data = {
        date_in: FormatDate(startDate),
        date_out: FormatDate(endDate),
        province: "Ha noi",
        number_of_room: 1,
        number_of_guest: 1,
      };

      const response = await searchHotelByCriteria(data, setNearbyHotel);

      console.log(response);
      setNearbyHotel(response);
    };

    getNearbyHotel();
  }, []);

  if (!nearbyHotel) {
    return null;
  }

  return (
    <div className="ml-8">
      <h1 className="text-2xl font-bold text-gray-600">Stays near you</h1>
      <h1 className="font-sans">
        From Sun, {FormatDateToGBShort(startDate)} -{" "}
        {FormatDateToGBShort(endDate)}
      </h1>
      <Slider
        {...settings}
        arrows={true}
        style={{ width: "95%" }}
        className="mt-4"
      >
        {nearbyHotel.map((item, index) => (
          <HotelCard
            key={index}
            data={item}
            dateIn={FormatDate(startDate)}
            dateOut={FormatDate(endDate)}
          />
        ))}
      </Slider>
    </div>
  );
}
