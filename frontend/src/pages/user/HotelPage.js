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
  const hotelId = locationStr.substring(3);
  console.log('hotelId', hotelId);

  return (
    <Layout>
      <Hotel id={hotelId} />
    </Layout>
  );
};

export default HotelPage;
