const router = require("express").Router();
const hotelControllers = require("../controllers/hotel.controller.js");
const userControllers = require("../controllers/user.controller.js");
const roomControllers = require("../controllers/room.controller.js");

// create room
router.post('/create', userControllers.authenticationJWT, roomControllers.room_create);

// update room
router.put('/update', userControllers.authenticationJWT, roomControllers.room_isBelongUser, roomControllers.room_update);

// get list room of hotel
router.get('/list', userControllers.authenticationJWT, roomControllers.room_isBelongUser, roomControllers.room_list)

//get list empty room of hotel
router.get('/listEmpty', roomControllers.room_list_empty)
// get room's info
router.get('/info',  roomControllers.room_info)

//get list empty room of hotel
//router.get('/listEmpty', roomControllers.room_list)

//TODO: delete room

module.exports = router