//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//require models
var Note = require("./models/Notes.js");
var Article = require("./models/Article.js");

//require scraping tools
var request = require("request");
var cheerio = require("cheerio");

//set mongoose.promise to any Promise implementation
mongoose.Promise = Promise;

//set port
const PORT = 3000;

//initialize express
var app = express();

//create connection
mongoose.connect("mongodb://localhost/MongoScraper");
var db = mongoose.connection;

//error catch
db.on("error", function(error){
  console.log(`Mongoose Error: ${error}`);
});

db.once("open", function(){
  console.log(`Mongoose connection successful.`);
})

//ROUTES
app.get("/", function(req, res){

})

app.get("/scrape", function(req, res){
  //grab body of html with request
  request("http://www.theonion.com/"), function(error, response, html){

    //initialize cheerio (with the html body) with $ for shorthand
    var $ = cheerio.load(html);

    //grab every h2 within an article element tag
    $("article h2").each(function(i, element){

      //initialize empy result object
      var result = {};

      result.headline = $(this).children("a").text();
      result.summary = $(this).children("a").attr

    })
  }

})



//app listener event
app.listen(PORT, function(){
  console.log(`App running on port ${PORT}`);
})
