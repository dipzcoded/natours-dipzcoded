const express = require('express');
const {authRouting, restrictRouting} = require('../../middlewares/authMiddleware')
const {getCheckoutSession, createBookingByUser, getBookingByUser,createBookings,deleteBookings,getAllBookings,getOneBookings,updateBookings} = require('../../controllers/bookingController');
const router = express.Router();

router.use(authRouting);

router.route('/checkout-session/:tourId').get(getCheckoutSession)
router.route('/getBookingByUser').get(getBookingByUser);
router.route('/createBookingByUser').post(createBookingByUser)

router.use(restrictRouting('admin','lead-guide'));
router.route('/').get(getAllBookings).post(createBookings);
router.route('/:id').get(getOneBookings).patch(updateBookings).delete(deleteBookings);



module.exports = router;