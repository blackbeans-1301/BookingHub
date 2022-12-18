// Cloud API for images-------------------------------

export const CLOUD_NAME = "dkzu82npc"

export const IMAGE_CLOUD_API = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

// Common variables--------------------------------------

export const DOMAIN_URL = "http://localhost:3000/api"

// API for user------------------------------------------

export const LOGIN_URL = `${DOMAIN_URL}/user/login`

export const REGISTER_URL = `${DOMAIN_URL}/user/register`

export const GET_USER_INFOR_URL = `${DOMAIN_URL}/user/info`

export const UPDATE_USER_INFOR_URL = `${DOMAIN_URL}/user/updateUser`

export const RESET_PASSWORD_URL = `${DOMAIN_URL}/user/resetPassword`

export const RESET_PASSWORD_BY_CODE_URL = `${DOMAIN_URL}/user/resetPasswordByCode`

export const FORGOT_PASSWORD_URL = `${DOMAIN_URL}/user/forgetPassword`

// API for register with Google-------------------------------------

export const GOOGLE_REGISTER_URL = `${DOMAIN_URL}/user/auth/google`

// API for get provinces--------------------------------------------

export const PROVINCE_OPEN_API = "https://provinces.open-api.vn/api"

export const GET_PROVINCES_URL = `${PROVINCE_OPEN_API}/p`

// API for hotel-----------------------------------------------

export const CREATE_HOTEL_URL = `${DOMAIN_URL}/hotel/create`

export const GET_ALL_HOTELS_URL = `${DOMAIN_URL}/hotel/ownerHotels`

export const GET_HOTEL_BY_ID_URL = `${DOMAIN_URL}/hotel`

export const UPDATE_HOTEL_URL = `${DOMAIN_URL}/hotel/update`

export const SEARCH_HOTEL_BY_CRITERIA_URL = `${DOMAIN_URL}/hotel/hotelCriteria`

// API for room------------------------------------------------

export const CREATE_ROOM_URL = `${DOMAIN_URL}/room/create`

export const GET_ALL_ROOMS_URL = `${DOMAIN_URL}/room/list`

export const UPDATE_ROOM_URL = `${DOMAIN_URL}/room/update`
