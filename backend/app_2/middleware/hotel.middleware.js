const db = require("../models/index.js");

const Room = db.room;
const Image = db.image;
const Hotel = db.hotel;
const User = db.user;
const Owner = db.owner;
const Reservation = db.reservation;
const Occupied_room = db.occupied_room;

const hotelControllers = require("../controllers/hotel.controller.js");
const controllers = require("../controllers/controller.js");

// tao hotel
exports.createHotel = async (req, res) => {
    // lay thong tin tu Token gui ve
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner

    // kiem tra xem co phai owner khong
    if (!isOwner) {
        return res.status(400).send({ message: "Unable to create hotel (is not owner)" });
    }

    // tao hotel 
    let value = {
        owner_id: accountData.owner_id,
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        province: req.body.province,
        criteria: req.body.criteria
    }
    let hotelData = await controllers.CreateData(Hotel, value);
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable to create hotel", err: hotelData.err })
    }
    delete hotelData.owner_id 
    if (req.body.imgURL === undefined) {
        return res.status(200).send(hotelData);
    }

    // tao image cho hotel
    let imgData = [];
    hotelData.Image = [];
    for (let i = 0; i < req.body.imgURL.length; i++) {
        imgData.push({
            imgURL: req.body.imgURL[i],
            hotel_id: hotelData.hotel_id,
            isHotelImage: 1
        })
        hotelData.Image.push({
            imgURL: req.body.imgURL[i]
        })
    }
    let result = await controllers.CreateManyData(Image, imgData)
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to create image", err: result.err })
    }
    return res.status(200).send(hotelData);
}

exports.getOwnerHotels = async (req, res) => {
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    if (!isOwner) {
        return res.status(400).send({ message: "User isn't owner" })
    }
    let condition = { owner_id: accountData.owner_id }
    let hotelData = await hotelControllers.GetOwnerHotels(Hotel, Image, condition);
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable to get all owner'hotels", err: hotelData.err })
    }
    return res.status(200).send(hotelData.data);
}

exports.getInfoHotel = async (req, res) => {
    let condition = { hotel_id: req.params.hotel_id }
    let hotelData = await hotelControllers.GetHotelInfo(Hotel, Image, condition);
    if (hotelData.code === -1) {
        return res.status(400).send({ message: "Can't find hotel_id " })
    }
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable get hotel information", err: hotelData.err });
    }
    return res.status(200).send(hotelData);
}

// update hotel
exports.updateHotel = async (req, res) => {
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    if (!isOwner) {
        return res.status(400).send({ message: "User isn't owner" })
    }
    let value1 = {
        name: req.body.name,
        criteria: req.body.criteria,
        description: req.body.description,
        address: req.body.address,
        province: req.body.province,
    }
    let condition1 = {
        owner_id: accountData.owner_id,
        hotel_id: req.body.hotel_id
    }
    let result = await controllers.UpdateData(Hotel, value1, condition1);
    if (result.code === -1) {
        return res.status(400).send({ message: "Hotel is not exists" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update hotel", err: result.err })
    }
    

    if (req.body.imgURL === undefined) {
        return res.status(200).send({ message: "Update successful" });
    }
    let condition2 = { hotel_id: req.body.hotel_id }
    let removeImage = await controllers.DeleteData(Image, condition2)
    
    let imgData = [];
    for (let i = 0; i < req.body.imgURL.length; i++) {
        imgData.push({
            imgURL: req.body.imgURL[i],
            hotel_id: req.body.hotel_id,
            isHotelImage: 1
        })
    }

    let resultImage = await controllers.CreateManyData(Image, imgData)
    if (resultImage.code === -2) {
        return res.status(400).send({ message: "Unable to update image", err: resultImage.err })
    }
    return res.status(200).send({ message: "Update successful" })
}

exports.hotelByAddress = async (req, res) => {
    let condition = {
        province: req.body.province
    }
    let hotelData = await controllers.FindManyData(Hotel, condition);
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable to get hotel by address", err: hotelData.err })
    }
    return res.status(200).send(hotelData);
}

// kiem tra xem hotel co thuoc owner khong
exports.isHotelBelongToOwner = async (req, res, next) => {
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    if (!isOwner) {
        return res.status(400).send({ message: "Account isn't owner" });
    }
    let condition = {}
    if (req.body.hotel === undefined) {
        if (req.params.hotel_id === undefined) {
            return res.status(400).send({ message: "Missing hotel object (hotel_id) field"})
        } 
        condition.hotel_id = req.params.hotel_id
    } else {
        condition.hotel_id = req.body.hotel.hotel_id
    }
    let result = await controllers.FindOneData(Hotel, condition);
    if (result.code === -1) {
        return res.status(400).send({message: "Hotel isn't exist"})
    }
    if (result.code === -2) {
        return res.status(400).send({message: "Hotel isn't exist", err: result.err})
    }
    if (result.owner_id !== accountData.owner_id) {
        return res.status(400).send({message: "Hotel isn't belong to owner"})
    }
    next();
}

exports.hotelReservations = async (req, res) => {
    let condition = {
        hotel_id: req.params.hotel_id
    }
    let dataReservation = await hotelControllers.HotelReservations(Reservation, Room, condition)
    if (dataReservation.code === -2) {
        return res.status(400).send({message: "An error occurred", err: dataReservation.err})
    }
    return res.status(200).send(dataReservation)
}
