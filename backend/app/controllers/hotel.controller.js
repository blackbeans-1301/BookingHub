const db = require("../models/index.js");

const Hotel = db.hotel;
const Image = db.image;

exports.createHotel = async (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    if (!userData.isOwner) {
        return res.status(400).send({Message: "User isn't owner"});
    }
    const hotel = {
        user_id: userData.user_id,
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        province: req.body.province
    }
    let hotelInfo = {}
    await Hotel.create(hotel).then(data => {
        hotelInfo = data.dataValues
    }).catch(err => {
        return res.status(500).send({Message: "An error occurred on the server side (create hotel)"})
    })
    let imgData = [];
    hotelInfo.imgURL = req.body.imgURL;
    for (let i = 0 ; i < req.body.imgURL.length; i++)
    {
        imgData.push({
            imgURL: req.body.imgURL[i],
            hotel_id: hotelInfo.hotel_id,
            isHotelImage: 1
        })
    }
    await Image.bulkCreate(imgData).then(data => {
    }).catch(err => {
        res.status(500).send({Message: "An error occurred on the server side (add image): " + err})
    });
    res.send(hotelInfo);
}

