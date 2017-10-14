//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// scraping nodes
var request = require("request");
var cheerio = require("cheerio");

//require models
var Note = require("./models/Notes.js");
var Article = require("./models/Article.js");

//set mongoose.promise to any Promise implementation
mongoose.Promise = Promise;

//initialize express
var app = express();

//set port
const PORT = 3000;

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

//create connection
mongoose.connect("mongodb://localhost/MongooseScraper");
var db = mongoose.connection;

//error catch
db.on("error", function(error){
  console.log(`Mongoose Error: ${error}`);
});

db.once("open", function(){
  console.log(`Mongoose connection to ${db} is successful.`);
})

//ROUTES
app.get("/", function(req, res){
  Article.find({}, function(error, doc){
    if(error){
      console.log(error);
    } else {
      res.json(doc);
    }
  })
}); //end "/" route

app.get("/scrape", function(req, res){
  //grab body of html with request
  request("http://www.theonion.com/"), function(error, response, html){

    //initialize cheerio (with the html body) with $ for shorthand
    var $ = cheerio.load(html);

    //grab every h2 within an article element tag
    $("article").each(function(i, element){

      console.log(element);

      var result = {};

      result.url = $(element)
        .children("a")
        .attr("href");

      console.log(result.url);

      result.headline = $(element)
        .children(".info")
        .children(".inner")
        .children()
        .children(".headline")
        .children()
        .text();

      console.log(result.headline);

      result.summary = $(element)
        .children(".info")
        .children(".inner")
        .children(".desc")
        .text();

      console.log(result.summary);

      var entry = new Article(result);

      console.log(entry);

      entry.save(function(err, doc){
        if(err){
          console.log(err);
        } else {
          console.log(doc);
        }
    }); //end save to database
  }); // end .each function
}; //end request

  //tell browser scrape is done
  res.send("Scrape Complete");

}); //end /scrape route


// app.get("/scrape", function(req, res){
//   request("http://www.theonion.com/"), function(error, response, html){
//
//     var $ = cheerio.load(html);
//
//     $("article.desc").each(function(j, elem){
//
//       result.summary = $(this).
//
//     })
//   }
// })


//app listener event
app.listen(PORT, function(){
  console.log(`App running on port ${PORT}`);
})
