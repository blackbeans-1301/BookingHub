const router =  require("express").Router();
const userControllers = require("../controllers/user.controller.js")

// register an account:
// userControllers.validatorRegister kiem tra email ton tai hay khong truoc, neu co thi response, 
// neu khong thi => them user userControllers.register
router.post('/register',userControllers.validatorRegister, userControllers.register); 
// POST: /user/register 
// params: email, password, firstName, lastName, dob, gender, phone_number, isOwner.

// login an account
router.post('/login', userControllers.login);
// POST: /user/login 
// params: email, password, isOwner. 

// get user's information 
// userControllers.authenticationJWT de xac thuc Token tu client gui ve roi gui thong tin user bang userControllers.userInfo
router.get('/information', userControllers.authenticationJWT, userControllers.userInfo);
// GET: /user/information
// params: khong can params 
// Authorization: Bearer {token}

// update user's information
router.put('/updateUser', userControllers.authenticationJWT, userControllers.updateUser);
// PUT: /user/update_user
// params: firstName, lastName, dob, gender, phone_number, isOwner.
// Authorization: Bearer {token}

// update password
// userControllers.authenticationJWT de xac thuc Token tu client gui ve roi cap nhat password bang userControllers.resetPassword
router.put('/resetPassword', userControllers.authenticationJWT, userControllers.resetPassword)
// PUT: /user/reset_password
// params: password, newPassword
// Authorization: Bearer {token}

module.exports = router