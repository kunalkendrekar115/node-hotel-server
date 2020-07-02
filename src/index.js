const express = require("express")
const cors = require("cors")

const graphqlHTTP = require("express-graphql")
const schema = require("./graphql-schemas")

const db = require("./db")

db.connectToDatabase()

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => callback(null, origin)
}

const app = express()

app.use(cors(corsOptions))

app.options("/graphql", cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

app.listen(4000)

console.log("Running a GraphQL API server at http://localhost:4000/graphql")
