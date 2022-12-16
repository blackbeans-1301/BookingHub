import axios from "axios";
import {
  GET_PROVINCES_URL,
  CREATE_HOTEL_URL,
  GET_ALL_HOTELS_URL,
  GET_HOTEL_BY_ID_URL,
  UPDATE_HOTEL_URL,
  SEARCH_HOTEL_BY_CRITERIA_URL,
} from "../configs/api";

export const getAllProvinces = (setAll) => {
  fetch(GET_PROVINCES_URL)
    .then((response) => response.json())
    .then((data) => {
      setAll(data);
      return data;
    })
    .catch((e) => {
      console.log(e);
    });
};

// function create a new hotel
export const createHotelApi = (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  };
  const response = axios
    .post(CREATE_HOTEL_URL, data, options)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.Message;
    });

  return response;
};

// function get all hotels
export const getAllHotels = (setAllHotels, tokenStr) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${tokenStr}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(GET_ALL_HOTELS_URL, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setAllHotels(data);
      return data;
    });
};

// function get hotel by id
export const getHotelById = (id, setHotelInfor, tokenStr) => {
  let URL = `${GET_HOTEL_BY_ID_URL}/${id}`;
  console.log("url", URL);
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${tokenStr}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(URL, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setHotelInfor(data);
      return data;
    });
};

// function update information of a hotel
export const updateHotelInfor = (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  };
  const response = axios
    .put(UPDATE_HOTEL_URL, data, options)
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

// function search hotels by some criterias
export const searchHotelByCriteria = (data, setHotels) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = axios
    .put(SEARCH_HOTEL_BY_CRITERIA_URL, data, options)
    .then((res) => {
      console.log("RESPONSE:", res);
      setHotels(res);
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });

    return response;
};
