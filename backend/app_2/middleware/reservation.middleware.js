const { Op } = require("sequelize")

const db = require("../models/index.js")

const Room = db.room
const Image = db.image
const Hotel = db.hotel
const User = db.user
const Owner = db.owner
const Reservation = db.reservation
const Occupied_room = db.occupied_room

const controllers = require("../controllers/controller.js")
const reservationControllers = require("../controllers/reservation.controller.js")

exports.checkInfoReservation = async (req, res, next) => {
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    if (isOwner) {
        return res.status(400).send({ message: "Owner can't create reservation" })
    }
    // kiem tra request co room_id khong
    if (req.body.room_id === undefined || req.body.room_id.length === 0) {
        return res.status(400).send({ message: "room_id field can't be empty or undefined" })
    }

    // check date co hop le khong
    let dateIn = new Date(req.body.date_in)
    let dateOut = new Date(req.body.date_out)
    let dateNow = new Date(Date.now() - (60*60*24*1000))
    if (dateIn < dateNow) {
        return res.status(400).send({ message: "date_in can't be less than now" })
    }
    if (dateIn > dateOut) {
        return res.status(400).send({ message: "date_in can't be greater than date_out" })
    }

    // reservation info 
    let condition1 = {
        room_id: {
            [Op.or]: req.body.room_id
        }
    }
    // check cac room duoc dat co cung 1 hotel hay k
    let data = await controllers.FindManyData(Room, condition1)
    if (data.code === -2) {
        return res.status(400).send({ message: "Can't find room", err: data.err })
    }

    for (var i = 1; i < data.length; i++) {
        if (data[i].dataValues.hotel_id !== data[i - 1].dataValues.hotel_id) {
            return res.status(400).send({ message: "Rooms aren't in the same hotel" })
        }
    }

    // check room da bi dat trong ngay date_in -> date_out chua    
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
    let dataRoom = await reservationControllers.CheckReservationInfo(Reservation, Room, condition1, condition2)
    if (dataRoom.length) {
        return res.status(400).send({ message: "Room is already booked" })
    }
    next()

}
exports.createReservation = async (req, res) => {
    const accountData = req.bookingHub_account_info

    let valueReservation = {
        user_id: accountData.user_id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        date_in: req.body.date_in,
        date_out: req.body.date_out,
        number_of_rooms: req.body.room_id.length
    }

    let dataReservation = await controllers.CreateData(Reservation, valueReservation)
    if (dataReservation.code === -2) {
        return res.status(400).send({ message: "Unable to create reservation1", err: dataReservation.err })
    }

    let valueOccupiedRoom = []
    for (let i = 0; i < req.body.room_id.length; i++) {
        valueOccupiedRoom.push({
            reservation_id: dataReservation.reservation_id,
            room_id: req.body.room_id[i]
        })
    }
    let dataOccupiedRoom = await controllers.CreateManyData(Occupied_room, valueOccupiedRoom)
    if (dataOccupiedRoom.code === -2) {
        let result = await controllers.DeleteData(Reservation, { reservation_id: dataReservation.reservation_id })
        return res.status(400).send({ message: "Unable to create reservation (room is not exist)", err: dataOccupiedRoom.err })
    }

    return res.status(200).send({ reservation: dataReservation, room: dataOccupiedRoom })
}

exports.isBelongToOwner = async (req, res, next) => {
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    if (!isOwner) {
        return res.status(400).send({ message: "Account isn't owner" })
    }
    let condition1 = {}
    if (req.body.reservation_id === undefined) {
        if (req.params.reservation_id === undefined) {
            return res.status(400).send({ message: "Missing reservation_id field" })
        }
        condition1.reservation_id = req.params.reservation_id
    } else {
        condition1.reservation_id = req.body.reservation_id
    }

    let condition2 = {
        owner_id: accountData.owner_id
    }
    let result = await reservationControllers.isBelongToOwner(Reservation, Room, Hotel, Owner, condition1, condition2)
    if (result.code === -1 || result.code === -2) {
        return res.status(400).send({ message: "Reservation isn't belong to current owner" })
    }
    if (result.code === 1) {
        next()
    }
}

