const { Op } = require("sequelize")
const db = require("../models/index.js")

const Room = db.room
const Image = db.image
const Hotel = db.hotel
const User = db.user
const Owner = db.owner
const Reservation = db.reservation
const Occupied_room = db.occupied_room
const Bill = db.bill
const Favorite = db.favorite
const Comment = db.comment

const hotelControllers = require("../controllers/hotel.controller.js")
const controllers = require("../controllers/controller.js")
const { bill } = require("../models/index.js")


// tao hotel
exports.createHotel = async (req, res) => {
    // lay thong tin tu Token gui ve
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner

    // kiem tra xem co phai owner khong
    if (!isOwner) {
        return res.status(400).send({ message: "Unable to create hotel (is not owner)" })
    }

    // kiem tra province
    if (req.body.province === undefined) {
        return res.status(400).send({ message: "Missing province field" })
    }
    // tao hotel 
    let value = {
        owner_id: accountData.owner_id,
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        phone: req.body.phone,
        fromCenter: req.body.fromCenter,
        province: hotelControllers.GetHotelVietnamese(hotelControllers.removeVietnameseTones(req.body.province).toLowerCase()),
        criteria: req.body.criteria
    }
    let hotelData = await controllers.CreateData(Hotel, value)
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable to create hotel", err: hotelData.err })
    }
    delete hotelData.owner_id
    if (req.body.imgURL === undefined) {
        return res.status(200).send(hotelData)
    }

    // tao image cho hotel
    let imgData = []
    hotelData.Image = []
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
    return res.status(200).send(hotelData)
}

exports.getOwnerHotels = async (req, res) => {
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    if (!isOwner) {
        return res.status(400).send({ message: "User isn't owner" })
    }
    let condition = { owner_id: accountData.owner_id }
    let hotelData = await hotelControllers.GetOwnerHotels(Hotel, Image, condition)
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable to get all owner'hotels", err: hotelData.err })
    }
    return res.status(200).send(hotelData.data)
}

exports.getInfoHotel = async (req, res) => {
    let condition = { hotel_id: req.params.hotel_id }
    let hotelData = await hotelControllers.GetHotelInfo(Hotel, Image, condition)
    if (hotelData.code === -1) {
        return res.status(400).send({ message: "Can't find hotel_id " })
    }
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable get hotel information", err: hotelData.err })
    }
    return res.status(200).send(hotelData)
}

