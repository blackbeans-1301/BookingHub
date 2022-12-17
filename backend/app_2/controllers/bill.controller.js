const db = require("../models/index.js");
const Reservation = db.reservation;
const Room = db.room;

exports.totalPriceOfReservation = async function (id) {
    let reservationData = await this.getRoomsOfReservation(id);
    let total_price = 0;
    for (let i = 0; i < reservationData.number_of_rooms; i++) {
        total_price += reservationData.Rooms[i].price;
    }
    total_price *= this.checkInCheckOutTotalDays(reservationData.check_in, reservationData.check_out);

    return total_price;
}

// thời gian check out của 1 ngày là 12:00pm
exports.checkInCheckOutTotalDays = function (check_in, check_out) {
    let differenceInMilisec = check_out - check_in;
    let differenceInsec = differenceInMilisec / 1000;
    let differenceInHour = differenceInsec / 3600;
    let differenceInDays = Math.floor(differenceInHour / 24);

    if (differenceInHour < 24) return 1;

    if (check_in.getHours() >= 12 && check_out.getHours() <= 12) {
        differenceInDays++;
    }
    if (check_in.getHours() < 12) {
        differenceInDays++;
    }
    if (check_out.getHours() > 12) {
        differenceInDays++;
    }

    return differenceInDays;
}

exports.getRoomsOfReservation = function (id) {
    return Reservation.findOne({
        where: {
            reservation_id: id
        },
        include: {
            model: Room
        }
    }).then(data => {
        return data;
    }).catch(err => {
        return { code: -2, err: err.message }
    })
}