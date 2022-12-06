const router = require("express").Router();
const userMiddleware = require("../middleware/user.middleware.js")

const passport = require('passport');
require('../authentication/auth.js');

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    function (req, res) {
        
    });

// register an user account:
router.post('/register', userMiddleware.register); 

// login an account
router.post('/login', userMiddleware.login);

// get user's information 
router.get('/info', userMiddleware.authenticateJWT, userMiddleware.sendUserInfo);

// update user's information
router.put('/update', userMiddleware.authenticateJWT, userMiddleware.updateUser);

// reset password
router.put('/resetPassword', userMiddleware.authenticateJWT, userMiddleware.resetPassword)

// change user's avatar URL
router.put('/avatar', userMiddleware.authenticateJWT, userMiddleware.updateAvatar)

// get user's avatar URL
router.get('/avatar', userMiddleware.authenticateJWT, userMiddleware.getAvatar)

// Get user's reservations
router.get('/userReservations', userMiddleware.authenticateJWT, userMiddleware.userReservations);
// TODO: delete a user (cai nay chua xong)
//router.delete('/delete', userMiddleware.authenticateJWT, userMiddleware.deleteUser);

module.exports = router