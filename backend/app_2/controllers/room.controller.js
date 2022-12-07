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
