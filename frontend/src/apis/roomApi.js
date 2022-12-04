import axios from "axios"
import { CREATE_ROOM_URL, GET_ALL_ROOMS_URL } from "../configs/api"

export const createRoomApi = (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  }
  const response = axios
    .post(CREATE_ROOM_URL, data, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res)
      return res.data
    })
    .catch((err) => {
      console.log("ERROR: ====", err)
      return err.response.data.Message
    })

  return response
}

export const getAllRoomsApi = (setAllRooms, hotelData, tokenStr) => {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${tokenStr}`);
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  // // 'Content-Type': '',

  // var requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   // redirect: "follow",
  //   body: JSON.stringify(hotelData),
  // };

  // fetch(GET_ALL_ROOMS_URL, requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setAllRooms(data);
  //     console.log("all room", data);
  //     return data;
  //   });

  //   console.log('all rooms api')

  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
  }

  const response = axios
    .post(GET_ALL_ROOMS_URL, hotelData, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res)
      setAllRooms(res.data)
      return res.data
    })
    .catch((err) => {
      console.log("ERROR: ====", err)
      return err.response.data.Message
    })

  return response
}
