const router = require("express").Router();
const userMiddleware = require("../middleware/user.middleware.js")
const passport = require('passport');
require('../authentication/auth.js');

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    function (req, res) {
        //TODO: redirect to front end route
    });

// register an account:
// userControllers.validatorRegister kiem tra email ton tai hay khong truoc, neu co thi response, 
// neu khong thi => them user userControllers.register
router.post('/register', userMiddleware.register);
// POST: /user/register 
// params: email, password, firstName, lastName, dob, gender, phone_number, isOwner.

// login an account
router.post('/login', userMiddleware.login);
// POST: /user/login 
// params: email, password, isOwner. 

// get user's information 
// userControllers.authenticationJWT de xac thuc Token tu client gui ve roi gui thong tin user bang userControllers.userInfo
router.get('/info', userMiddleware.authenticateJWT, userMiddleware.sendUserInfo);
// GET: /user/info
// params: khong can params 
// Authorization: Bearer {token}

// update user's information
router.put('/update', userMiddleware.authenticateJWT, userMiddleware.updateUser);
// PUT: /user/update
// params: firstName, lastName, dob, gender, phone_number.
// Authorization: Bearer {token}


router.delete('/delete', userMiddleware.authenticateJWT, userMiddleware.deleteUser);

// update password
// userControllers.authenticationJWT de xac thuc Token tu client gui ve roi cap nhat password bang userControllers.resetPassword
router.put('/resetPassword', userMiddleware.authenticateJWT, userMiddleware.resetPassword)
// PUT: /user/resetPassword
// params: password, newPassword
// Authorization: Bearer {token}

router.put('/avatar', userMiddleware.authenticateJWT, userMiddleware.updateAvatar)
// PUT: /user/avatar
// params: imgURL
// Authorization: Bearer {token}

router.get('/avatar', userMiddleware.authenticateJWT, userMiddleware.getAvatar)
// PUT: /user/avatar
// Authorization: Bearer {token}
module.exports = router