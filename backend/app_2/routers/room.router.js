const router = require("express").Router();
const hotelMiddleware= require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");
const roomMiddleware = require("../middleware/room.middleware.js");

// create room
router.post('/create', userMiddleware.authenticateJWT, roomMiddleware.room_create);

// update room
router.put('/update', userMiddleware.authenticateJWT, roomMiddleware.room_isBelongAccount, roomMiddleware.room_update);

// // get list room of hotel
router.post('/list', userMiddleware.authenticateJWT, roomMiddleware.room_isBelongAccount, roomMiddleware.room_list)

// // get room's info
router.get('/:room_id',  roomMiddleware.room_info)

//TODO: delete room

module.exports = router