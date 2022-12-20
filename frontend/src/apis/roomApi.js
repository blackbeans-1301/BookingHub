import axios from "axios";
import {
  CREATE_ROOM_URL,
  DELETE_ROOM_URL,
  GET_ALL_ROOMS_BY_CRITERIA_URL,
  GET_ALL_ROOMS_URL,
  UPDATE_ROOM_URL,
} from "../configs/api";

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

export const getAllRoomsApi = (setAllRooms, hotelData, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = axios
    .post(GET_ALL_ROOMS_URL, hotelData, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res);
      setAllRooms(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.message;
    });

  return response;
};

export const updateRoomInfor = (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  };
  const response = axios
    .put(UPDATE_ROOM_URL, data, options)
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

export const getAllRoomsByCriteria = (data, setRooms) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = axios
    .put(GET_ALL_ROOMS_BY_CRITERIA_URL, data, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res);
      setRooms(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.message;
    });

  return response;
};

export const deleteRoomApi = (token, data) => {
  console.log("deleting token", token);
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const response = axios
    .post(DELETE_ROOM_URL, data, options)
    .then((res) => {
      console.log("RES==", res);
      return res;
    })
    .catch((err) => {
      console.log("ERR==", err);
      return err;
    });
  return response;
};
