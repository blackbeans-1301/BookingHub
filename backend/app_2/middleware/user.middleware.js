require('dotenv').config()

const db = require("../models/index.js")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const Room = db.room
const Image = db.image
const Hotel = db.hotel
const User = db.user
const Owner = db.owner
const Reservation = db.reservation
const Occupied_room = db.occupied_room

const controllers = require("../controllers/controller.js")
const userControllers = require("../controllers/user.controller.js");

// Dang ky account
exports.register = async (req, res) => {
    // kiem tra xem thieu truong isOwner khong
    if (req.body.isOwner === undefined) {
        return res.status(400).send({ message: "Missing isOwner field!" })
    }

    // tim kiem xem trong database da ton tai email chua
    let condition = {
        email: req.body.email
    }
    let findAccount
    if (!parseInt(req.body.isOwner)) {
        findAccount = await controllers.FindManyData(User, condition)
    } else {
        findAccount = await controllers.FindManyData(Owner, condition)
    }
    if (findAccount.code !== -2 && findAccount.length !== 0) {
        return res.status(400).send({ message: "Email has already existed!" })
    }

    // tao mat khau ma hoa 
    var salt = bcrypt.genSaltSync(10)
    var passwordHash = bcrypt.hashSync(req.body.password, salt)

    // tao email sau khi da kiem tra va ma hoa
    let value = {
        email: req.body.email,
        password: passwordHash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        member_since: controllers.GetCurrentDate(),
        gender: req.body.gender,
        phone_number: req.body.phone_number,
    }
    let dataAccount
    if (!parseInt(req.body.isOwner)) {
        dataAccount = await controllers.CreateData(User, value)
    } else {
        dataAccount = await controllers.CreateData(Owner, value)
    }
    if (dataAccount.code === -2) {
        return res.status(400).send({ message: "Failed to create account", err: dataAccount.err })
    }
    delete dataAccount.user_id
    delete dataAccount.password
    delete dataAccount.createdAt
    delete dataAccount.updatedAt
    return res.status(200).send(dataAccount)
}

//dang nhap
exports.login = async (req, res) => {
    // kiem tra xem thieu truong isOwner khong
    if (req.body.isOwner === undefined) {
        return res.status(400).send({ message: "Missing isOwner field!" })
    }
    if (req.body.password === undefined) {
        return res.status(400).send({ message: "Missing password field!" })
    }

    // kiem tra xem co email trong database khong
    let condition = {
        email: req.body.email
    }
    let dataAccount
    if (!parseInt(req.body.isOwner)) {
        dataAccount = await controllers.FindManyData(User, condition)
    } else {
        dataAccount = await controllers.FindManyData(Owner, condition)
    }
    if (dataAccount.code === -2) {
        return res.status(400).send({ message: "Failed to login", err: dataAccount.err })
    }
    if (!dataAccount.length) {
        return res.status(400).send({ message: "Email or password is incorrect!" })
    }

    // kiem tra mat khau
    if (!bcrypt.compareSync(req.body.password, dataAccount[0].dataValues.password)) {
        return res.status(400).send({ message: "Email or password is incorrect!" })
    }

    // tao token JWT
    let informationAuth = {
        email: dataAccount[0].dataValues.email,
    }
    if (!parseInt(req.body.isOwner)) {
        informationAuth.user_id = dataAccount[0].dataValues.user_id
        informationAuth.isOwner = 0
    } else {
        informationAuth.owner_id = dataAccount[0].dataValues.owner_id
        informationAuth.isOwner = 1
    }
    const assessToken = jwt.sign(informationAuth, process.env.ACCESS_TOKEN_SECRET)

    return res.status(200).send({ message: "Login successfully!!", assessToken: assessToken })
}

