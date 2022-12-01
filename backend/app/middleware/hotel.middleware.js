const { user } = require("../models/index.js");
const db = require("../models/index.js");

const Hotel = db.hotel;
const Image = db.image;

exports.createHotel = async (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    let isErr = false;
    if (!userData.isOwner) {
        isErr = true;
        return res.status(400).send({Message: "User isn't owner"});
    } else {
        const hotel = {
            user_id: userData.user_id,
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            province: req.body.province,
            criteria: req.body.criteria
        }
        let hotelInfo = {}
        await Hotel.create(hotel).then(data => {
            hotelInfo = data.dataValues
            delete hotelInfo.user_id;
            delete hotelInfo.createAt;
            delete hotelInfo.updateAt
        }).catch(err => {
            isErr = true;
            return res.status(500).send({Message: "An error occurred on the server side (create hotel)" + err})
        })
    
        if (!isErr) {
            let imgData = [];
            hotelInfo.Image = [];
            for (let i = 0 ; i < req.body.imgURL.length; i++)
            {
                imgData.push({
                    imgURL: req.body.imgURL[i],
                    hotel_id: hotelInfo.hotel_id,
                    isHotelImage: 1
                })
                hotelInfo.Image.push({
                    imgURL: req.body.imgURL[i]
                })
            }
            await Image.bulkCreate(imgData).then(data => {
            }).catch(err => {
                return res.status(500).send({Message: "An error occurred on the server side (add image): " + err})
            });
            res.status(200).send(hotelInfo);
        }
    }  
}

exports.getUserHotels = (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    if (!userData.isOwner) {
        return res.status(400).send({Message: "User isn't owner"})
    } else {
        Hotel.findAll({
            where: { 
                user_id: userData.user_id 
            },
            attributes: {
                exclude: ['user_id', 'createdAt', 'updatedAt']
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
}

exports.getInfoHotel = (req, res) => {
    Hotel.findOne({
        where: {
            hotel_id: req.params.hotel_id
        },
        attributes: {
            exclude: ['user_id', 'createdAt', 'updatedAt']
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
        return res.status(500).send(err);
    })
}

// update hotel
exports.updateHotel = async (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    let isErr = false;
    if (!userData.isOwner) {
        return res.status(400).send({Message: "User isn't owner"})
    }
    await Hotel.update({
        name: req.body.name,
        criteria: req.body.criteria,
        description: req.body.description,
        address: req.body.address,
        province: req.body.province,
    },{
        where: {
            user_id: userData.user_id,
            hotel_id: req.body.hotel_id
        }
    }).then(data => {
        //console.log(data);
        if (!data[0]) {
            isErr = true;
            return res.status(400).send({Message: "Hotel is not exists"})
        }
    }).catch(err => {
        return res.status(500).send({Message: "An error occurred on the server side (update hotel)" + err.message})
    })
    if (!isErr) {
        await Image.destroy({
            where: {hotel_id: req.body.hotel_id}
        })
        let imgData = [];
        for (let i = 0 ; i < req.body.imgURL.length; i++)
        {
            imgData.push({
                imgURL: req.body.imgURL[i],
                hotel_id: req.body.hotel_id,
                isHotelImage: 1
            })
        }
    
        await Image.bulkCreate(imgData).then(data => {
        }).catch(err => {
            return res.status(500).send({Message: "An error occurred on the server side (add image): " + err})
        })
        res.status(200).send({Message: "Update successful"})
    } 
}
