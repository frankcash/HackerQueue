/*
 * * Module dependencies
 * */

var request = require('request');
var cheerio = require('cheerio');
var express = require('express')
  , stylus = require('stylus')
    , nib = require('nib')


var app = express() // sets up the server

function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib());
}


function callbackForJSON(callback){
  request('https://news.ycombinator.com', function(error, response, html){
  		if(!error && response.statusCode === 200){
        var metadataArray = [ ];
  			var $ = cheerio.load(html);
  			$('span.comhead').each(function(i, element){
  			var a=$(this).prev(); //selects previous data
  			var rank=a.parent().parent().text(); //gets ranks by parsing text two elements higher
  			var title=a.text(); // parses link title
  			var url=a.attr('href'); // parses href attribute from "a" element
  			var subtext = a.parent().parent().next().children('.subtext').children(); // gets the subtext from the children
  			var points = $(subtext).eq(0).text();
  			var username = $(subtext).eq(1).text();
  			var comments = $(subtext).eq(2).text();

  			var metadata = { // creates a new object
  				rank: parseInt(rank),
  				title:title,
  				url:url,
  				points: parseInt(points),
  				username: username,
  				comments: parseInt(comments)
  			};
  			metadataArray.push(metadata); // pushes the object
  			});
        callback(metadataArray);
  		}
  });
}

app.get('/scrape', function(req,res) { // pushes the info to a sub url
  callbackForJSON(function(data){ // call back to the function
    res.send(data)
  });
})

metadataArray = [ ]; // clears the array

app.set('views', __dirname + '/views') // sets dir

app.set('view engine', 'jade') // tells express to use jade

app.use(express.logger('dev'))

app.use(stylus.middleware(
			  { src: __dirname + '/public'
				  , compile: compile
				  }
			))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) { //get index and renders it
  res.render('index',
		  { title : 'Home' }
			  )
})

app.listen(3000) // localhost:3000
