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