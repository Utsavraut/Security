const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "destination",
    required: true,
  },
  datefrom: {
    type: Date,
    required: true,
  },
  dateto: {
    type: Date,
    required: true,
  },
  address:{
    type:String,
    required: true
  },
  contact:{
    type:String,
    required : true
  }

  
});

const Bookings = mongoose.model("bookings", bookingSchema);
module.exports = Bookings;