require('dotenv').config();

const db = require("../models/index.js")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = db.user;
const Owner = db.owner;

const userControllers = require("../controllers/user.controller.js")

// Dang ky user DONE
exports.register = async (req, res) => {
    let data;
    if (!parseInt(req.body.isOwner)) {
        data = await userControllers.CreateAccount(req, User);
    } else {
        data = await userControllers.CreateAccount(req, Owner);
    }
    if (data.code === -1) {
        return res.status(400).send({ message: "Email has already existed!" })
    }
    if (data.code === -2) {
        return res.status(400).send({ message: "Failed to create account", err: data.err })
    }
    delete data.dataValues.password;
    delete data.dataValues.createdAt;
    delete data.dataValues.updatedAt;
    return res.status(201).send({ message: "Registered successfully!", accountInfo: data.dataValues })
}

// dang nhap
exports.login = async (req, res) => {
    //tim kiem email trong db
    let data;
    if (req.body.isOwner === undefined) {
        return res.status(401).send({ message: "Failed to login", err: "Losing isOwner property" })
    }
    if (!parseInt(req.body.isOwner)) {
        data = await userControllers.LoginAccount(req, User)
    } else {
        data = await userControllers.LoginAccount(req, Owner)
    }
    if (data.code === -1) {
        return res.status(401).send({ message: "Email or password is incorrect!" })
    }
    if (data.code === -2) {
        return res.status(401).send({ message: "Failed to login", err: data.err })
    }
    return res.status(200).send({ message: "Login successfully!!", assessToken: data.assessToken });
}

// authentication JWT
exports.authenticateJWT = async (req, res, next) => {
    // lay token tu header
    const authHeader = req.header('Authorization');
    // cat chuoi "bearer" ra chi lay token
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Unauthorized!" })
    }
    try {
        // xac thuc token sync
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // kiem tra xem phai user khong
        let dataAccount;
        let condition = {
            email: decodeToken.email
        }
        if (!decodeToken.isOwner) {
            condition.user_id = decodeToken.user_id;
            dataAccount = await userControllers.FindAccount(User, condition)
        } else {
            condition.owner_id = decodeToken.owner_id;
            dataAccount = await userControllers.FindAccount(Owner, condition)
        }
        if (dataAccount.code === -1) {
            return res.status(403).send({ message: "Forbidden!" })
        } else {
            req.bookingHub_account_info = dataAccount.data[0].dataValues;
            req.bookingHub_account_isOwner = decodeToken.isOwner;
            next();
        }
    }
    catch (err) {
        return res.status(401).send({ message: "Unable to verify token!", err })
    }
}

exports.sendUserInfo = async (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticateJWT
    const accountData = req.bookingHub_account_info;
    // xoa bot properties khong gui di 
    delete accountData.owner_id;
    delete accountData.user_id;
    delete accountData.password;
    delete accountData.createdAt;
    delete accountData.updatedAt;
    return res.status(200).send(accountData);
}

// update information
exports.updateUser = async (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticationJWT
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    // update
    let condition = {}
    let result;
    if (!isOwner) {
        condition.user_id = accountData.user_id
        result = await userControllers.UpdateAccount(req, User, condition)
    } else {
        condition.owner_id = accountData.owner_id
        result = await userControllers.UpdateAccount(req, Owner, condition)
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
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    let result;
    let condition = {}
    if (!isOwner) {
        condition.user_id = accountData.user_id
        result = await userControllers.UpdateAvatar(req, User, condition);
    } else {
        condition.owner_id = accountData.owner_id
        result = await userControllers.UpdateAvatar(req, Owner, condition);
    }
    if (result.code === -1) {
        return res.status(400).send({ message: "Unable to update avatar!" })
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update avatar!", err: result.err })
    }
    return res.status(200).send({ message: 'Updated successfully', imgURL: result.imgURL })
}

exports.getAvatar = async (req, res) => {
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    let img;
    let condition = {}
    if (!isOwner) {
        condition.user_id = accountData.user_id;
        img = await userControllers.GetAvatar(User, condition);
    } else {
        condition.owner_id = accountData.owner_id;
        img = await userControllers.GetAvatar(Owner, condition);
    }
    if (img.code === -2) {
        return res.status(400).send({ message: "Unable to get avatar!", err: img.err })
    } 
    return res.status(200).send({ imgURL: img.imgURL });
}

// reset password
exports.resetPassword = async (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticateJWT
    const accountData = req.bookingHub_account_info;
    const isOwner = req.bookingHub_account_isOwner;
    // kiem tra mat khau cu dung khong
    if (!bcrypt.compareSync(req.body.password, accountData.password)) {
        return res.status(400).send({ message: "Wrong old password" })
    }

    // kiem tra mat khau moi co trung mat khau cu khong
    if (req.body.password === req.body.newPassword) {
        return res.status(400).send({ message: "New password must be different from old password!" })
    }

    // ma hoa mat khau moi
    let salt = bcrypt.genSaltSync(10);
    let newPasswordHash = bcrypt.hashSync(req.body.newPassword, salt);

    let result;
    let condition = {}
    // cap nhat mat khau moi vao db
    if (!isOwner) {
        condition.user_id = accountData.user_id;
        result = await userControllers.UpdatePassword(User, condition, newPasswordHash)
    } else {
        condition.owner_id = accountData.owner_id;
        result = await userControllers.UpdatePassword(Owner, condition, newPasswordHash)
    }
    if (result.code === -2) {
        return res.status(400).send({ message: "Unable to update password!", err: result.err })
    }
    return res.status(200).send({ message: 'Updated password successfully!' })
}