// authentication JWT
exports.authenticateJWT = async (req, res, next) => {
    console.log(21341242134)
    console.log(req)
    // lay token tu header
    const authHeader = req.header('Authorization')
    // cat chuoi "bearer" ra chi lay token
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send({ message: "Unauthorized!" })
    }
    try {
        // xac thuc token sync
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        // xac thuc thong tin token
        let dataAccount
        let condition = {
            email: decodeToken.email
        }
        if (!decodeToken.isOwner) {
            condition.user_id = decodeToken.user_id
            dataAccount = await controllers.FindManyData(User, condition)
        } else {
            condition.owner_id = decodeToken.owner_id
            console.log()
            dataAccount = await controllers.FindManyData(Owner, condition)
        }
        if (dataAccount.length === 0 || dataAccount.code === -2) {
            return res.status(403).send({ message: "Forbidden!" })
        } else {
            req.bookingHub_account_info = dataAccount[0].dataValues
            req.bookingHub_account_isOwner = decodeToken.isOwner
            console.log("next 534t2856234856")
            next()
        }
    }
    catch (err) {
        console.log(3425)
        return res.status(401).send({ message: "Unable to verify token!", err })
    }
}

exports.sendUserInfo = async (req, res) => {
    console.log(req)
    // req.bookingHub_user_infor lay tu middleware authenticateJWT
    const accountData = req.bookingHub_account_info

    // xoa bot properties khong gui di 
    delete accountData.owner_id
    delete accountData.user_id
    delete accountData.password
    delete accountData.createdAt
    delete accountData.updatedAt
    return res.status(200).send(accountData)
}

// update information
exports.updateUser = async (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticationJWT
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner

    // update
    let condition = {}
    let result
    let value = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
    }
    if (!isOwner) {
        condition.user_id = accountData.user_id
        result = await controllers.UpdateData(User, value, condition)
    } else {
        condition.owner_id = accountData.owner_id
        result = await controllers.UpdateData(Owner, value, condition)
    }
    if (result.code === -1) {
        return res.status(400).send({ message: 'Unable to update user info!' })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update user info!", err: result.err })
    }
    return res.status(200).send({ message: 'Updated successfully' })
}


