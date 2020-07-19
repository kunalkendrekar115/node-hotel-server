const mongoose = require("mongoose")

const Schema = mongoose.Schema

const hotelSchema = new Schema({
  hotelName: String,
  hotelAddress: String,
  rating: { type: Number, min: 1, max: 5 },
  contactPhone: Number,
  contactEmail: String,
  country: String,
  pincode: Number,
  checkInTime: String,
  checkOutTime: String,
  amenities: [{ type: String }],
  tariffs: [
    {
      roomType: {
        type: String,
        enum: ["Delux", "Single", "Executive", "Premium", "Double"]
      },
      rate: Number
    }
  ],
  latitude: Number,
  longitude: Number,
  reviews: [
    {
      reviewerName: String,
      comments: String,
      rating: { type: Number, min: 1, max: 5 }
    }
  ]
})

module.exports = mongoose.model("Hotel", hotelSchema)
