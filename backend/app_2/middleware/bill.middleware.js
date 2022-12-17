const { Op } = require("sequelize");
const db = require("../models/index.js");

const Bill = db.bill;
const Room = db.room;

const controllers = require("../controllers/controller.js");
const billControllers = require("../controllers/bill.controller.js");

exports.createBill = async (req, res, next) => {
    let billValue = {
        reservation_id: req.body.reservation_id,
        total_price: await billControllers.totalPriceOfReservation(req.body.reservation_id)
    }

    let createdData = await controllers.CreateData(Bill, billValue);
    if (createdData.code === -2) {
        return res.status(400).send({ message: "Unable to create bill", err: createdData.err })
    }

    return res.status(200).send({ message: "Created bill successfully", bill: createdData })
}

exports.calculatePrice = async (req, res, next) => {
    let roomCondition = {
        room_id: {
            [Op.or]: req.body.rooms
        }
    }

    let roomData = await controllers.FindManyData(Room, roomCondition);
    if (roomData.code === -2) {
        return res.status(400).send({ message: "Unable to calculate price", err: roomData.err })
    }

    let totalRoomsPrice = 0;
    for (let i = 0; i < req.body.rooms.length; i++) {
        totalRoomsPrice += roomData[i].price;
    }

    let check_in = new Date(req.body.check_in)
    let check_out = new Date(req.body.check_out)
    let totalDays = billControllers.checkInCheckOutTotalDays(check_in, check_out)

    return res.status(200).send({ totalRoomsPrice, totalDays, total_price: totalRoomsPrice * totalDays })
}