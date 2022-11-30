const router = require("express").Router();
const hotelMiddleware = require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");

// Create a hotel
router.post('/create', userMiddleware.authenticateJWT, hotelMiddleware.createHotel);

// update hotel's info
router.put('/update', userMiddleware.authenticateJWT, hotelMiddleware.updateHotel);

// get all user's hotels
router.get('/userHotels', userMiddleware.authenticateJWT, hotelMiddleware.getUserHotels);

// TODO: find hotel
// TODO: delete a hotel

// get hotel's info (cai nay luon o duoi cung)
router.get('/:hotel_id', hotelMiddleware.getInfoHotel)

module.exports = router