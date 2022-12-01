const db = require("../models/index.js");

const Room = db.room;
const Image = db.image;
const Hotel = db.hotel;
const User = db.user;
const Reservation = db.reservation;



function GetCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

exports.createReservation = (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    let isErr = true;
    if (userData.isOwner) {
        return res.status(400).send({message: "User is owner"});
    } else {
        const reservation = {
            user_id: userData.user_id,
            room_id: req.body.room_id,
            date_in: req.body.date_in,
            date_out: req.body.date_out,
            number_of_rooms: req.body.number_of_rooms
        }
        Reservation.create(reservation).then(data => {
            //console.log(Occupied_room);
            console.log(GetCurrentDate());
        })
    }
}
