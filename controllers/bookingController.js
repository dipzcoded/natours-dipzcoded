const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../model/Tour');
const Booking = require('../model/Booking');
const {getAllOne,getOne,createOne,deleteOne,updateOne} = require('../controllers/factoryHandler')


exports.getCheckoutSession = async (req,res) => {
    try {
        // Get the currently booked tour
        const tour = await Tour.findById(req.params.tourId);
        
        // Create checkout session
        const session = await stripe.checkout.sessions.create({

            payment_method_types : ['card'],
            success_url : 'http://localhost:3000/user/bookings',
            cancel_url : `http://localhost:3000/tours/${tour.slug}/${req.params.tourId}`,
            customer_email : req.user.email,
            client_reference_id : req.params.tourId,
            line_items : [
                {
                    name :  `${tour.name} Tour`,
                    description : tour.summary,
                    images : [`https://www.natours.dev/img/tours/${tour.imageCover}`],
                    amount : tour.price * 100,
                    currency : 'usd',
                    quantity : 1
               }
            ]
        })


        // send session as response
       return res.status(200).json({
            status : 'success',
            session
        })

    } catch (error) {
        // console.log(error.message)
        res.status(500).send('Server Error');
        
    }

}

exports.getBookingByUser = async (req,res) => {

    try {
        
        const bookings = await Booking.find({user : req.user.id})

        // find tour with the id
        const tourIds = bookings.map(el => el.tour);
        const tours = await Tour.find({_id : {$in : tourIds}});

        return res.status(200).json({
            status : "success",
            doc : tours
        })
        
    } catch (error) {
        // console.log(error.message)
        res.status(500).send('Server Error');
    }

}

exports.createBookingByUser = async (req,res) => {

    const {tour, user, price} = req.body;
    try {
        let bookings = new Booking({
            tour,
            user,
            price
        });
        
        
        await bookings.save();

        return res.status(201).json({msg : "Booked successfully!!" })
        
    } catch (error) {

        // console.log(error.message);
        res.status(500).send('Server Error!');
        
    }

}

exports.webhookCheckout = async (req, res) => {

    try {
        
    } catch (error) {
        
    }

}

exports.createBookings = createOne(Booking);
exports.getAllBookings = getAllOne(Booking);
exports.getOneBookings = getOne(Booking);
exports.updateBookings = updateOne(Booking);
exports.deleteBookings = deleteOne(Booking);

