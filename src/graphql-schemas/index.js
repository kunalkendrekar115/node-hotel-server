const { schemaComposer } = require("graphql-compose")
const { HotelModal } = require("../db")

const { HotelInputITC, ReviewInputITC, HotelTC } = require("./hotel-schema")

schemaComposer.Query.addFields({
  hotels: {
    type: [HotelTC],
    resolve: () => HotelModal.find({})
  },
  hotel: {
    type: HotelTC,
    args: {
      _id: "String"
    },
    resolve: (_, { _id }) => HotelModal.findOne({ _id })
  }
})

schemaComposer.Mutation.addFields({
  createHotel: {
    type: HotelTC,
    args: {
      hotel: HotelInputITC
    },
    resolve: (_, { hotel }) => HotelModal({ ...hotel, review: [] }).save()
  },

  addReview: {
    type: "Int",
    args: {
      _id: "String",
      review: ReviewInputITC
    },
    resolve: async (_, { _id, review }) => {
      const res = await HotelModal.updateOne(
        { _id },
        { $push: { reviews: review } }
      )
      return res.nModified
    }
  }
})

module.exports = schemaComposer.buildSchema()
