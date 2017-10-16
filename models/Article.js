//require mongoose
var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

//create schema class
var Schema = mongoose.Schema;

//create article schema
var ArticleSchema = new Schema ({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    // required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
}) //end ArticleSchema

//add uniqueValidator plugin
ArticleSchema.plugin(uniqueValidator);

//create article model with the schema above
var Article = mongoose.model("Article", ArticleSchema);

//export instance of the model
module.exports = Article;
