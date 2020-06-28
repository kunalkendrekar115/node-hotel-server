const { schemaComposer, toInputObjectType } = require("graphql-compose")

const ReviewTC = schemaComposer.createObjectTC({
  name: "Review",
  fields: {
    reviewerName: "String",
    rating: "Float",
    comments: "String"
  }
})

const RoomTypsETC = schemaComposer.createEnumTC({
  name: "StatusEnum",
  values: {
    DELUX: { value: "Delux" },
    SINGLE: { value: "Single" },
    DECLINED: { value: "Executive" },
    PREMIUM: { value: "Premium" },
    DOUBLE: { value: "Double" }
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
  fullAddress: "String",
  rating: "Int",
  contactPhone: "Float",
  contactEmail: "String",
  country: "String",
  pinCode: "Int",
  checkInTime: "String",
  checkOutTime: "String",
  latitude: "Float",
  longitude: "Float",
  tariff: [TariffTC]
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
