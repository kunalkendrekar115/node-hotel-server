const { schemaComposer } = require("graphql-compose");
const { HotelModal } = require("../db");

const {
  HotelInputITC,
  ReviewInputITC,
  HotelTC,
  ReviewTC,
} = require("./hotel-schema");

schemaComposer.Query.addFields({
  hotels: {
    type: [HotelTC],
    resolve: () => HotelModal.find({}),
  },
  hotel: {
    type: HotelTC,
    args: {
      _id: "String",
    },
    resolve: (_, { _id }) => HotelModal.findOne({ _id }),
  },

  reviews: {
    type: [ReviewTC],
    args: {
      _id: "String",
    },
    resolve: async (_, { _id }) => {
      const { reviews } = await HotelModal.findOne({ _id });
      return reviews;
    },
  },
});

schemaComposer.Mutation.addFields({
  createHotel: {
    type: HotelTC,
    args: {
      hotel: HotelInputITC,
    },
    resolve: (_, { hotel }) => HotelModal({ ...hotel, review: [] }).save(),
  },

  addReview: {
    type: HotelTC,
    args: {
      _id: "String",
      review: ReviewInputITC,
    },
    resolve: async (_, { _id, review }) => {
      const res = await HotelModal.findOneAndUpdate(
        { _id },
        { $push: { reviews: { $each: [review], $position: 0 } } },
        { new: true }
      );
      return res;
    },
  },
});

module.exports = schemaComposer.buildSchema();
