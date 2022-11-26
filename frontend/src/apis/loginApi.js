import axios from "axios";
import { LOGIN_URL } from "../configs/api";

export const loginAPI = async (data) => {
  const response = await axios.post(LOGIN_URL, data);

  return response.data;
};