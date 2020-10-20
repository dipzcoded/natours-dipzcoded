const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('../model/Tour');

exports.getCheckoutSession = async (req,res) => {
    try {
        // Get the currently booked tour
        const tour = await Tour.findById(req.params.tourId);
        
        // Create checkout session
        const session = await stripe.checkout.sessions.create({

            payment_method_types : ['card'],
            success_url : 'http://localhost:3000/',
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
        console.log(error.message)
        res.status(500).send('Server Error');
        
    }

}