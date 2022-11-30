require("dotenv").config();

const db = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const User = db.user;

function GetCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

// register
// kiem tra email da ton tai chua?
exports.validatorRegister = (req, res, next) => {
  // lay thong tin body
  const {
    email,
    password,
    firstName,
    lastName,
    dob,
    gender,
    phone_number,
    isOwner,
  } = req.body;

  //tim kiem email trong db
  User.findAll({
    where: {
      email: email,
    },
  }).then((data) => {
    // kiem tra email co ton tai trong db hay khong
    if (data.length > 0) {
      console.log(`Email: ${email} already exists!`);
      res.status(400).send({ Message: `Email: ${email} already exists!` });
      return;
    }
    next();
  });
};

// ma hoa mat khau roi day vao db
exports.register = async (req, res) => {
  // lay thong tin body
  const {
    email,
    password,
    firstName,
    lastName,
    dob,
    gender,
    phone_number,
    isOwner,
  } = req.body;

  // ma hoa mat khau Sync
  var salt = bcrypt.genSaltSync(10);
  var passwordHash = bcrypt.hashSync(password, salt);

    // tao thong tin cho user
    const user = {
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

    // tao user trong database
    User.create(user).then(data => {
        delete data.password;
        delete data.user_id;
        delete data.createdAt;
        delete data.updateAt;
        res.send(data);
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({Message: ("Errors occurred on the server-side when register: " + err.message) || "Some errors occurred on the server-side when register"})
  // tao thong tin cho user
  const user = {
    email: email,
    password: passwordHash,
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    member_since: GetCurrentDate(),
    gender: gender,
    phone_number: phone_number,
    isOwner: isOwner,
  };
  // tao user trong database
  User.create(user)
    .then((data) => {
      delete data.password;
      delete data.user_id;
      delete data.createdAt;
      delete data.updateAt;
      res.send(data);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({
          Message:
            "Errors occurred on the server-side when register: " +
              err.message ||
            "Some errors occurred on the server-side when register",
        });
    });
};

// login
exports.login = (req, res, next) => {
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
            return res.status(400).send({Message: "Email or password is wrong"})
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
                return res.send({ assessToken });
            }
            return res.status(400).send({Message: "Email or password is wrong"})
  const { email, password, isOwner } = req.body;
  //tim kiem email trong db
  User.findAll({
    where: {
      email: email,
      isOwner: isOwner,
    },
  })
    .then((data) => {
      // kiem tra co email hay khong
      if (!data.length) {
        return res.status(400).send({
            Message: "Email or password is wrong"
        });
      } else {
        // kiem tra password bang bcrypt
        if (bcrypt.compareSync(password, data[0].dataValues.password)) {
          // gui jsonwebtoken (authorization JWT)
          let informationAuth = {
            user_id: data[0].dataValues.user_id,
            email: data[0].dataValues.email,
            isOwner: data[0].dataValues.isOwner,
          };
          // ham sign sync nhung neu them params [option] thi no se async
          const assessToken = jwt.sign(
            informationAuth,
            process.env.ACCESS_TOKEN_SECRET
          );
          return res.send({ assessToken });
        }
        return res.status(400).send({ Message: "Email or password is wrong" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          Message:
            "Some errors occurred on the server-side: " + err.message ||
            "Some errors occurred on the server-side ",
        });
    });
};

// authentication JWT
// Hau het cac request phai cho ham nay vao middleware trc de kiem tra user
exports.authenticationJWT = (req, res, next) => {
  // lay token tu header
  const authHeader = req.header("Authorization");
  // cat chuoi "bearer" ra chi lay token
  const token = authHeader && authHeader.split(" ")[1];
  // kiem tra token null hay khong
  if (!token)
    return res
      .status(400)
      .send({ Message: "Can't authentication user (no token part)" });
  try {
    // xac thuc token sync
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // kiem tra user
    User.findAll({
      where: {
        user_id: decodeToken.user_id,
        email: decodeToken.email,
        isOwner: decodeToken.isOwner,
      },
    }).then((data) => {
      if (data.length) {
        // truyen thong tin cho middleware tiep theo
        req.bookingHub_user_infor = data;
        next();
      } else {
        return res
          .status(400)
          .send({ Message: `Information invalid or role invalid` });
      }
    });
  } catch (err) {
    return res.status(400).send({ Message: `Token invalid` });
  }
};

// get user's information
exports.userInfo = (req, res) => {
  // req.bookingHub_user_infor lay tu middleware authenticationJWT
  const userData = req.bookingHub_user_infor[0].dataValues;

  // xoa bot properties khong gui di
  delete userData.user_id;
  delete userData.password;
  delete userData.createdAt;
  delete userData.updatedAt;
  res.send(userData);
};

// update information
exports.updateUser = (req, res) => {
  // req.bookingHub_user_infor lay tu middleware authenticationJWT
  const userData = req.bookingHub_user_infor[0].dataValues;
  const { firstName, lastName, dob, gender, phone_number, isOwner } = req.body;
  // update
  User.update(
    {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      gender: gender,
      phone_number: phone_number,
      isOwner: isOwner,
    },
    {
      where: { user_id: userData.user_id },
    }
  )
    .then((data) => {
      console.log(data);
      res.send({ Message: "Updated successful" });
    })
    .catch((err) => {
      return res.status(400).send({ Message: err.message });
    });
};
// avatar
exports.changeAvatar = (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    User.update({
        imgURL: req.body.imgURL
    },{
        where: {user_id: userData.user_id}
    }).then(data => {
        res.status(200).send({Message: 'Changed successful'})
    }).catch(err => {
        return res.status(500).send({Message: err.message})
    })
}

exports.getAvatar = (req, res) => {
    const userData = req.bookingHub_user_infor[0].dataValues;
    User.findOne({
        where: { user_id: userData.user_id }
    }).then(data => {
        //console.log(data);
        res.status(200).send({imgURL: data.dataValues.imgURL});
    }).catch(err => {
        return res.status(500).send({Message: err.message})
    })
}


// reset password
exports.resetPassword = (req, res) => {
  // req.bookingHub_user_infor lay tu middleware authenticationJWT
  const userData = req.bookingHub_user_infor[0].dataValues;

  // kiem tra mat khau cu dung khong
  if (!bcrypt.compareSync(req.body.password, userData.password)) {
    return res.status(400).send({ Message: "Wrong old password" });
  }

  // kiem tra mat khau moi co trung mat khau cu khong
  if (req.body.password === req.body.newPassword) {
    return res
      .status(400)
      .send({ Message: "New password must be difference old password" });
  }

  // ma hoa mat khau moi
  let salt = bcrypt.genSaltSync(10);
  let newPasswordHash = bcrypt.hashSync(req.body.newPassword, salt);

  // cap nhat mat khau moi vao db
  User.update(
    {
      password: newPasswordHash,
    },
    {
      where: { user_id: userData.user_id },
    }
  )
    .then((data) => {
      res.send({ Message: "Updated password" });
    })
    .catch((err) => {
      return res.status(400).send({ Message: err.message });
    });
};
