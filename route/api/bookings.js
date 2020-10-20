const express = require('express');
const {authRouting} = require('../../middlewares/authMiddleware')
const {getCheckoutSession} = require('../../controllers/bookingController');
const router = express.Router();

router.use(authRouting);

router.route('/checkout-session/:tourId').get(getCheckoutSession)


module.exports = router;