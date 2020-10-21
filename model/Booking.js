const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    tour : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tour'
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    price : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },

    paid : {
        type : Boolean,
        default : true
    }

})

bookingSchema.pre(/^find/, function(next){

    this.populate('user').populate('tour',['name'])
    next();

})

module.exports = mongoose.model('Booking',bookingSchema);