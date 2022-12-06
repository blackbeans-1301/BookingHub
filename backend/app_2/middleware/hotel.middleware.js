const db = require("../models/index.js");

const Hotel = db.hotel;
const Image = db.image;

const hotelControllers = require("../controllers/hotel.controller.js");
const controllers = require("../controllers/controller.js");

exports.createHotel = async (req, res) => {
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner
    if (!isOwner) {
        return res.status(400).send({ message: "Unable to create hotel (is not owner)" });
    }

    let hotelInfo = {
        owner_id: accountData.owner_id,
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        province: req.body.province,
        criteria: req.body.criteria
    }
    let hotelData = await hotelControllers.CreateHotel(Hotel, hotelInfo);
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable to create hotel", err: hotelData.err })
    }

    delete hotelData.owner_id

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
    let result = await hotelControllers.CreateImage(Image, imgData)
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
    let hotelData = await hotelControllers.GetOwnerHotels(Hotel, Image, accountData);
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable to get all owner'hotels", err: hotelData.err })
    }
    return res.status(200).send(hotelData.data);
}

exports.getInfoHotel = async (req, res) => {
    let hotelData = await hotelControllers.GetHotelInfo(req, Hotel, Image);
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
    let result = await hotelControllers.UpdateHotel(req, Hotel, accountData);
    if (result.code === -1) {
        return res.status(400).send({ message: "Hotel is not exists" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update hotel", err: result.err })
    }
    let destroy = await hotelControllers.RemoveImage(req, Image)

    let imgData = [];
    for (let i = 0; i < req.body.imgURL.length; i++) {
        imgData.push({
            imgURL: req.body.imgURL[i],
            hotel_id: req.body.hotel_id,
            isHotelImage: 1
        })
    }

    let resultImage = await hotelControllers.CreateImage(Image, imgData)
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