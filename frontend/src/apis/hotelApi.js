import { GET_PROVINCES_URL } from "../configs/api";

export const getAllProvinces = (setAll) => {
  fetch(GET_PROVINCES_URL)
    .then((response) => response.json())
    .then((data) => {
      setAll(data);
      console.log("provinces", data);
      return data;
    });
};

export const createHotelApi = () => {};
