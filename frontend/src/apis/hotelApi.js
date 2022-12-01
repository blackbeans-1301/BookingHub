import axios from "axios";
import { GET_PROVINCES_URL, CREATE_HOTEL_URL } from "../configs/api";

export const getAllProvinces = (setAll) => {
  fetch(GET_PROVINCES_URL)
    .then((response) => response.json())
    .then((data) => {
      setAll(data);
      console.log("provinces", data);
      return data;
    });
};

export const createHotelApi = (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  };
  const response = axios
    .post(CREATE_HOTEL_URL, data, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.Message;
    });

  return response;
};
