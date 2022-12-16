import axios from "axios"
import qs from "qs"

import {
  GET_USER_INFOR_URL,
  GOOGLE_REGISTER_URL,
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
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
      return err.response.status
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

export const googleRegister = async () => {
  const res = axios.get(GOOGLE_REGISTER_URL).then((res) => console.log(res))
}
