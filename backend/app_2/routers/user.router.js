const router = require("express").Router();
const userMiddleware = require("../middleware/user.middleware.js")
const reservationMiddleware = require("../middleware/reservation.middleware.js")

const passport = require('passport');
require('../authentication/auth.js');

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    function (req, res) {
        let accessToken = req.user
        let fe_link = `${process.env.FE_URL}/user/GoogleAuthPage?x=${accessToken}`
        res.redirect(fe_link)
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

// forget password
router.put('/forgetPassword', userMiddleware.sendEmail);

// reset password by code forget
router.put('/resetPasswordByCode', userMiddleware.resetPasswordByCode);

// create user's favorite
router.post('/addFavorite', userMiddleware.authenticateJWT, userMiddleware.addFavorite)

// delete user's favorite
router.delete('/delFavorite', userMiddleware.authenticateJWT, userMiddleware.delFavorite)

// get favorite
router.get('/getFavorite', userMiddleware.authenticateJWT, userMiddleware.getFavorite)

// check favorite
router.get('/checkFavorite/:hotel_id', userMiddleware.authenticateJWT, userMiddleware.checkFavorite)

// get history
router.get('/history', userMiddleware.authenticateJWT, userMiddleware.getHistory)

// get Reservation
router.get('/reservationOwner/:reservation_id', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToOwner, userMiddleware.reservationInfo)
router.get('/reservationUser/:reservation_id', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToUser, userMiddleware.reservationInfo)

// TODO: delete a user (cai nay chua xong)
//router.delete('/delete', userMiddleware.authenticateJWT, userMiddleware.deleteUser);

module.exports = router