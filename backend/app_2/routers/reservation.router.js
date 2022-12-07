const router = require("express").Router();
const hotelMiddleware = require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");
const reservationMiddleware = require("../middleware/reservation.middleware.js")

// Create a reservation
// TODO: Kiem tra ngay thang // kiem tra trung phong trung ngay, 
router.post('/create', userMiddleware.authenticateJWT, reservationMiddleware.createReservation);

// checkin
router.put('/checkIn', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToOwner, reservationMiddleware.isCheckIn, reservationMiddleware.checkIn);

// checkout
router.put('/checkOut', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToOwner, reservationMiddleware.isCheckOut, reservationMiddleware.checkOut);

// cancel
router.put('/cancel', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToUser, reservationMiddleware.isCancel, reservationMiddleware.cancel)

module.exports = router