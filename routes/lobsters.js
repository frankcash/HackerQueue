var request = require('request');
var cheerio = require('cheerio');

exports.ltop = function(req,res){
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

        // Iterate through every link's score
        $('div.score').each(function (i, element) {
          // push the score value to it's respective link object
          metadataArray[i].points = $(this).text();
        });

        res.send(metadataArray);
      }
  });
}

exports.lnew = function(req,res){
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
        // Iterate through every link's score
        $('div.score').each(function (i, element) {
          // push the score value to it's respective link object
          metadataArray[i].points = $(this).text();
        });
        res.send(metadataArray);
      }
  });
}
