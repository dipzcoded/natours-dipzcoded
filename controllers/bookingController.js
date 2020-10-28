const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../model/Tour');
const Booking = require('../model/Booking');
const {getAllOne,getOne,createOne,deleteOne,updateOne} = require('../controllers/factoryHandler')
const User = require('../model/User');

exports.getCheckoutSession = async (req,res) => {
    try {
        // Get the currently booked tour
        const tour = await Tour.findById(req.params.tourId);
        
        // Create checkout session
        const session = await stripe.checkout.sessions.create({

            payment_method_types : ['card'],
            success_url : `${process.env.REACT_URL}user/bookings`,
            cancel_url : `${process.env.REACT_URL}tours/${tour.slug}/${req.params.tourId}`,
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

const createBookingCheckout = async session => {
try {

    const tour = session.client_reference_id;
    const  user = (await User.findOne({email : session.customer_email})).id;
    const price = session.line_items[0].amount / 100;

    await Booking.create({
        tour,
        user,
        price
    })
    
} catch (error) {
        console.log(error.message);
}   

}


exports.webhookCheckout = async (req, res, next) => {
    let event;
    try {

        const signature = req.headers['stripe-signature'];
         event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOKS_SECRET);
        
    } catch (error) {
        return res.status(400).send(`Webhook Error!: ${error.message}`)
    }

    if(event.type === 'checkout.session.completed')
    {
        createBookingCheckout(event.data.object);
    }
    res.status(200).json({recieved : true})

}

exports.createBookings = createOne(Booking);
exports.getAllBookings = getAllOne(Booking);
exports.getOneBookings = getOne(Booking);
exports.updateBookings = updateOne(Booking);
exports.deleteBookings = deleteOne(Booking);

