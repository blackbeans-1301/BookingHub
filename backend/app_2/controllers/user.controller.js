const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const GetCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

const findAccountWithEmail = (email, models) => {
    return models.findAll({
        where: {
            email: email
        }
    })
}

exports.CreateAccount = async (req, models) => {
    try {
        const findAccount = await findAccountWithEmail(req.body.email, models)
        if (findAccount.length > 0) {
            return { code: -1 }
        }
        // ma hoa mat khau Sync
        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(req.body.password, salt);

        // tao thong tin cho account
        const accountInfo = {
            email: req.body.email,
            password: passwordHash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            member_since: GetCurrentDate(),
            gender: req.body.gender,
            phone_number: req.body.phone_number,
        }

        return models.create(accountInfo).catch(err => {
            return { code: -2, err: err.message }
        })
    } catch (err) {
        return { code: -2, err: err.message }
    }
}

exports.LoginAccount = (req, models) => {
    return models.findAll({
        where: {
            email: req.body.email,
        }
    }).then(data => {
        // kiem tra co email hay khong
        if (!data.length) {
            return { code: -1 }
        } else {
            // kiem tra password bang bcrypt
            if (bcrypt.compareSync(req.body.password, data[0].dataValues.password)) {
                // gui jsonwebtoken (authorization JWT)
                let informationAuth = {
                    email: data[0].dataValues.email,
                };
                if (!parseInt(req.body.isOwner)) {
                    informationAuth.user_id = data[0].dataValues.user_id
                    informationAuth.isOwner = 0
                    
                } else {
                    informationAuth.owner_id = data[0].dataValues.owner_id
                    informationAuth.isOwner = 1;
                }
                // ham sign sync nhung neu them params [option] thi no se async
                const assessToken = jwt.sign(informationAuth, process.env.ACCESS_TOKEN_SECRET);
                return { code: 1, assessToken: assessToken }
            }
            return { code: -1 }
        }
    }).catch(err => {
        return { code: -2, err: err.message }
    })
}

exports.UpdateAccount = (req, models, condition) => {
    return models.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: req.body.gender,
        phone_number: req.body.phone_number,
    }, {
        where: condition
    }).then(data => {
        if (data[0]) {
            return {code: 1}
        } else {
            return {code: -1}
        }
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}


exports.FindAccount = (models, condition) => {
    return models.findAll({
        where: condition
    }).then(data => {
        if (data.length) {
            // truyen thong tin cho middleware tiep theo
            return { code: 1, data: data }
        } else {
            return { code: -1 }
        }
    })
}

exports.UpdateAvatar = (req, models, condition) => {
    return models.update({
        imgURL: req.body.imgURL
    }, {
        where: condition
    }).then(data => {
        if (data[0]) {
            return {code: 1, imgURL: req.body.imgURL}
        } else {
            return {code: -1}
        }
    }).catch(err => {
        return { code: -2, err: err.message }
    })
}

exports.GetAvatar = (models, condition) => {
    return models.findOne({
        where: condition
    }).then(data => {
        return {code: 1, imgURL: data.dataValues.imgURL}
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}

exports.UpdatePassword = (models, condition, newPasswordHash) => {
    return models.update({
        password: newPasswordHash
    }, {
        where: condition
    }).then(data => {
        return {code: 1} 
        
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}