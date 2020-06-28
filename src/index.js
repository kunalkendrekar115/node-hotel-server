const express = require("express")
const graphqlHTTP = require("express-graphql")
const db = require("./db")
const schema = require("./graphql-schemas")

db.connectToDatabase()

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

app.listen(4000)

console.log("Running a GraphQL API server at http://localhost:4000/graphql")
