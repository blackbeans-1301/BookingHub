const router = require("express").Router();
const hotelMiddleware= require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");
const roomMiddleware = require("../middleware/room.middleware.js");

// create room
router.post('/create', userMiddleware.authenticateJWT, hotelMiddleware.isHotelBelongToOwner, roomMiddleware.createRoom);

// update room
router.put('/update', userMiddleware.authenticateJWT, hotelMiddleware.isHotelBelongToOwner, roomMiddleware.updateRoom);

// // get list room of hotel
router.post('/list', userMiddleware.authenticateJWT, hotelMiddleware.isHotelBelongToOwner, roomMiddleware.getHotelRoomList)

// // get room's info
router.get('/:room_id',  roomMiddleware.getRoomInfo)

// get room by criteria
router.put('/roomCriteria', roomMiddleware.getRoomByCriteria)

//TODO: delete room

module.exports = router