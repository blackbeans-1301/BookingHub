const db = require("../models/index.js");
const { Op } = require("sequelize");

const Room = db.room;
const Image = db.image;
const Hotel = db.hotel;
const User = db.user;
const Owner = db.owner;
const Reservation = db.reservation;
const Occupied_room = db.occupied_room;

const controllers = require("../controllers/controller.js"); 

exports.UpdateDatabase = async (req, res, next) => {
    // update status cua reservation
    let value1 = {
        status: "canceled"
    }
    let difference = new Date(Date.now() - (60*60*24*1000))
    let condition1 = {
        status: "waiting",
        date_in: {
            [Op.lte]: difference 
        }
    }
    await controllers.UpdateData(Reservation, value1, condition1)
    
    let value2 = {
        status: "completed"
    }
    let now = new Date();
    let condition2 = {
        status: "located",
        date_out: {
            [Op.lte]: now
        }
    }
    await controllers.UpdateData(Reservation, value2, condition2)

    // update resetCode
    let value3 = {
        resetCode: null,
        timeOfResetCode: null
    }
    let difference2 = new Date(Date.now() - (60*10*1000));
    let condition3 = {
        resetCode: {
            [Op.ne]: null
        },
        timeOfResetCode: {
            [Op.lte]: difference2
        }
    }
    await controllers.UpdateData(User, value3, condition3)
    await controllers.UpdateData(Owner, value3, condition3)
    next()
}

