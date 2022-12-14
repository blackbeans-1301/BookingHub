const { Op } = require("sequelize");

exports.GetHotelRoomList = (roomModel, imageModel, hotelModel, condition) => {
    return roomModel.findAll({
        where: condition,
        include: [
            {
                model: imageModel,
                attributes: ['imgURL']
            },
            {
                model: hotelModel,
                attributes: ['hotel_id', 'name', 'address' ]
            }
        ]
    }).then(data => {
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}

exports.GetRoomInfo = (roomModel, imageModel, hotelModel, condition) => {
    return roomModel.findOne({
        where: condition,
        include: [
            {
                model: imageModel,
                attributes: ['imgURL']
            },
            {
                model: hotelModel,
                attributes: ['hotel_id', 'name', 'address' ]
            }
        ]
    }).then(data => {
        if (data === null) {
            return {code: -1}
        }
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}


exports.GetRoomCriteria = (roomModel, reservationModel, condition1, condition2) => {
    return roomModel.findAll({
        where: condition1,
        include: [
            {
                model: reservationModel,
                required: false,
                attributes: ['reservation_id', 'date_in', 'date_out', 'status'],
                where: condition2
            }
        ]
    }).then(data => {
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}
