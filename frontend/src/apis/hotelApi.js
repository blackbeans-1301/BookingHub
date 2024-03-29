import axios from "axios";
import {
  GET_PROVINCES_URL,
  CREATE_HOTEL_URL,
  GET_ALL_HOTELS_URL,
  GET_HOTEL_BY_ID_URL,
  UPDATE_HOTEL_URL,
  SEARCH_HOTEL_BY_CRITERIA_URL,
  GET_ALL_RESERVATIONS_OF_HOTEL_URL,
  SEARCH_HOTEL_BY_KEYWORD_URL,
  DELETE_HOTEL_URL,
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
export const getHotelById = (id, setHotel) => {
  let URL = `${GET_HOTEL_BY_ID_URL}/${id}`;
  console.log("url", URL);

  var requestOptions = {
    method: "GET",
    
  };

  const response = axios
    .get(URL)
    .then((res) => {
      console.log("res==", res);
      setHotel(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.Message;
    });
  return response;
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
export const searchHotelByCriteria = (data, setHotel) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = axios
    .put(SEARCH_HOTEL_BY_CRITERIA_URL, data, options)
    .then((res) => {
      console.log("RESPONSE:", res);
      setHotel(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });

  return response;
};

// function get all reservation of a hotel
export const getReservationOfHotel = (hotelID, token, setReservation) => {
  let URL = `${GET_ALL_RESERVATIONS_OF_HOTEL_URL}/${hotelID}`;
  console.log("url", URL);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = axios
    .get(URL, options)
    .then((res) => {
      console.log("res==", res);
      setReservation(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return err.response.data.Message;
    });
  return response;
};

export const searchHotelByKeyword = (keyword) => {
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const response = axios.get(`${SEARCH_HOTEL_BY_KEYWORD_URL}/${keyword}`);

  return response;
};

export const deleteHotelApi = (token, data) => {
  console.log("deleting token", token);
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const response = axios
    .post(DELETE_HOTEL_URL, data, options)
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
