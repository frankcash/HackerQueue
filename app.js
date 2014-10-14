/*
 * * Module dependencies
 * */

var request = require('request');
var cheerio = require('cheerio');
var express = require('express')

    , nib = require('nib')


var app = express() // sets up the server


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
        var YCOMB_COMMENT_URL = "https://news.ycombinator.com/"
  			var comments = $(subtext).eq(2).text();
  			var comments_link = YCOMB_COMMENT_URL + $(subtext).eq(2).attr('href');

  			var metadata = { // creates a new object
  				rank: parseInt(rank),
          site: "HN",
  				title:title,
  				url:url,
  				points: parseInt(points),
  				username: username,
  				comments: parseInt(comments),
                                comments_link:comments_link
  			};
  			metadataArray.push(metadata); // pushes the object
  			});
        callback(metadataArray);
  		}
  });
}

app.get('/ycomb', function(req,res) {
  YComb(function(data){
    res.send(data)
  });
})


// end ycomb

metadataArray = [ ];

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

        // Note: There currently (2014-07-12) is no comments tag to be parsed
        //       available by scraping the Loste.rs webpage.
        //       This means 0 comments will have no link to the comment page.
        var comments_label = a.parent().children('.byline').children('span.comments_label');
        var comments_link = comments_label.children('a').attr("href");
        var commentsMatch = comments_label.text().match("[0-9]+");
        var comments = commentsMatch !== null ? commentsMatch[0] : 0;

        var metadata = { // creates a new object
          site: "lobste.rs",
          title:title,
          url:url,
          comments:comments,
          comments_link:comments_link
        };
        metadataArray.push(metadata); // pushes the object
        });
        callback(metadataArray);
      }
  });
}

app.get('/lobster', function(req,res) {
  Lobster(function(data){
    res.send(data)
  });
})

// end Lobster stuff

metadataArray = [ ];

// rprog stuff here

function RProg(callback){
  request('http://www.reddit.com/r/programming', function(error, response, html){
    if(!error && response.statusCode == 200){
      var metadataArray = [ ];
      var $ = cheerio.load(html);

      $('a.title').each(function(i, element){

        var a=$(this);

        var comments_tag = a.parent().parent().children('.flat-list').children('li.first').children('a');
        var comments_link = comments_tag.attr("href");
        var comments = parseInt(comments_tag.text());

        var title=a.text();
        var url=a.attr('href');

        var metadata = {
          site: "r/programming",
          title:title,
          url:url,
          comments:comments,
          comments_link:comments_link
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

metadataArray = [ ];

// Start Ycombnew stuff

function YCombNew(callback){
  request('https://news.ycombinator.com/newest', function(error, response, html){
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

        var YCOMB_COMMENT_URL = "https://news.ycombinator.com/"
        var comments = $(subtext).eq(2).text();
        var comments_link = YCOMB_COMMENT_URL + $(subtext).eq(2).attr('href');

        var metadata = { // creates a new object
          rank: parseInt(rank),
          site: "HN",
          title:title,
          url:url,
          points: parseInt(points),
          username: username,
          comments: parseInt(comments),
          comments_link:comments_link
        };
        metadataArray.push(metadata); // pushes the object
        });
        callback(metadataArray);
      }
  });
}

app.get('/ynew', function(req,res) {
  YCombNew(function(data){
    res.send(data)
  });
})


// end ycombnew

metadataArray = [ ];

// start Lobsternew stuff

function LobsterNew(callback){
  request('https://lobste.rs/recent', function(error, response, html){
      if(!error && response.statusCode === 200){
        var metadataArray = [ ];

        var $ = cheerio.load(html);
        $('span.link').each(function(i, element){
        var a=$(this); //selects previous data
        var url=a.children().attr('href'); // parses href attribute from "a" element
        var title=a.text(); // parses link title

        // Note: There currently (2014-07-12) is no comments tag to be parsed
        //       available by scraping the Loste.rs webpage.
        //       This means 0 comments will have no link to the comment page.
        var comments_label = a.parent().children('.byline').children('span.comments_label');
        var comments_link = comments_label.children('a').attr("href");
        var commentsMatch = comments_label.text().match("[0-9]+");
        var comments = commentsMatch !== null ? commentsMatch[0] : 0;

        var metadata = { // creates a new object
          site: "lobste.rs",
          title:title,
          url:url,
          comments:comments,
          comments_link:comments_link

        };
        metadataArray.push(metadata); // pushes the object
        });
        callback(metadataArray);
      }
  });
}

app.get('/lnew', function(req,res) {
  LobsterNew(function(data){
    res.send(data)
  });
})

// end Lobsternew stuff

metadataArray = [ ];

// rprognew stuff here

function RProgNew(callback){
  request('http://www.reddit.com/r/programming/new/', function(error, response, html){
    if(!error && response.statusCode == 200){
      var metadataArray = [ ];
      var $ = cheerio.load(html);

      $('a.title').each(function(i, element){

        var a=$(this);

        var title=a.text();
        var url=a.attr('href');

        var comments_tag = a.parent().parent().children('.flat-list').children('li.first').children('a');
        var comments_link = comments_tag.attr("href");
        var comments = parseInt(comments_tag.text());

        var metadata = {
          site: "r/programming",
          title:title,
          url:url,
          comments:comments,
          comments_link:comments_link
        };

        metadataArray.push(metadata);
      });
      callback(metadataArray);
    }

  });

}


app.get('/rnew', function(req,res) {
  RProgNew(function(data){
    res.send(data)
  });
})

//end rprognew stuff

metadataArray = [ ];


app.set('views', __dirname + '/views') // sets dir

app.set('view engine', 'jade') // tells express to use jade

app.use(express.logger('dev'))


app.use(express.static(__dirname + '/public'))


app.get('/', function (req, res) {
  res.render('main',
      { title : 'Home' }
        )
})

console.log("now running");
app.listen(3000)