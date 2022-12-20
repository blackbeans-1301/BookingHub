import axios from "axios";
import { CREATE_COMMENT_URL, GET_COMMENTS_OF_HOTEL_URL } from "../configs/api";

export const createComment = (token, data) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const response = axios
    .post(CREATE_COMMENT_URL, data, options)
    .then((res) => {

      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.message;
    });

  return response;
}

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
