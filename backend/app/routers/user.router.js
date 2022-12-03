const router = require("express").Router();
const userMiddleware = require("../middleware/user.middleware.js")
const passport = require('passport');
require('../authentication/auth.js');

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    function (req, res) {
        //TODO: redirect to front end route
        // res.send(req.user);

        // setTimeout(
            res.redirect("http://localhost:8000/")
        // ), 1000);
    });

// register an account:
// userControllers.validatorRegister kiem tra email ton tai hay khong truoc, neu co thi response, 
// neu khong thi => them user userMiddleware.register
router.post('/register', userMiddleware.register); 
// POST: /user/register 
// params: email, password, firstName, lastName, dob, gender, phone_number, isOwner.

// login an account
router.post('/login', userMiddleware.login);
// POST: /user/login 
// params: email, password, isOwner. 

// get user's information 
// userMiddleware.authenticationJWT de xac thuc Token tu client gui ve roi gui thong tin user bang userMiddleware.userInfo
router.get('/info', userMiddleware.authenticateJWT, userMiddleware.sendUserInfo);
// GET: /user/information

// params: khong can params 
// Authorization: Bearer {token}

// update user's information
router.put('/update', userMiddleware.authenticateJWT, userMiddleware.updateUser);
// PUT: /user/update
// params: firstName, lastName, dob, gender, phone_number.
// Authorization: Bearer {token}


router.delete('/delete', userMiddleware.authenticateJWT, userMiddleware.deleteUser);

// update password

// userMiddleware.authenticationJWT de xac thuc Token tu client gui ve roi cap nhat password bang userMiddleware.resetPassword

router.put('/resetPassword', userMiddleware.authenticateJWT, userMiddleware.resetPassword)
// PUT: /user/resetPassword
// params: password, newPassword
// Authorization: Bearer {token}


// change user's avatar URL
router.put('/avatar', userMiddleware.authenticateJWT, userMiddleware.updateAvatar)
// PUT: /user/avatar
// params: imgURL
// Authorization: Bearer {token}


// get user's avatar URL
router.get('/avatar', userMiddleware.authenticateJWT, userMiddleware.getAvatar)
// PUT: /user/avatar
// Authorization: Bearer {token}

// TODO: delete a user (cai nay chua xong)
router.delete('/delete', userMiddleware.authenticateJWT, userMiddleware.deleteUser);

module.exports = router