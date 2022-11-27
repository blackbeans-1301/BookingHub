import axios from "axios";
import qs from 'qs';

import { GET_USER_INFOR_URL, LOGIN_URL } from "../configs/api";

export const loginAPI = async (data) => {
  // const options = {
  //   method: 'POST',
  //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //   data: qs.stringify(data),
  //   url: LOGIN_URL,
  // };

  // const response = await axios.post(options);

  const options = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  
  const response = axios.post(LOGIN_URL, data, options)
   .then((res) => {
     console.log("RESPONSE ==== : ", res);
     return res.data;
   })
   .catch((err) => {
     console.log("ERROR: ====", err);
     return err.response.data.Message;
   })

  return response;
};

export const getInformation = async (tokenStr) => {
  const options = {
    headers: {
      "Authorization" : `Bearer ${tokenStr}`
    },
  };
  
  const response = axios.get(GET_USER_INFOR_URL, options)
   .then((res) => {
     console.log("RESPONSE ==== : ", res);
     return res.data;
   })
   .catch((err) => {
     console.log("ERROR: ====", err);
     return err.response.status;
   })

  return response;
};
