const router = require("express").Router();
const hotelMiddleware = require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");
const reservationMiddleware = require("../middleware/reservation.middleware.js")

// Create a reservation
router.post('/create', userMiddleware.authenticateJWT, reservationMiddleware.createReservation);

//
// router.put('/checkIn', userMiddleware.authenticateJWT, reservationMiddleware.checkIn, reservationMiddleware.updateRoomStatus);

// //
// router.put('/checkOut', userMiddleware.authenticateJWT, reservationMiddleware.checkOut);

// update

module.exports = router