exports.isBelongToUser = async (req, res, next) => {
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    if (isOwner) {
        return res.status(400).send({ message: "Account isn't user" })
    }

    let condition = {
        user_id: accountData.user_id
    }

    if (req.body.reservation_id === undefined) {
        if (req.params.reservation_id === undefined) {
            return res.status(400).send({ message: "Missing reservation_id field" })
        }
        condition.reservation_id = req.params.reservation_id
    } else {
        condition.reservation_id = req.body.reservation_id
    }

    let result = await reservationControllers.isBelongToUser(Reservation, condition)
    if (result.code === -1 || result.code === -2) {
        return res.status(400).send({ message: "Reservation isn't belong to current user" })
    }
    if (result.code === 1) {
        next()
    }
}

// check in
exports.isCheckIn = async (req, res, next) => {
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let dataReservation = await controllers.FindOneData(Reservation, condition)
    if (dataReservation.code === -1) {
        return res.status(400).send({ message: "Can't find reservation" })
    }
    if (dataReservation.code === -2) {
        return res.status(400).send({ message: "Can't find reservation", err: dataReservation.err })
    }

    let now = new Date()
    if (new Date(dataReservation.date_in) > now) {
        return res.status(400).send({ message: "It's not time to check in yet" })
    }
    if (dataReservation.status !== "waiting") {
        return res.status(400).send({ message: "Reservation already be checked in or canceled" })
    }
    next()
}

exports.checkIn = async (req, res) => {
    let value = {
        check_in: controllers.GetCurrentDateTime(),
        status: "located"
    }
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let result = await controllers.UpdateData(Reservation, value, condition)
    if (result.code === -1) {
        return res.status(400).send({ message: "Unable to check in" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to check in", err: result.err })
    }
    return res.status(200).send({ message: "Checked in!" })
}

// check out
exports.isCheckOut = async (req, res, next) => {
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let dataReservation = await controllers.FindOneData(Reservation, condition)
    if (dataReservation.code === -1) {
        return res.status(400).send({ message: "Can't find reservation" })
    }
    if (dataReservation.code === -2) {
        return res.status(400).send({ message: "Can't find reservation", err: dataReservation.err })
    }
    if (dataReservation.status === "waiting") {
        return res.status(400).send({ message: "Reservation haven't checked in yet" })
    }
    if (dataReservation.status !== "located") {
        return res.status(400).send({ message: "Reservation already be checked out or canceled" })
    }
    next()
}

exports.checkOut = async (req, res) => {
    let value = {
        check_out: controllers.GetCurrentDateTime(),
        status: "completed"
    }
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let result = await controllers.UpdateData(Reservation, value, condition)
    if (result.code === -1) {
        return res.status(400).send({ message: "Unable to check out" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to check out", err: result.err })
    }
    return res.status(200).send({ message: "Checked out!" })
}



// cancel
exports.isCancel = async (req, res, next) => {
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let dataReservation = await controllers.FindOneData(Reservation, condition)
    if (dataReservation.code === -1) {
        return res.status(400).send({ message: "Can't find reservation" })
    }
    if (dataReservation.code === -2) {
        return res.status(400).send({ message: "Can't find reservation", err: dataReservation.err })
    }
    if (dataReservation.status === "locate" || dataReservation.status === "complete") {
        return res.status(400).send({ message: "Reservation has been checked in" })
    }
    if (dataReservation.status === "canceled") {
        return res.status(400).send({ message: "Reservation has been canceled" })
    }
    next()
}

exports.cancel = async (req, res) => {
    let value = {
        status: "canceled"
    }
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let result = await controllers.UpdateData(Reservation, value, condition)
    if (result.code === -1) {
        return res.status(400).send({ message: "Unable to cancel" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to cancel", err: result.err })
    }
    return res.status(200).send({ message: "Cancel!" })
}




