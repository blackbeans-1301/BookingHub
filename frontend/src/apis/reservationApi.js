import axios from "axios";
import { CANCEL_URL, CHECK_IN_URL, CHECK_OUT_URL } from "../configs/api";

export const checkIn = (token, data) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = axios
    .put(CHECK_IN_URL, data, options)
    .then((res) => {
      console.log("res==", res);
    //   setStatus(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.Message;
    });
  return response;
};

export const checkOut = (token, data) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
  
    const response = axios
      .put(CHECK_OUT_URL, data, options)
      .then((res) => {
        console.log("res==", res);
      //   setStatus(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log("ERROR: ====", err);
        return err.response.data.Message;
      });
    return response;
  };

export const cancelReservation = (token, data) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
  
    const response = axios
      .put(CANCEL_URL, data, options)
      .then((res) => {
        console.log("res==", res);
      //   setStatus(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log("ERROR: ====", err);
        return err.response.data.Message;
      });
    return response;
  };