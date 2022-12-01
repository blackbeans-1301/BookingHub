import axios from "axios";
import { CREATE_ROOM_URL } from "../configs/api";

export const createRoomApi = (data, tokenStr) => {
    const options = {
      headers: {
        Authorization: `Bearer ${tokenStr}`,
      },
    };
    const response = axios
      .post(CREATE_ROOM_URL, data, options)
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