const db = require("../models/index.js");

const Room = db.room;
const Image = db.image;
const Hotel = db.hotel;
const User = db.user;
const Owner = db.owner;
const Reservation = db.reservation;
const Occupied_room = db.occupied_room;

const controllers = require("../controllers/controller.js"); 

exports.createReservation = async (req, res) => {
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    if (isOwner) {
        return res.status(400).send({ message: "Owner can't create reservation" });
    }
    let valueReservation = {
        user_id: accountData.user_id,
        date_in: req.body.date_in,
        date_out: req.body.date_out,
        number_of_rooms: req.body.room_id.length
    } 

    let dataReservation = await controllers.CreateData(Reservation, valueReservation);
    if (dataReservation.code === -2) {
        return res.status(400).send({message: "Unable to create reservation", err: dataReservation.err})
    }
    
    let valueOccupiedRoom = [];
    for (let i = 0; i < req.body.room_id.length; i++) {
        valueOccupiedRoom.push({
            reservation_id: dataReservation.reservation_id,
            room_id: req.body.room_id[i]
        })
    }

    let dataOccupiedRoom = await controllers.CreateManyData(Occupied_room, valueOccupiedRoom);
    if (dataOccupiedRoom.code === -2) {
        return res.status(400).send({message: "Unable to create reservation", err: dataReservation.err})
    }

    return res.status(200).send({reservation: dataReservation, room: dataOccupiedRoom});
}

exports.isBelongToOwner = async (req, res, next) => {
    const accountData = req.bookingHub_account_info;   
    const isOwner = req.bookingHub_account_isOwner;
    if (!isOwner) {
        return res.status(400).send({message: "Account isn't owner"})
    }
    
    let condition1 = {
        reservation_id: req.body.reservation_id
    }
    let condition2 = {
        owner_id: accountData.owner_id
    }
    let result = await controllers.isBelongToOwner(Reservation, Room, Hotel, Owner, condition1, condition2)
    if (result.code === -1 || result.code === -2) {
        return res.status(400).send({message: "Reservation isn't belong to current owner"})
    }
    if (result.code === 1) {
        next();
    }
}

exports.isBelongToUser = async (req, res, next) => {
    const accountData = req.bookingHub_account_info;   
    const isOwner = req.bookingHub_account_isOwner;
    if (isOwner) {
        return res.status(400).send({message: "Account isn't user"})
    }
    
    let condition = {
        reservation_id: req.body.reservation_id,
        user_id: accountData.user_id
    }
    let result = await controllers.isBelongToUser(Reservation, condition)
    if (result.code === -1 || result.code === -2) {
        return res.status(400).send({message: "Reservation isn't belong to current user"})
    }
    if (result.code === 1) {
        next();
    }
}

// check in
exports.isCheckIn = async (req, res, next) => {
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let dataReservation = await controllers.FindOneData(Reservation, condition);
    if (dataReservation.code === -1) {
        return res.status(400).send({message: "Can't find reservation"})
    }
    if (dataReservation.code === -2) {
        return res.status(400).send({message: "Can't find reservation", err: dataReservation.err})
    }
    if (dataReservation.status !== "waiting" ) {
        return res.status(400).send({message: "Reservation already be checked in or canceled"})
    } 
    next();     
}

exports.checkIn = async (req, res) => {
    let value = {
        check_in: controllers.GetCurrentDateTime(),
        status: "located"
    }
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let result = await controllers.UpdateData(Reservation, value, condition);
    if (result.code === -1) {
        return res.status(400).send({message: "Unable to check in"})
    }
    if (result.code === -2) {
        return res.status(400).send({message: "Unable to check in", err: result.err})
    }
    return res.status(200).send({message: "Checked in!"}) 
}

// check out
exports.isCheckOut = async (req, res, next) => {
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let dataReservation = await controllers.FindOneData(Reservation, condition);
    if (dataReservation.code === -1) {
        return res.status(400).send({message: "Can't find reservation"})
    }
    if (dataReservation.code === -2) {
        return res.status(400).send({message: "Can't find reservation", err: dataReservation.err})
    }
    if (dataReservation.status === "waiting") {
        return res.status(400).send({message: "Reservation haven't checked in yet"})
    }
    if (dataReservation.status !== "located" ) {
        return res.status(400).send({message: "Reservation already be checked out or canceled"})
    } 
    next();
}

exports.checkOut = async (req, res) => {
    let value = {
        check_out: controllers.GetCurrentDateTime(),
        status: "completed"
    }
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let result = await controllers.UpdateData(Reservation, value, condition);
    if (result.code === -1) {
        return res.status(400).send({message: "Unable to check out"})
    }
    if (result.code === -2) {
        return res.status(400).send({message: "Unable to check out", err: result.err})
    }
    return res.status(200).send({message: "Checked out!"}) 
}



// cancel
exports.isCancel = async (req, res, next) => {
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let dataReservation = await controllers.FindOneData(Reservation, condition);
    if (dataReservation.code === -1) {
        return res.status(400).send({message: "Can't find reservation"})
    }
    if (dataReservation.code === -2) {
        return res.status(400).send({message: "Can't find reservation", err: dataReservation.err})
    }
    if (dataReservation.status === "locate" || dataReservation.status === "complete") {
        return res.status(400).send({message: "Reservation has been checked in"})
    }
    if (dataReservation.status === "canceled" ) {
        return res.status(400).send({message: "Reservation has been canceled"})
    } 
    next();
}

exports.cancel = async (req, res) => {
    let value = {
        status: "canceled"
    }
    let condition = {
        reservation_id: req.body.reservation_id
    }
    let result = await controllers.UpdateData(Reservation, value, condition);
    if (result.code === -1) {
        return res.status(400).send({message: "Unable to cancel"})
    }
    if (result.code === -2) {
        return res.status(400).send({message: "Unable to cancel", err: result.err})
    }
    return res.status(200).send({message: "Cancel!"}) 
}

// get list reservations of user
exports.userReservations = async (req, res) => {
    const accountData = req.bookingHub_account_info;   
    const isOwner = req.bookingHub_account_isOwner;
    if (isOwner) {
        return res.status(400).send({message: "Account is not User"})
    }
    let condition = {
        user_id: accountData.user_id,
        status: "waiting"
    }
    let dataReservation = await controllers.FindManyData(Reservation, condition);
    if (dataReservation.code === -2) {
        return res.status(400).send({message: "An error occurred", err: dataReservation.err})
    }
    return res.status(200).send(dataReservation);
}

// get list reservations of hotel
exports.isHotelBelongToOwner = async (req, res, next) => {
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    if (!isOwner) {
        return res.status(400).send({message: "Account is not Owner"})
    }
    let condition = {
        hotel_id: req.params.hotel_id
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
    let dataReservation = await controllers.HotelReservations(Reservation, Room, condition)
    if (dataReservation.code === -2) {
        return res.status(400).send({message: "An error occurred", err: dataReservation.err})
    }
    return res.status(200).send(dataReservation)
}