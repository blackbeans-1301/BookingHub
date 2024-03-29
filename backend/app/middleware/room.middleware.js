const { Op } = require("sequelize");

const db = require("../models/index.js");

const Room = db.room;
const Image = db.image;
const Hotel = db.hotel;
const User = db.user;
const Owner = db.owner;
const Reservation = db.reservation;
const Occupied_room = db.occupied_room;

const hotelControllers = require("../controllers/hotel.controller.js");
const roomControllers = require("../controllers/room.controller.js")
const controllers = require("../controllers/controller.js")

// CREATE ROOM
exports.createRoom = async (req, res) => {
    // kiem tra xem co phai owner khong
    const isOwner = req.bookingHub_account_isOwner;
    if (!isOwner) {
        return res.status(400).send({ message: "Account isn't owner" });
    }

    // tao room
    let value = {
        hotel_id: req.body.hotel.hotel_id,
        room_name: req.body.room_name,
        criteria: req.body.criteria,
        price: req.body.price,
        description: req.body.description,
        type_of_room: req.body.type_of_room,
        number_of_bed: req.body.number_of_bed,
        capacity: req.body.capacity,
        status: 0,
    }
    let roomData = await controllers.CreateData(Room, value);
    if (roomData.code === -2) {
        return res.status(400).send({ message: "Unable to create room", err: roomData.err })
    }
    
    // update start price
    // lay min price
    let condition2 = {
        hotel_id: req.body.hotel.hotel_id
    }
    let dataMinPrice = await roomControllers.GetMinPrice(Room, condition2);
    if (dataMinPrice.code === -2) {
        return res.status(400).send({message: "Unable to get min price", err: dataMinPrice.err})
    } 
    let startPrice = dataMinPrice[0].dataValues.minPrice;
    
    // update lai startPrice cua hotel
    let value2 = {
        startPrice: startPrice
    }
    let resultUpdateStartPrice = await controllers.UpdateData(Hotel, value2, condition2);
    if (resultUpdateStartPrice.code === -1) {
        return res.status(400).send({message: "Unable to update startPrice "})
    }
    if (resultUpdateStartPrice.code === -2) {
        return res.status(400).send({message: "Unable to update startPrice ", err: resultUpdateStartPrice.err})
    }

    // neu khong ton tai image thi tra ve data
    if (req.body.imgURL === undefined) {
        return res.status(200).send(roomData);
    }

    // them image vao database
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
    let result = await controllers.CreateManyData(Image, imgData)
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to create image", err: result.err })
    }
    return res.status(200).send(roomData);
}

// READ ROOM
exports.getHotelRoomList = async (req, res) => {
    let condition = {
        hotel_id: req.body.hotel_id
    }
    let roomData = await roomControllers.GetHotelRoomList(Room, Image, Hotel, condition);
    if (roomData.code === -2) {
        return res.status(400).send({ message: "Unable to get list room", err: roomData.err })
    }
    return res.status(200).send(roomData);
}

exports.getRoomInfo = async (req, res) => {
    let condition = {
        room_id: req.params.room_id,
    }
    let roomData = await roomControllers.GetRoomInfo(Room, Image, Hotel, condition)
    if (roomData.code === -1) {
        return res.status(400).send({ message: "Room is not exist" })
    }
    if (roomData.code === -2) {
        return res.status(400).send({ message: "Unable to get room information", err: roomData.err })
    }
    return res.status(200).send(roomData);
}

