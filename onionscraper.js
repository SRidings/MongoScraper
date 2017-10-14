//require scraping tools
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(callback){
  request("http://www.theonion.com", function(error, response, html){

    var $ = cheerio.load(html);

    var results = [];

    $("article").each(function(i, elem){
      var headline = $(elem)
        .children(".info")
        .children(".inner")
        .children(header)
        .children(".headline")
        .text();

      var summary = $(elem)
          .children(".info")
          .children(".inner")
          .children(".desc")
          .text();
    }) //end .each article function
  }) //end request
} // end export
