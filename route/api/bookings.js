const express = require('express');
const {authRouting, restrictRouting} = require('../../middlewares/authMiddleware')
const {getCheckoutSession, getBookingByUser,createBookings,deleteBookings,getAllBookings,getOneBookings,updateBookings} = require('../../controllers/bookingController');
const router = express.Router();

router.use(authRouting);

router.route('/checkout-session/:tourId').get(getCheckoutSession)
router.route('/getBookingByUser').get(getBookingByUser);

router.use(restrictRouting('admin','lead-guide'));
router.route('/').get(getAllBookings).post(createBookings);
router.route('/:id').get(getOneBookings).patch(updateBookings).delete(deleteBookings);



module.exports = router;