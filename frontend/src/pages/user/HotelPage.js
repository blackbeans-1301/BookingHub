import * as React from "react";
import Layout from "../../components/Layouts";
import Hotel from "../../components/Screens/user/Hotel";
import { getLSItem } from "../../utils";
import { useState, useEffect } from "react";
import { getHotelById } from "../../apis/hotelApi";

const HotelPage = ({ location }) => {
  const locationStr = location.search;
  console.log('location', locationStr);
  const len = locationStr.length;
  const queryStr = locationStr.substring(3);
  const queryArr = queryStr.split("/");
  const hotelId = queryArr[0];
  const dateIn = queryArr[1];
  const dateOut = queryArr[2];
  console.log('hotelId', hotelId, dateIn, dateOut);

  return (
    <Layout>
      <Hotel id={hotelId} dateIn={dateIn} dateOut={dateOut} />
    </Layout>
  );
};

export default HotelPage;