// update hotel
exports.updateHotel = async (req, res) => {
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    if (!isOwner) {
        return res.status(400).send({ message: "User isn't owner" })
    }
    let value1 = {
        name: req.body.name,
        criteria: req.body.criteria,
        description: req.body.description,
        address: req.body.address,
        phone: req.body.phone,
        fromCenter: req.body.fromCenter,
        province: hotelControllers.GetHotelVietnamese(hotelControllers.removeVietnameseTones(req.body.province).toLowerCase()),
    }
    let condition1 = {
        owner_id: accountData.owner_id,
        hotel_id: req.body.hotel_id
    }
    let result = await controllers.UpdateData(Hotel, value1, condition1)
    if (result.code === -1) {
        return res.status(400).send({ message: "Hotel is not exists" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update hotel", err: result.err })
    }


    if (req.body.imgURL === undefined) {
        return res.status(200).send({ message: "Update successful" })
    }
    let condition2 = { hotel_id: req.body.hotel_id }
    let removeImage = await controllers.DeleteData(Image, condition2)

    let imgData = []
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

// delete hotel
exports.deleteHotel = async (req, res) => {
    // xoa room
    let condition = {
        hotel_id: req.body.hotel_id
    }
    let dataRoom = await controllers.FindManyData(Room, condition) 
    console.log(dataRoom)
    if (dataRoom.length) {
        let rooms = [];
        for (let room of dataRoom) {
            rooms.push(room.dataValues.room_id)
        }
        let condition2 = {
            room_id: {
                [Op.or]: rooms 
            } 
        }
        let dataOccupiedRoom = await controllers.FindManyData(Occupied_room, condition2)
        if (dataOccupiedRoom.length) {
            let reservations= [];
            for (let reservation of dataOccupiedRoom) {
                reservations.push(reservation.dataValues.reservation_id)
            }
            let condition3 = {
                reservation_id: {
                    [Op.or]: reservations 
                }
            }
            // xoa binh luan
            let resultDeleteComment = await controllers.DeleteData(Comment, condition3)
            console.log('comment: ', resultDeleteComment)
            // xoa bill
            let resultDeleteBill = await controllers.DeleteData(Bill, condition3)
            console.log('bill: ', resultDeleteBill)
            // xoa reservation
            let resultDeleteReservation = await controllers.DeleteData(Reservation, condition3)
            console.log('reservation: ', resultDeleteReservation)
        }
        // xoa hinh anh cua room
        let resultDeleteRoomImage = await controllers.DeleteData(Image, condition2)
        console.log('room image: ', resultDeleteRoomImage)
        // xoa occupied room
        let resultDeleteOccupiedRoom = await controllers.DeleteData(Occupied_room, condition2)
        console.log('room image: ', resultDeleteOccupiedRoom)
    }
    // xoa room
    let resultDeleteRoom= await controllers.DeleteData(Room, condition);
    // xoa image
    let resultDeleteHotelImage = await controllers.DeleteData(Image, condition);
    // xoa favorite
    let resultDeleteFavorite = await controllers.DeleteData(Favorite, condition)
    // xoa hotel
    let resultDeleteHotel = await controllers.DeleteData(Hotel, condition);
    return res.status(200).send({message: "Delete successfully"})
}
exports.hotelByAddress = async (req, res) => {
    let condition = {
        province: hotelControllers.GetHotelVietnamese(hotelControllers.removeVietnameseTones(req.body.province).toLowerCase())
    }
    let hotelData = await hotelControllers.GetHotelByAddress(Hotel, Image, condition)
    if (hotelData.code === -2) {
        return res.status(400).send({ message: "Unable to get hotel by address", err: hotelData.err })
    }
    return res.status(200).send(hotelData)
}

// kiem tra xem hotel co thuoc owner khong
exports.isHotelBelongToOwner = async (req, res, next) => {
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    if (!isOwner) {
        return res.status(400).send({ message: "Account isn't owner" })
    }
    let condition = {}
    if (req.body.hotel_id === undefined) {
        if (req.body.hotel === undefined) {
            if (req.params.hotel_id === undefined) {
                return res.status(400).send({ message: "Missing hotel object (hotel_id) field" })
            }
            condition.hotel_id = req.params.hotel_id
        } else {
            condition.hotel_id = req.body.hotel.hotel_id
        }
    } else {
        condition.hotel_id = req.body.hotel_id
    }
    
    let result = await controllers.FindOneData(Hotel, condition)
    if (result.code === -1) {
        return res.status(400).send({ message: "Hotel isn't exist" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Hotel isn't exist", err: result.err })
    }
    if (result.owner_id !== accountData.owner_id) {
        return res.status(400).send({ message: "Hotel isn't belong to owner" })
    }
    next()
}

exports.hotelReservations = async (req, res) => {
    let condition = {
        hotel_id: req.params.hotel_id
    }
    let dataReservation = await hotelControllers.HotelReservations(Reservation, Room, condition)
    if (dataReservation.code === -2) {
        return res.status(400).send({ message: "An error occurred", err: dataReservation.err })
    }
    return res.status(200).send(dataReservation)
}

exports.getHotelByCriteria = async (req, res) => {
    if (req.body.province === undefined || req.body.date_in === undefined
        || req.body.date_out === undefined || req.body.number_of_guest === undefined || req.body.number_of_room === undefined) {
        return res.status(400).send({ message: "Unable to get hotel (missing field)" })
    }
    req.body.date_in = controllers.GetDateTimeFromDate(req.body.date_in)
    req.body.date_out = controllers.GetDateTimeFromDate(req.body.date_out)
    let condition1 = {
        province: hotelControllers.GetHotelVietnamese(hotelControllers.removeVietnameseTones(req.body.province).toLowerCase())
    }
    let condition2 = {
        status: {
            [Op.or]: ['located', 'waiting']
        },
        [Op.or]: [
            {
                date_in: {
                    [Op.gte]: new Date(req.body.date_in),
                    [Op.lte]: new Date(req.body.date_out)
                }
            },
            {
                date_out: {
                    [Op.gte]: new Date(req.body.date_in),
                    [Op.lte]: new Date(req.body.date_out)
                }
            }
        ]
    }
    let data = await hotelControllers.GetHotelCriteria(Hotel, Room, Reservation, Image, condition1, condition2)
    if (data.code === -2) {
        return res.status(400).send({ message: "Unable to get hotel", err: data.err })
    }
    for (let hotel of data) {
        hotel.dataValues.totalCapacity = 0
        hotel.dataValues.totalEmptyRoom = 0
        for (let room of hotel.dataValues.Rooms) {
            if (!room.dataValues.Reservations.length) {
                hotel.dataValues.totalCapacity += room.dataValues.capacity
                hotel.dataValues.totalEmptyRoom++
            }
        }
    }
    // kiem tra rating va khoi tao gia tri rating
    let ratingDefault = 0;
    let priceDefault = 1;
    if (req.body.rating !== undefined && parseFloat(req.body.rating) > 1) {
        ratingDefault = parseFloat(req.body.rating)
        if (ratingDefault < 1 || ratingDefault > 5) {
            return res.status(400).send({ message: "Rating must be between 1 and 5" })
        }
    }
    if (req.body.price !== undefined) {
        priceDefault = parseFloat(req.body.price)
        if (priceDefault < 1 || priceDefault > 6) {
            return res.status(400).send({ message: "Price must be between 1 and 6" })
        }
    }
    // lay ra room theo rating, so phong, so nguoi
    for (let h = 0; h < data.length; h++) {
        delete data[h].dataValues.Rooms
        if (data[h].dataValues.totalCapacity < req.body.number_of_guest || data[h].dataValues.totalEmptyRoom < req.body.number_of_room
            || data[h].dataValues.rating < ratingDefault) {
            data.splice(h, 1)
            h--
        }
    }
    // lay ra room theo price
    for (let h = 0; h < data.length; h++) {
        if (priceDefault === 1 && (data[h].dataValues.startPrice > 50 || data[h].dataValues.startPrice < 0)) {
            data.splice(h, 1)
            h--
        }
        if (priceDefault === 2 && (data[h].dataValues.startPrice > 200 || data[h].dataValues.startPrice < 50)) {
            data.splice(h, 1)
            h--
        }
        if (priceDefault === 3 && (data[h].dataValues.startPrice > 400 || data[h].dataValues.startPrice < 200)) {
            data.splice(h, 1)
            h--
        }
        if (priceDefault === 4 && (data[h].dataValues.startPrice > 600 || data[h].dataValues.startPrice < 400)) {
            data.splice(h, 1)
            h--
        }
        if (priceDefault === 5 && (data[h].dataValues.startPrice > 1000 || data[h].dataValues.startPrice < 600)) {
            data.splice(h, 1)
            h--
        }
        if (priceDefault === 6 && data[h].dataValues.startPrice < 1000) {
            data.splice(h, 1)
            h--
        }
    }

    return res.status(200).send(data)

}

exports.calculateIncome = async function (req, res) {
    let data = await Bill.findAll({
        include: {
            model: Reservation,
            include: {
                model: Room,
                include: {
                    model: Hotel,
                    where: {
                        hotel_id: req.params.hotel_id
                    }
                }
            }
        }
    }).then(data => {
        return data;
    }).catch(err => {
        return { code: -2, err: err.message }
    })


    if (data.code === -2) {
        return res.status(400).send({ message: "Unable to calculate income", err: data.err })
    }

    let totalIncome = 0;
    for (let i = 0; i < data.length; i++) {
        totalIncome += data[i].total_price
    }

    return res.status(200).send({ totalIncome })
}