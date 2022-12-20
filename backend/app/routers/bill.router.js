const router = require("express").Router();
const userMiddleware = require("../middleware/user.middleware.js");
const reservationMiddleware = require("../middleware/reservation.middleware.js")
const billMiddleware = require("../middleware/bill.middleware.js")

// Create a bill
// Only owner can create bill
router.post('/create', userMiddleware.authenticateJWT, reservationMiddleware.isBelongToOwner, billMiddleware.createBill);

router.get('/calculate', billMiddleware.calculatePrice);

module.exports = router