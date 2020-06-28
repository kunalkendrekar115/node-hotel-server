var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
