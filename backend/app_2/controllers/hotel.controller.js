
exports.CreateHotel = (hotelModel, hotelInfo) => {
    return hotelModel.create(hotelInfo).then(data => {
        return data.dataValues
    }).catch(err => {
        return {code: -2, err: err.message}
        //res.status(500).send({Message: "An error occurred on the server side (create hotel)" + err})
    })
}

exports.CreateImage = (model, imgData) => {
    return model.bulkCreate(imgData).then(data => {
        return {code: 1}
    }).catch(err => {
        return {code: -2, err: err.message}
    });
}

exports.GetOwnerHotels = (hotelModel, imageModel, accountData) => {
    return hotelModel.findAll({
        where: {
            owner_id: accountData.owner_id
        },
        attributes: {
            exclude: ['user_id']
        },
        include: [
            {
                model: imageModel,
                attributes: ['imgURL']
            }
        ]
    }).then(data => {
        return {code: 1, data: data}
    }).catch(err => {
        return {code: -2, err: err.message}
        
    })
}

exports.GetHotelInfo = (req, hotelModel, imageModel) => {
    return hotelModel.findOne({
        where: {
            hotel_id: req.params.hotel_id
        },
        attributes: {
            exclude: ['user_id']
        },
        include: [
            {
                model: imageModel,
                attributes: ['imgURL']
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

exports.UpdateHotel = (req, hotelModel, accountData) => {
    return hotelModel.update({
        name: req.body.name,
        criteria: req.body.criteria,
        description: req.body.description,
        address: req.body.address,
        province: req.body.province,
    }, {
        where: {
            owner_id: accountData.owner_id,
            hotel_id: req.body.hotel_id
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

exports.RemoveImage = (req, model) => {
    return model.destroy({
        where: { hotel_id: req.body.hotel_id }
    })
}


