const { sequelize} = require("../models");

exports.GetReservationInfo = (Reservation, Room, Hotel, condition) => {
    return Reservation.findOne({
        where: condition,
        include: [{
            model: Room,
            include: [{
                model: Hotel
            }]
        }]
    }).then(data => {
        if (data === null) {
            return {code: -1}
        }
        return data.dataValues;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}

exports.GetCommentByHotelId = (Comment, Reservation, Room, User, condition) => {
    return Comment.findAll({
        include: [{
            model: Reservation,
            required: true,
            include: [{
                model: Room,
                required: true,
                where: condition
            }, {
                model: User,
                required: true
            }]
        }],
    }).then(data => {
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
} 

