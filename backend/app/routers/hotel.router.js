const router = require("express").Router();
const hotelControllers = require("../controllers/hotel.controller.js");
const userControllers = require("../controllers/user.controller.js");

// Create a hotel
router.post('/create', userControllers.authenticationJWT, hotelControllers.createHotel);

// 
module.exports = router