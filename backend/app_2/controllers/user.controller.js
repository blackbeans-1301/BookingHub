var nodemailer = require('nodemailer')

exports.GetCodeForgotten = () => {
    const getRndInterger = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        } 
        var rand1 = getRndInterger(0, 9);
        var rand2 = getRndInterger(10000, 99999);
        var code = "" + rand1 + rand2;
        return code;
}

exports.SendEmail = (email, code) => {
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bookinghub888@gmail.com',
            pass: 'nqiunuuultpztsoj'
        }
    });
    var mailOptions = {
        from: 'bookinghub888@gmail.com',
        to: email,
        subject: 'BookingHub service',
        html: '<p>Mã xác minh BookingHub của bạn là: ' + code + '</p>'
    };
    mail.sendMail(mailOptions, (err) => {
        if (err) {
            return {code: -2, err: err.message} 
        } else {
            return {code: 1}
        }
    })
    return {code: 1}
}

exports.GetFavoriteList = (userModel, hotelModel, imageModel, condition) => {
    return userModel.findOne({
        where: condition,
        exclude: ['user_id'],
        include: [{
            model: hotelModel,
            include: [{
                model: imageModel,
                exclude: ['hotel_id']
            }]
        }]
    }).then(data => {
        return data.dataValues;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}


exports.GetHistory = (Reservation, Room, Image, Hotel, condition) => {
    return Reservation.findAll({
        where: condition,
        include: [{
            model: Room,
            include: [{
                model: Hotel,
                include: [{
                    model: Image
                }]
            }]
        }]
    }).then(data => {
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
};

exports.ReservationInfo = (Reservation, Comment, Room, Hotel, condition) => {
    return Reservation.findOne({
        where: condition,
        include: [{
            model: Room,
            include: [{
                model: Hotel,
            }]
        }, {
            model: Comment
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