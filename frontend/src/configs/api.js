// import * as dotenv from "dotenv";

// dotenv.config();

export const DOMAIN_URL = "http://localhost:3000";

export const LOGIN_URL = `${DOMAIN_URL}/user/login`;

export const REGISTER_URL = `${DOMAIN_URL}/user/register`;

export const GET_USER_INFOR_URL = `${DOMAIN_URL}/user/information`;

export const UPDATE_USER_INFOR_URL = `${DOMAIN_URL}/user/updateUser`;

export const RESET_PASSWORD_URL = `${DOMAIN_URL}/user/resetPassword`;

// ----------------------------------------------------------------------------

export const PROVINCE_OPEN_API = "https://provinces.open-api.vn/api/";

export const GET_PROVINCES_URL = `${PROVINCE_OPEN_API}/p`;

// API for hotel-----------------------------------------------
export const CREATE_HOTEL_URL = `${DOMAIN_URL}/hotel/create`;

// Cloud API for images-------------------------------

export const CLOUD_NAME = "dkzu82npc";

export const IMAGE_CLOUD_API = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
