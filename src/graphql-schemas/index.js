const { schemaComposer } = require("graphql-compose")
const { HotelModal } = require("../db")

const { HotelInputITC, ReviewInputITC, HotelTC } = require("./hotel-schema")

schemaComposer.Query.addFields({
  Hotels: {
    type: [HotelTC],
    resolve: () => HotelModal.find({})
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
      id: "String",
      review: ReviewInputITC
    },
    resolve: async (_, { id, review }) => {
      const res = await HotelModal.updateOne(
        { _id: id },
        { $push: { reviews: review } }
      )
      return res.nModified
    }
  }
})

module.exports = schemaComposer.buildSchema()
