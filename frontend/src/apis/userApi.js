import axios from "axios"
import qs from "qs"

import {
  GET_USER_INFOR_URL,
  GOOGLE_REGISTER_URL,
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_BY_CODE_URL,
  UPDATE_USER_INFO,
  CHECK_FAVORITE_HOTEL_URL,
  GET_HISTORY_URL,
  ADD_FAVORITE_HOTEL_URL,
  GET_ALL_RESERVATIONS_OF_USER_URL
} from "../configs/api"

export const loginAPI = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }

  const response = axios
    .post(LOGIN_URL, data, options)
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

export const registerAPI = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }

  const response = axios
    .post(REGISTER_URL, data, options)
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

export const getUserInfor = async (setInfor, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  }

  const response = axios
    .get(GET_USER_INFOR_URL, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res)
      setInfor(res.data)
      return res.data
    })
    .catch((err) => {
      console.log("ERROR: ====", err)
      return err
    })

  return response
}

export const getUserInfoEdited = async (tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  }

  const response = axios
    .get(GET_USER_INFOR_URL, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res)
      return res.data
    })
    .catch((err) => {
      console.log("ERROR: ====", err)
      return err
    })

  return response
}

export const updateUserInfo = async (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  }

  console.log(data, tokenStr)

  const response = axios
    .put(UPDATE_USER_INFO, data, options)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })

  return response
}

export const resetPassword = async (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  }

  const response = axios
    .put(RESET_PASSWORD_URL, data, options)
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

export const createReservation = async (data, tokenStr) => {
  const options = {
    headers: {
      Authorization: `Bearer ${tokenStr}`,
    },
  }

  const response = axios
    .post(CREATE_RESERVATION_API, data, options)
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


export const resetPasswordWithVerificationCode = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }

  const response = axios
    .put(RESET_PASSWORD_BY_CODE_URL, data, options)
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


export const getTotalPriceReservation = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }

  const response = axios
    .put(GET_TOTAL_PRICE, data, options)
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

export const forgotPassword = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
  const response = axios
    .put(FORGOT_PASSWORD_URL, data, options)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log("ERROR: ====", err)
      return err
    })

  return response
}

export const googleRegister = async () => {
  const res = axios.get(GOOGLE_REGISTER_URL).then((res) => console.log(res))
}

export const checkFavoriteHotel = async (token, hotelID, setStatus) => {
  let URL = `${CHECK_FAVORITE_HOTEL_URL}/${hotelID}`;
  console.log("URL", URL);

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = axios
    .get(URL, options)
    .then((res) => {
      console.log("RESPONSE ==== : ", res)
      setStatus(res.data.code);
      return res.data.code;
    })
    .catch((err) => {
      console.log("ERROR: ====", err)
      return err.response.data.Message
    })

  return response
}

export const getHistory = async (token, setHistory) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios
    .get(GET_HISTORY_URL, options)
    .then((res) => {
      console.log("res==", res);
      setHistory(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return {
        status: err.response.status,
        message: err.response.data.message
    };
    });
  return response;
}

export const getReservations = async (token, setReservation) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios
    .get(GET_ALL_RESERVATIONS_OF_USER_URL, options)
    .then((res) => {
      console.log("res==", res);
      setReservation(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
      return {
        status: err.response.status,
        message: err.response.data.message
    };
    });
  return response;
}

export const addFavoriteHotel = async (token, data) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }

  const response = axios
    .post(ADD_FAVORITE_HOTEL_URL, data, options)
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