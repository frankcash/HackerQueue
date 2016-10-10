var request = require('request');
var cheerio = require('cheerio');

function parse(html){
  var metadataArray = [ ];
  var $ = cheerio.load(html);
  $('.athing').each(function(){
    var $storylink = $(this).find('.storylink');
    var rank = $(this).find('.rank').text();
    var title = $storylink.text();
    var url = $storylink.attr('href');
    var $subtext = $(this).next();
    var points = $subtext.find('.score').text();
    var username = $subtext.find('.hnuser').text();
    var $comments = $subtext.find('a').last();
    var comments = $comments.text();
    var YCOMB_COMMENT_URL = "https://news.ycombinator.com/";
    var comments_link = YCOMB_COMMENT_URL + $comments.attr('href');

    var metadata = { // creates a new object
      rank: parseInt(rank),
      site: "HN",
      title: title,
      url: url,
      points: parseInt(points),
      username: username,
      comments: parseInt(comments),
      comments_link: comments_link
    };
    metadataArray.push(metadata); // pushes the object
  });
  return metadataArray;
}

exports.htop = function(req,res){
  request('https://news.ycombinator.com', function(error, response, html){
      if(!error && response.statusCode === 200){
        res.send(parse(html));
      }
  });

};

exports.hnew = function(req,res){
  request('https://news.ycombinator.com/newest', function(error, response, html){
      if(!error && response.statusCode === 200){
        res.send(parse(html));
      }
  });

};
