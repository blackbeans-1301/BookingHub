const router = require("express").Router();
const hotelMiddleware = require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");
const reservationMiddleware = require("../middleware/reservation.middleware.js");
const commentMiddleware = require("../middleware/comment.middleware.js");

// Create a comment
router.post('/create', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToUser, commentMiddleware.createComment);

// Get comment of a hotel
router.get('/hotelComments/:hotel_id', commentMiddleware.getCommentOfHotel);

// Get comment of a reservation
router.get('/reservationComment/:reservation_id', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToUser, commentMiddleware.getCommentReservation);

// Update comment
router.put('/update', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToUser, commentMiddleware.updateComment); 

// Delete comment
router.delete('/delete', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToUser, commentMiddleware.deleteComment)
module.exports = router