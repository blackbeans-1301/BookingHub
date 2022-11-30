const db = require("../models/index.js");

const Room = db.room;
const Image = db.image;
const Hotel = db.hotel;
const User = db.user;

// kiem tra xem room co thuoc user khong
exports.room_isBelongUser = (req, res, next) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    
    if (!userData.isOwner) {
        return res.status(400).send({Message: "User isn't owner"});
    }
    // kiem tra xem room co phai cua user khong
    Hotel.findOne({
        where: {
            hotel_id: req.body.hotel_id,
        },
        attributes: ['hotel_id'],
        include: [
            {
                model: User,
                attributes: ["user_id"]
            }
        ]
    }).then(data => {
        if (data.dataValues.User.user_id !== userData.user_id) {
            return res.status(400).send({Message: "Room doesn't belong to owner"})    
        } else {
            next();
        }
    }).catch(err => {
        return res.status(500).send({Message: "Error on sever-side: " + err})
    })
}

// CREATE ROOM
exports.room_create = async (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    let isErr = false;
    if (!userData.isOwner) {
        return res.status(400).send({Message: "User isn't owner"});
    }
    const room = {
        hotel_id: req.body.hotel_id,
        room_name: req.body.room_name,
        criteria: req.body.criteria,
        price: req.body.price,
        number_of_bed: req.body.number_of_bed,
        status: 0,
    }
    let roomInfo = {}
    await Room.create(room).then(data => {
        roomInfo = data.dataValues
    }).catch(err => {
        isErr = true;
        return res.status(500).send({Message: "An error occurred on the server side (create hotel)" + err})
    })
    if (!isErr) {
        let imgData = [];
        roomInfo.Image = [];
        for (let i = 0 ; i < req.body.imgURL.length; i++)
        {
            imgData.push({
                imgURL: req.body.imgURL[i],
                room_id: roomInfo.room_id,
                isHotelImage: 0
            })
            roomInfo.Image.push({
                imgURL: req.body.imgURL[i]
            })
        }
        await Image.bulkCreate(imgData).then(data => {
        }).catch(err => {
            isErr = true;
            res.status(500).send({Message: "An error occurred on the server side (add image): " + err})
        });
        if (!isErr) {
            res.status(200).send(roomInfo);
        }   
    }   
}

// READ ROOM
exports.room_list = (req, res) => {
    Room.findAll({
        where: { 
            hotel_id: req.body.hotel_id
        },
        attributes: {
            exclude: ['createdAt','updatedAt']
        },
        include: [
            {
                model: Image,
                attributes: ['imgURL']
            }
        ]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        return res.status(500).send({Message: "err in sever-side (getUserHotels)" + err})
    })
}

exports.room_list_empty = (req, res) => {
    Room.findAll({
        where: { 
            hotel_id: req.body.hotel_id,
            status: 0
        },
        attributes: {
            exclude: ['createdAt','updatedAt']
        },
        include: [
            {
                model: Image,
                attributes: ['imgURL']
            }
        ]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        return res.status(500).send({Message: "err in sever-side (getUserHotels)" + err})
    })
}
exports.room_info = (req, res) => {
    Room.findOne({
        where: {
            room_id: req.body.room_id,
        },
        attributes: {
            exclude: ['createdAt','updatedAt']
        },
        include: [
            {
                model: Image,
                attributes: ['imgURL']
            }
        ]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        return res.status(500).send({Message: "error" + err})
    })
}
// UPDATE ROOM

// cap nhat lai room
exports.room_update = async (req, res) => {
    let isErr = false;
    await Room.update({
        room_name: req.body.room_name,
        criteria: req.body.criteria,
        price: req.body.price,
        number_of_bed: req.body.number_of_bed
    },{
        where: {
            room_id: req.body.room_id,
            hotel_id: req.body.hotel_id
        }
    }).then(data => {
        //console.log(data);
        if (!data[0]) {
            isErr = true;
            return res.status(400).send({Message: "Room is not exists"})
        }
    }).catch(err => {
        isErr = true;
        return res.status(500).send({Message: "An error occurred on the server side (update hotel)" + err.message})
    })
    if (!isErr) {
        await Image.destroy({
            where: {room_id: req.body.room_id}
        })
        let imgData = [];
        for (let i = 0 ; i < req.body.imgURL.length; i++)
        {
            imgData.push({
                imgURL: req.body.imgURL[i],
                room_id: req.body.room_id,
                isHotelImage: 0
            })
        }
        await Image.bulkCreate(imgData).then(data => {
        }).catch(err => {
            isErr = true;
            return res.status(500).send({Message: "An error occurred on the server side (add image): " + err})
        })
        if (!isErr) {
            res.status(200).send({Message: "Update successful"})
        }    
    } 
}