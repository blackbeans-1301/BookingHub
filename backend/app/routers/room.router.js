const router = require("express").Router();
const hotelMiddleware= require("../middleware/hotel.middleware.js");
const userMiddleware = require("../middleware/user.middleware.js");
const roomMiddleware = require("../middleware/room.middleware.js");

// create room
router.post('/create', userMiddleware.authenticateJWT, roomMiddleware.room_create);

// update room
router.put('/update', userMiddleware.authenticateJWT, roomMiddleware.room_isBelongUser, roomMiddleware.room_update);

// get list room of hotel
router.get('/list', userMiddleware.authenticateJWT, roomMiddleware.room_isBelongUser, roomMiddleware.room_list)

//get list empty room of hotel
router.get('/listEmpty', roomMiddleware.room_list_empty)

// get room's info
router.get('/info',  roomMiddleware.room_info)

//TODO: delete room

module.exports = router