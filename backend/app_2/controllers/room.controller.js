exports.CheckBelongToUser = (req, roomHotel, ownerModel, accountData) => {
    // kiem tra xem room co phai cua user khong
    return roomHotel.findOne({
        where: {
            hotel_id: req.body.hotel.hotel_id,
        },
        attributes: ['hotel_id'],
        include: [
            {
                model: ownerModel,
                attributes: ["owner_id"]
            }
        ]
    }).then(data => {
        if (data.dataValues.Owner.owner_id !== accountData.owner_id) {
            return {code: -1}
        } 
        return {code: 1}
    }).catch(err => {
        return {code: -2, err: err.message} 
        
    })
}

exports.CreateRoom = (req, roomModel) => {
    return roomModel.create({
        hotel_id: req.body.hotel.hotel_id,
        room_name: req.body.room_name,
        criteria: req.body.criteria,
        price: req.body.price,
        description: req.body.description,
        type_of_room: req.body.type_of_room,
        number_of_bed: req.body.number_of_bed,
        status: 0,
    }).then(data => {
        return data.dataValues
    }).catch(err => {
        return {code: -2, err: err.message}; 
    })
} 

exports.CreateImage = (model, imgData) => {
    return model.bulkCreate(imgData).then(data => {
        return {code: 1}
    }).catch(err => {
        return {code: -2, err: err.message}
    });
}

exports.RemoveImage = (req, model) => {
    return model.destroy({
        where: { room_id: req.body.room_id }
    })
}

exports.GetRoomList = (req, roomModel, imageModel, hotelModel) => {
    return roomModel.findAll({
        where: {
            hotel_id: req.body.hotel.hotel_id
        },
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

exports.GetRoomInfo = (req, roomModel, imageModel, hotelModel) => {
    return roomModel.findOne({
        where: {
            room_id: req.params.room_id,
        },
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

exports.UpdateRoom = (req, roomModel) => {
    return roomModel.update({
        room_name: req.body.room_name,
        criteria: req.body.criteria,
        description: req.body.description,
        price: req.body.price,
        number_of_bed: req.body.number_of_bed
    }, {
        where: {
            room_id: req.body.room_id,
            hotel_id: req.body.hotel.hotel_id
        }
    }).then(data => {
        if (!data[0]) {
            return {code: -1}
            
        }
        return {code: 1}
    }).catch(err => {
        return {code: -2, err: err.message}
        
    })
}
