const db = require("../models/index.js");

const Room = db.room;
const Image = db.image;
const Hotel = db.hotel;
const Owner = db.owner;

const hotelControllers = require("../controllers/hotel.controller.js");
const roomControllers = require("../controllers/room.controller.js")

// kiem tra xem room co thuoc user khong
exports.room_isBelongAccount = async (req, res, next) => {
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    if (!isOwner) {
        return res.status(400).send({ message: "Account isn't owner" });
    }
    let result = await roomControllers.CheckBelongToUser(req, Hotel, Owner, accountData);
    if (result.code === -1) {
        return res.status(400).send({ message: "Room doesn't belong to owner" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable validate account", err: result.err })
    }
    if (result.code === 1) {
        next();
    }
}

// CREATE ROOM
exports.room_create = async (req, res) => {
    const isOwner = req.bookingHub_account_isOwner;
    if (!isOwner) {
        return res.status(400).send({ message: "Account isn't owner" });
    }
    let roomData = await roomControllers.CreateRoom(req, Room)
    if (roomData.code === -2) {
        return res.status(500).send({ message: "Unable to create room", err: roomData.err })
    }

    let imgData = [];
    roomData.Image = [];
    for (let i = 0; i < req.body.imgURL.length; i++) {
        imgData.push({
            imgURL: req.body.imgURL[i],
            room_id: roomData.room_id,
            isHotelImage: 0
        })
        roomData.Image.push({
            imgURL: req.body.imgURL[i]
        })
    }

    let result = await hotelControllers.CreateImage(Image, imgData)
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to create image", err: result.err })
    }
    return res.status(200).send(roomData);
}

// READ ROOM
exports.room_list = async (req, res) => {
    let roomData = await roomControllers.GetRoomList(req, Room, Image);
    if (roomData.code === -2) {
        return res.status(400).send({ message: "Unable to get list room", err: roomData.err })
    }
    return res.status(200).send(roomData);
}

exports.room_info = async (req, res) => {
    let roomData = await roomControllers.GetRoomInfo(req, Room, Image)
    if (roomData.code === -1) {
        return res.status(400).send({ message: "Room is not exist" })
    }
    if (roomData.code === -2) {
        return res.status(400).send({ message: "Unable to get room information", err: roomData.err })
    }
    return res.status(200).send(roomData);
}
// UPDATE ROOM

// cap nhat lai room
exports.room_update = async (req, res) => {
    let isErr = false;
    let resultRoom = await roomControllers.UpdateRoom(req, Room)
    if (resultRoom.code === -1) {
        return res.status(400).send({ message: "Room is not exists" })
    }
    if (resultRoom.code === -2) {
        return res.status(400).send({ message: "Unable to update room", err: resultRoom.err })
    }

    let destroy = await roomControllers.RemoveImage(req, Image);

    let imgData = [];
    for (let i = 0; i < req.body.imgURL.length; i++) {
        imgData.push({
            imgURL: req.body.imgURL[i],
            room_id: req.body.room_id,
            isHotelImage: 0
        })
    }

    let resultImage = await roomControllers.CreateImage(Image, imgData)
    if (resultImage.code === -2) {
        return res.status(400).send({ message: "Unable to update room image", err: resultImage.err })
    }

    return res.status(200).send({ message: "Update successful" })
}