// avatar
exports.updateAvatar = async (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticateJWT
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    let result
    let value = {
        imgURL: req.body.imgURL
    }
    let condition = {}
    if (!isOwner) {
        condition.user_id = accountData.user_id
        result = await controllers.UpdateData(User, value, condition)
    } else {
        condition.owner_id = accountData.owner_id
        result = await controllers.UpdateData(Owner, value, condition)
    }
    if (result.code === -1) {
        return res.status(400).send({ message: "Unable to update avatar!" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update avatar!", err: result.err })
    }
    return res.status(200).send({ message: 'Updated successfully', imgURL: req.body.imgURL })
}

exports.getAvatar = async (req, res) => {
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    let img
    let condition = {}
    if (!isOwner) {
        condition.user_id = accountData.user_id
        img = await controllers.FindOneData(User, condition)
    } else {
        condition.owner_id = accountData.owner_id
        img = await controllers.FindOneData(Owner, condition)
    }
    if (img.code === -2) {
        return res.status(400).send({ message: "Unable to get avatar!", err: img.err })
    }
    return res.status(200).send({ imgURL: img.imgURL })
}

// reset password
exports.resetPassword = async (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticateJWT
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    // kiem tra mat khau cu dung khong
    if (!bcrypt.compareSync(req.body.password, accountData.password)) {
        return res.status(400).send({ message: "Wrong old password" })
    }

    // kiem tra mat khau moi co trung mat khau cu khong
    if (req.body.password === req.body.newPassword) {
        return res.status(400).send({ message: "New password must be different from old password!" })
    }

    // ma hoa mat khau moi
    let salt = bcrypt.genSaltSync(10)
    let newPasswordHash = bcrypt.hashSync(req.body.newPassword, salt)

    let result
    let value = {
        password: newPasswordHash
    }
    let condition = {}
    // cap nhat mat khau moi vao db
    if (!isOwner) {
        condition.user_id = accountData.user_id
        result = await controllers.UpdateData(User, value, condition)
    } else {
        condition.owner_id = accountData.owner_id
        result = await controllers.UpdateData(Owner, value, condition)
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update password!", err: result.err })
    }
    return res.status(200).send({ message: 'Updated password successfully!' })
}

// get list reservations of user
exports.userReservations = async (req, res) => {
    const accountData = req.bookingHub_account_info
    const isOwner = req.bookingHub_account_isOwner
    if (isOwner) {
        return res.status(400).send({ message: "Account is not User" })
    }
    let condition = {
        user_id: accountData.user_id,
        status: {
            [Op.or]: ['located', 'waiting']
        }, 
    }
    let dataReservation = await controllers.FindManyData(Reservation, condition)
    if (dataReservation.code === -2) {
        return res.status(400).send({ message: "An error occurred", err: dataReservation.err })
    }
    return res.status(200).send(dataReservation)
}

// forget password
exports.sendEmail = async (req, res) => {
    // create code
    const newCode = userControllers.GetCodeForgotten();
    let condition = {
        email: req.body.email
    }
    let value = {
        resetCode: newCode,
        timeOfResetCode: new Date()
    }
    // update code to Database
    let resultUpdate;
    if (req.body.isOwner === undefined) {
        return res.status(400).send({message: "Missing isOwner field"})
    }
    if (parseInt(req.body.isOwner)) {
        resultDelete = await controllers.UpdateData(Owner, value, condition)
    } else {
        resultUpdate = await controllers.UpdateData(User, value, condition);
    }
    if (resultUpdate.code === -1) {
        return res.status(400).send({message: "Wrong email"})
    }
    if (resultUpdate.code === -2) {
        return res.status(400).send({message: "Wrong email", err: resultUpdate.err})
    }

    // send code to gmail
    let resultSendEmail = userControllers.SendEmail(req.body.email, newCode);
    if (resultSendEmail.code === -2) {
        return res.status(400).send({message: "Unable to send code to email", err: resultSendEmail.err})
    }

    return res.status(200).send({message: "Send code to email successfully"});
}

exports.resetPasswordByCode = async (req, res) => {
    // kiem tra input
    if (req.body.code === undefined || req.body.code === null 
        || req.body.code.length !== 6) {
        return res.status(400).send({message: "Wrong code"});
    }
    if (req.body.isOwner === undefined) {
        return res.status(400).send({message: "Missing isOwner field"})
    }

    // tim user
    let dataAccount;
    let condition = {
        email: req.body.email
    }
    if (parseInt(req.body.isOwner)) {
        dataAccount = await controllers.FindOneData(Owner, condition)
    } else {
        dataAccount = await controllers.FindOneData(User, condition)
    }
    if (dataAccount.code === -1) {
        return res.status(400).send({ message: "Wrong email"})
    }
    if (dataAccount.code === -2) {
        return res.status(400).send({ message: "Wrong email", err: dataAccount.err })
    }

    // kiem tra code dung khong
    if (req.body.code !== dataAccount.resetCode) {
        return res.status(400).send({ message: "Wrong code"})
    }

    // tao mat khau moi
    let salt = bcrypt.genSaltSync(10)
    let newPasswordHash = bcrypt.hashSync(req.body.newPassword, salt)

    // xoa code trong database va reset mat khau
    let value = {
        password: newPasswordHash,
        resetCode: null,
        timeOfResetCode: null
    }
    let resultUpdate;
    if (parseInt(req.body.isOwner)) {
        resultDelete = await controllers.UpdateData(Owner, value, condition)
    } else {
        resultDelete = await controllers.UpdateData(User, value, condition)
    }
    if (resultDelete.code === -1) {
        return res.status(400).send({message: "Wrong email"})
    }
    if (resultDelete.code === -2) {
        return res.status(400).send({message: "Unable to reset password", err: resultDelete.err})
    }
    return res.status(200).send({message: "Reset password successfully"})
}