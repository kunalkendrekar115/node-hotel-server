const { schemaComposer, toInputObjectType } = require("graphql-compose");

const { BlogModal } = require("../db");

const CommentsTC = schemaComposer.createObjectTC({
  name: "Comment",
  fields: {
    body: "String",
    date: "Date",
  },
  resolve: (parant) => {},
});

const InputTC = schemaComposer.createObjectTC({
  name: "Blog",
  fields: {
    _id: "String",
    title: "String!",
    author: "String",
    body: "String",
  },
});

const InputITC = toInputObjectType(InputTC);

const BolgTC = schemaComposer.createObjectTC({
  id: "String",
  name: "Blog",
  fields: {
    title: "String",
    author: "String",
    body: "String",
    comments: [CommentsTC],
    date: "Date",
  },
});

schemaComposer.Query.addFields({
  Blogs: {
    type: "[Blog]",
    resolve: () => {},
  },
});

schemaComposer.Mutation.addFields({
  addBlog: {
    type: "Blog",
    args: {
      blog: InputITC,
    },
    resolve: (_, { blog }) => {
      return new BlogModal({ ...blog, comments: [] }).save();
    },
  },

  addComment: {
    type: "Int",
    args: {
      id: "String",
      body: "String",
    },
    resolve: (_, { id, body }) => {
      return new Promise((resolve, reject) => {
        BlogModal.updateOne(
          { _id: id },
          { $push: { comments: { body } } },
          (err, res) => {
            console.log(res);
            if (err) reject(err);
            else resolve(res.nModified);
          }
        );
      });
    },
  },
});
module.exports = schemaComposer.buildSchema();
