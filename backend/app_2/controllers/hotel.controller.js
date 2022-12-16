const { Op, Sequelize } = require("sequelize")
const { sequelize } = require("../models")

exports.GetOwnerHotels = (hotelModel, imageModel, condition) => {
    return hotelModel.findAll({
        where: condition,
        attributes: {
            exclude: ['owner_id']
        },
        include: [
            {
                model: imageModel,
                attributes: ['imgURL']
            }
        ]
    }).then(data => {
        return { code: 1, data: data }
    }).catch(err => {
        return { code: -2, err: err.message }
    })
}

exports.GetHotelInfo = (hotelModel, imageModel, condition) => {
    return hotelModel.findOne({
        where: condition,
        attributes: {
            exclude: ['owner_id']
        },
        include: [
            {
                model: imageModel,
                attributes: ['imgURL']
            }
        ]
    }).then(data => {
        if (data === null) {
            return { code: -1 }
        }
        return data.dataValues;
    }).catch(err => {
        return { code: -2, err: err.message }
    })
}

exports.HotelReservations = (Reservation, Room, condition) => {
    return Reservation.findAll({
        include: [{
            model: Room,
            where: condition
        }]
    }).then(data => {
        return data;
    }).catch(err => {
        return { code: -2, err: err.message }
    })
}

exports.GetHotelCriteria = (Hotel, Room, Reservation, condition1, condition2) => {
    return Hotel.findAll({
            where: condition1,
            include: [{
                model: Room,
                include: [{
                    model: Reservation,
                    required: false,
                    where: condition2,
                }],
            }],
    }).then(data => {
        return data;
    }).catch(err => {
        return { code: -2, err: err.message }
    })
};