const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({

  destinationName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  destinationImageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String
  },
  map: {
    type: String
  }
});

const Destinations = mongoose.model("destination", destinationSchema);
module.exports = Destinations;
