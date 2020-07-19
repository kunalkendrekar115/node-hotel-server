const { schemaComposer, toInputObjectType } = require("graphql-compose")

const ReviewTC = schemaComposer.createObjectTC({
  name: "Review",
  fields: {
    _id: "String",
    reviewerName: "String",
    rating: "Float",
    comments: "String"
  }
})

const RoomTypsETC = schemaComposer.createEnumTC({
  name: "StatusEnum",
  values: {
    Delux: { value: "Delux" },
    Single: { value: "Single" },
    Double: { value: "Double" },
    Executive: { value: "Executive" }
  }
})

const TariffTC = schemaComposer.createObjectTC({
  name: "Tariff",
  fields: {
    roomType: RoomTypsETC,
    rate: "Int"
  }
})

const hotelFields = {
  hotelName: "String",
  hotelAddress: "String",
  rating: "Int",
  amenities: ["String"],
  contactPhone: "Float",
  contactEmail: "String",
  country: "String",
  pincode: "Int",
  checkInTime: "String",
  checkOutTime: "String",
  latitude: "Float",
  longitude: "Float",
  tariffs: [TariffTC]
}

const HotelTC = schemaComposer.createObjectTC({
  name: "Hotel",
  fields: {
    _id: "String",
    ...hotelFields,
    reviews: [ReviewTC]
  }
})

const HotelInputTC = schemaComposer.createObjectTC({
  name: "Hotel",
  fields: { ...hotelFields }
})

const ReviewInputTC = schemaComposer.createObjectTC({
  name: "Review",
  fields: { reviewerName: "String", comments: "String", rating: "Float" }
})

const ReviewInputITC = toInputObjectType(ReviewInputTC)
const HotelInputITC = toInputObjectType(HotelInputTC)

module.exports = {
  HotelInputITC,
  ReviewInputITC,
  HotelTC,
  ReviewTC
}
