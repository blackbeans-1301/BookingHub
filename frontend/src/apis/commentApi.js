import axios from "axios";
import { GET_COMMENTS_OF_HOTEL_URL } from "../configs/api";

export const getCommentsOfHotel = (hotelID, setComment) => {
  let URL = `${GET_COMMENTS_OF_HOTEL_URL}/${hotelID}`;
  console.log("url", URL);
  const response = axios
    .get(URL)
    .then((res) => {
      console.log("res==", res);
      setComment(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.Message;
    });
  return response;
};
