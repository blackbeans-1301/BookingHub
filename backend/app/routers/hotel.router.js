const router = require("express").Router();
const hotelMiddleware = require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");

// Create a hotel
router.post('/create', userMiddleware.authenticateJWT, hotelMiddleware.createHotel);

// update hotel's info
router.put('/update', userMiddleware.authenticateJWT, hotelMiddleware.isHotelBelongToOwner, hotelMiddleware.updateHotel);

// get all user's hotels
router.get('/ownerHotels', userMiddleware.authenticateJWT, hotelMiddleware.getOwnerHotels);

// get hotel by address
router.put('/hotelByAddress', hotelMiddleware.hotelByAddress) 

// get hotel by criteria
router.put('/hotelCriteria', hotelMiddleware.getHotelByCriteria)

// delete a hotel
router.post('/delete', userMiddleware.authenticateJWT, hotelMiddleware.isHotelBelongToOwner, hotelMiddleware.deleteHotel )

// get hotel's info (cai nay luon o duoi cung)
router.get('/:hotel_id', hotelMiddleware.getInfoHotel)

// Get hotel's reservations
router.get('/hotelReservations/:hotel_id', userMiddleware.authenticateJWT, hotelMiddleware.isHotelBelongToOwner, hotelMiddleware.hotelReservations);

// Get hotel by keyword
router.get('/hotelByKeyWord/:keyword', hotelMiddleware.searchByKeyword)
// thu nhap
router.get('/:hotel_id/income', userMiddleware.authenticateJWT, hotelMiddleware.isHotelBelongToOwner, hotelMiddleware.calculateIncome);

// 
module.exports = router