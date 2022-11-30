const router = require("express").Router();
const hotelMiddleware = require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");

// Create a hotel
router.post('/create', userMiddleware.authenticateJWT, hotelMiddleware.createHotel);

// 
module.exports = router