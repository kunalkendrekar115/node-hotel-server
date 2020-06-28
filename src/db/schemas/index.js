var mongoose = require("mongoose")
var Schema = mongoose.Schema

const hotelSchema = new Schema({
  hotelName: String,
  fullAddress: String,
  rating: { type: Number, min: 1, max: 5 },
  contactPhone: Number,
  contactEmail: String,
  country: String,
  pinCode: Number,
  checkInTime: String,
  checkOutTime: String,
  tariff: [
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
  hasWifi: Boolean,
  hasRoomService: Boolean,
  hasLaundry: Boolean,
  hasLocker: Boolean,

  reviews: [
    {
      reviewerName: String,
      comments: String,
      rating: { type: Number, min: 1, max: 5 }
    }
  ]
})

module.exports = mongoose.model("Hotel", hotelSchema)
