const router = require("express").Router();
const hotelControllers = require("../controllers/hotel.controller.js");
const userControllers = require("../controllers/user.controller.js");

// Create a hotel
router.post('/create', userControllers.authenticationJWT, hotelControllers.createHotel);

// update hotel's info
router.put('/update', userControllers.authenticationJWT, hotelControllers.updateHotel);

// get all user's hotels
router.get('/userHotels', userControllers.authenticationJWT, hotelControllers.getUserHotels);

// TODO: find hotel
// TODO: delete a hotel

// get hotel's info (cai nay luon o duoi cung)
router.get('/:hotel_id', hotelControllers.getInfoHotel)

module.exports = router