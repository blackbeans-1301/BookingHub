const router = require("express").Router();
const hotelMiddleware = require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");
const reservationMiddleware = require("../middleware/reservation.middleware.js")

// Create a reservation
// TODO: Kiem tra ngay thang
router.post('/create', userMiddleware.authenticateJWT, reservationMiddleware.createReservation);


// Get user's reservations
router.get('/userReservations', userMiddleware.authenticateJWT, reservationMiddleware.userReservations);

// Get hotel's reservations
router.get('/hotelReservations/:hotel_id', userMiddleware.authenticateJWT, reservationMiddleware.isHotelBelongToOwner, reservationMiddleware.hotelReservations);

//
router.put('/checkIn', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToOwner, reservationMiddleware.isCheckIn, reservationMiddleware.checkIn);

// //
router.put('/checkOut', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToOwner, reservationMiddleware.isCheckOut, reservationMiddleware.checkOut);

// update
router.put('/cancel', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToUser, reservationMiddleware.isCancel, reservationMiddleware.cancel)

module.exports = router