// UPDATE ROOM
exports.updateRoom = async (req, res) => {
    // cap nhat data
    let value1 = {
        room_name: req.body.room_name,
        criteria: req.body.criteria,
        description: req.body.description,
        price: req.body.price,
        type_of_room: req.body.type_of_room,
        number_of_bed: req.body.number_of_bed,
        capacity: req.body.capacity,
    }
    let condition1 = {
        room_id: req.body.room_id,
        hotel_id: req.body.hotel.hotel_id
    }
    let resultRoom = await controllers.UpdateData(Room, value1, condition1);
    if (resultRoom.code === -1) {
        return res.status(400).send({ message: "Room is not exists" })
    }
    if (resultRoom.code === -2) {
        return res.status(400).send({ message: "Unable to update room", err: resultRoom.err })
    }

    // update start price
    // lay min price
    let condition2 = {
        hotel_id: req.body.hotel.hotel_id
    }
    let dataMinPrice = await roomControllers.GetMinPrice(Room, condition2);
    if (dataMinPrice.code === -2) {
        return res.status(400).send({message: "Unable to get min price", err: dataMinPrice.err})
    } 
    let startPrice = dataMinPrice[0].dataValues.minPrice;
    
    // update lai startPrice cua hotel
    let value2 = {
        startPrice: startPrice
    }
    let resultUpdateStartPrice = await controllers.UpdateData(Hotel, value2, condition2);
    if (resultUpdateStartPrice.code === -1) {
        return res.status(400).send({message: "Unable to update startPrice "})
    }
    if (resultUpdateStartPrice.code === -2) {
        return res.status(400).send({message: "Unable to update startPrice ", err: resultUpdateStartPrice.err})
    }
    // kiem tra neu img undefined
    if (req.body.imgURL === undefined) {
        return res.status(200).send({ message: "Update successful" });
    }

    // xoa anh cu
    let condition3 = { room_id: req.body.room_id }
    let removeImage = await controllers.DeleteData(Image, condition3)

    // update anh moi
    let imgData = [];
    for (let i = 0; i < req.body.imgURL.length; i++) {
        imgData.push({
            imgURL: req.body.imgURL[i],
            room_id: req.body.room_id,
            isHotelImage: 0
        })
    }

    let resultImage = await controllers.CreateManyData(Image, imgData)
    if (resultImage.code === -2) {
        return res.status(400).send({ message: "Unable to update image", err: resultImage.err })
    }
    return res.status(200).send({ message: "Update successful" })
}

// delete room
exports.deleteRoom = async (req, res) => {
    let condition = {
        room_id: req.body.room_id
    }
    let occupiedRoomData = await controllers.FindManyData(Occupied_room, condition);
    if (occupiedRoomData.code === -2) {
        return res.status(400).send({message: "Can't find occupied room", err: occupiedRoomData.err})
    }
    if (occupiedRoomData.length) {
        return res.status(400).send({message: "Can't be delete in this time"})
    } 
    let resultImage = await controllers.DeleteData(Image, condition);
    let resultRoom = await controllers.DeleteData(Room, condition);
    return res.status(200).send({message: "Delete room successfully"})

}
exports.getRoomByCriteria = async (req, res) => {
    if ( req.body.date_in === undefined || req.body.date_out === undefined) {
            return res.status(400).send({ message: "Unable to get rooms (missing field)"})
        }
    req.body.date_in = controllers.GetDateTimeFromDate(req.body.date_in)
    req.body.date_out = controllers.GetDateTimeFromDate(req.body.date_out)        
    let condition1 = {
        hotel_id: req.body.hotel_id
    }
    let condition2 = {  
        status: {
            [Op.or]: ['located', 'waiting']
        },
        [Op.or]: [
            {date_in: {
                [Op.gte]: new Date(req.body.date_in),
                [Op.lte]: new Date(req.body.date_out)
            }},
            {date_out: {
                [Op.gte]: new Date(req.body.date_in),
                [Op.lte]: new Date(req.body.date_out)
            }}
        ]
    }
    let data = await roomControllers.GetRoomCriteria(Room, Reservation, Image, condition1, condition2);
    if (data.code === -2) {
        return res.status(400).send({ message: "Unable to get room", err: data.err })
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].dataValues.Reservations.length) {
            data.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < data.length; i++) {
        delete data[i].dataValues.Reservations
    }
    return res.status(200).send(data);
}
