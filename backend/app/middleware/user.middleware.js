require('dotenv').config();

const db = require("../models/index.js")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.user;

function GetCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function findUserWithEmail(email) {
    return User.findAll({
        where: {
            email: email
        }
    })
}

// register 
// kiem tra email da ton tai chua?
exports.register = async (req, res) => {
    try {
        // lay thong tin body
        const { email, password, firstName, lastName, dob, gender, phone_number, isOwner } = req.body

        const allUsersWithEnterdEmail = await findUserWithEmail(email)

        if (allUsersWithEnterdEmail.length > 0) {
            res.status(400).send({ message: "Email has already existed!" })
            return;
        } else {
            // ma hoa mat khau Sync
            var salt = bcrypt.genSaltSync(10);
            var passwordHash = bcrypt.hashSync(password, salt);
            
            // tao thong tin cho user
            const userInfo = {
                email: email,
                password: passwordHash,
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                member_since: GetCurrentDate(),
                gender: gender,
                phone_number: phone_number,
                isOwner: isOwner
            }

            User.create(userInfo).then(data => {
                console.log(data)
                delete data.dataValues.password;
                delete data.dataValues.createdAt;
                delete data.dataValues.updateAt;
    
                res.status(201).send({ message: "Registered successfully!", user: data.dataValues })
            })
        }
    } catch (err) {
        res.status(400).send({ message: "Failed to create user", err })
    }
}

// login
exports.login = async (req, res, next) => {
    const {email, password, isOwner} = req.body;

    //tim kiem email trong db
    User.findAll ({
        where: {
            email: email,
            isOwner: isOwner
        }
    }).then(data => {
        // kiem tra co email hay khong
        if (!data.length) {
            return res.status(401).send({message: "Email or password is incorrect!"})
        } else {
            // kiem tra password bang bcrypt
            if (bcrypt.compareSync(password, data[0].dataValues.password)) {
                // gui jsonwebtoken (authorization JWT)
                let informationAuth = {
                    user_id: data[0].dataValues.user_id,
                    email: data[0].dataValues.email,
                    isOwner: data[0].dataValues.isOwner
                }
                // ham sign sync nhung neu them params [option] thi no se async
                const assessToken = jwt.sign(informationAuth, process.env.ACCESS_TOKEN_SECRET);
                return res.status(200).send({ message: "Login successfully!", assessToken });
            }
            return res.status(401).send({ message: "Email or password is incorrect!" })
        }
    }).catch(err => res.status(401).send({ message: "Failed to login", err }))
}

// authentication JWT
// Hau het cac request phai cho ham nay vao middleware trc de kiem tra user
exports.authenticateJWT = (req, res, next) => {
    // lay token tu header
    const authHeader = req.header('Authorization');

    // cat chuoi "bearer" ra chi lay token
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).send({ message: "Unauthorized!" })
    try {
        // xac thuc token sync
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // kiem tra user
        User.findAll({
            where: {
                user_id: decodeToken.user_id,
                email: decodeToken.email,
                isOwner: decodeToken.isOwner
            }
        }).then(data => {
            if (data.length) {
                // truyen thong tin cho middleware tiep theo
                req.bookingHub_user_infor = data;
                next();
            } else {
                return res.status(403).send({ message: "Forbidden!" })
            }
        })
    }
    catch (err) {
        return res.status(401).send({ message: "Unable to verify token!", err })
    }
}

exports.sendUserInfo = (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticateJWT
    const userData = req.bookingHub_user_infor[0].dataValues;

    // xoa bot properties khong gui di 
    delete userData.user_id
    delete userData.password;
    delete userData.createdAt;
    delete userData.updatedAt;
    res.status(200).send(userData);
}

// update information
exports.updateUser = (req, res) => {

    // req.bookingHub_user_infor lay tu middleware authenticationJWT
    const userData = req.bookingHub_user_infor[0].dataValues;
    const {firstName, lastName, dob, gender, phone_number} = req.body

    // update
    User.update({
        firstName: firstName,
        lastName:  lastName,
        dob: dob,
        gender: gender,
        phone_number: phone_number,
    },{
        where: {
            user_id: userData.user_id
        }
    }).then(data => {
        res.status(200).send({ message: 'Updated successfully' })
    }).catch(err => {
        return res.status(400).send({ message: "Unable to update user info!", err: err.message })
    })
}

exports.deleteUser = (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticateJWT
    const userData = req.bookingHub_user_infor[0].dataValues;

    User.destroy({
        where: {
            user_id: userData.user_id 
        },
        force: true
    });

    return res.status(200).send({message: "Deleted successfully!"})
}


// avatar
exports.updateAvatar = (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;

    User.update({
        imgURL: req.body.imgURL
    }, {
        where: { user_id: userData.user_id }
    }).then(data => {
        res.status(200).send({ message: 'Updated successfully', imgURL: req.body.imgURL })
    }).catch(err => {
        return res.status(400).send({ message: "Unable to update avatar!", err: err.message })
    })
}

exports.getAvatar = (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;

    User.findOne({
        where: { user_id: userData.user_id }
    }).then(data => {
        res.status(200).send({ imgURL: data.dataValues.imgURL });
    }).catch(err => {
        return res.status(400).send({ message: "Unable to get avatar!", err: err.message })
    })
}


// reset password
exports.resetPassword = (req, res) => {
    // req.bookingHub_user_infor lay tu middleware authenticateJWT
    const userData = req.bookingHub_user_infor[0].dataValues;

    // kiem tra mat khau cu dung khong
    if (!bcrypt.compareSync(req.body.password, userData.password)) {

        return res.status(400).send({ message: "Wrong old password" })
    }

    // kiem tra mat khau moi co trung mat khau cu khong
    if (req.body.password === req.body.newPassword) {
        return res.status(400).send({ message: "New password must be different from old password!" })
    }
    // ma hoa mat khau moi
    let salt = bcrypt.genSaltSync(10);
    let newPasswordHash = bcrypt.hashSync(req.body.newPassword, salt);

    // cap nhat mat khau moi vao db
    User.update({
        password: newPasswordHash
    }, {
        where: { user_id: userData.user_id }
    }).then(data => {
        res.status(200).send({ message: 'Updated password successfully!' })
    }).catch(err => {
        return res.status(400).send({ message: "Unable to update password!", err: err.message })
    })
}