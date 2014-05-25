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

// Start Ycomb stuff

function YComb(callback){
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

app.get('/ycomb', function(req,res) { // pushes the info to a sub url
  YComb(function(data){ // call back to the function
    res.send(data)
  });
})


// end ycomb

metadataArray = [ ]; // clears the array

// start Lobster stuff

function Lobster(callback){
  request('https://lobste.rs', function(error, response, html){
      if(!error && response.statusCode === 200){
        var metadataArray = [ ];

        var $ = cheerio.load(html);
        $('span.link').each(function(i, element){
        var a=$(this); //selects previous data
        var url=a.children().attr('href'); // parses href attribute from "a" element
        var title=a.text(); // parses link title
        var metadata = { // creates a new object
          title:title,
          url:url
        };
        metadataArray.push(metadata); // pushes the object
        });
        callback(metadataArray);
      }
  });
}

app.get('/lobster', function(req,res) { // pushes the info to a sub url
  Lobster(function(data){ // call back to the function
    res.send(data)
  });
})

// end Lobster stuff

metadataArray = [ ]; // clears the array

// rprog stuff here

function RProg(callback){
  request('http://www.reddit.com/r/programming', function(error, response, html){
    if(!error && response.statusCode == 200){
      var metadataArray = [ ];
      var $ = cheerio.load(html);
      
      $('a.title').each(function(i, element){
        
        var a=$(this);

        var title=a.text();
        var url=a.attr('href');

        var metadata = {
          title:title,
          url:url
        };
        
        metadataArray.push(metadata);
      });
      callback(metadataArray);
    }

  });

}


app.get('/rp', function(req,res) { // pushes the info to a sub url
  RProg(function(data){ // call back to the function
    res.send(data)
  });
})

//end rprog stuff


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
