//require mongoose
var mongoose = require("mongoose");

//create schema class
var Schema = mongoose.Schema;

//create article schema
var ArticleSchema = new Schema ({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  }
}) //end ArticleSchema

//create article model with the schema above
var Article = mongoose.model("Article", ArticleSchema);

//export instance of the model
module.exports = Article;
